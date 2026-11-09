import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;

const formValues = new WeakMap();
const formStates = new WeakMap();
Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    configurable: true,
    value() {
        const element = this;
        const state = {
            formValue: null,
            restorationState: null,
            validity: {},
            validationMessage: '',
            validationAnchor: null
        };
        formStates.set(element, state);
        return {
            setFormValue(value, restorationState) {
                state.formValue = value;
                state.restorationState = restorationState;
                formValues.set(element, value);
            },
            setValidity(validity, message = '', anchor = null) {
                state.validity = { ...validity, valid: Object.keys(validity).length === 0 };
                state.validationMessage = message;
                state.validationAnchor = anchor;
            },
            get validity() {
                return state.validity;
            },
            get validationMessage() {
                return state.validationMessage;
            },
            get willValidate() {
                return !element.disabled;
            },
            checkValidity() {
                return state.validity.valid;
            },
            reportValidity() {
                return state.validity.valid;
            }
        };
    }
});

const { default: InputDuration } = await import('../index.js');

before(() => {
    assert.equal(customElements.get('input-duration'), InputDuration);
});

after(() => {
    dom.window.close();
});

function createInputDuration() {
    const element = document.createElement('input-duration');
    document.body.appendChild(element);
    return element;
}

test('exports and registers the custom element class', () => {
    assert.equal(typeof InputDuration, 'function');
    assert.equal(customElements.get('input-duration'), InputDuration);
});

test('setting value updates the controls synchronously', () => {
    const element = createInputDuration();

    element.value = '05:05:05.005';

    assert.equal(element.value, '05:05:05.005');
    assert.equal(element.getAttribute('value'), '05:05:05.005');
});

test('named form value stays synchronized with the duration', () => {
    const element = createInputDuration();
    element.setAttribute('name', 'duration');

    assert.equal(InputDuration.formAssociated, true);
    assert.equal(formValues.get(element), '00:00:00.000');

    element.value = '05:05:05.005';
    assert.equal(formValues.get(element), '05:05:05.005');

    const hours = element.shadowRoot.querySelector('.sH');
    hours.value = '12';
    hours.dispatchEvent(new window.Event('input', { bubbles: true }));
    assert.equal(formValues.get(element), '12:05:05.005');

    element.value = '';
    assert.equal(formValues.get(element), '00:00:00.000');
});

test('required reports value missing until a value is set or edited', () => {
    const element = createInputDuration();
    element.setAttribute('name', 'duration');
    element.setAttribute('required', '');

    assert.equal(element.validity.valueMissing, true);
    assert.equal(element.validity.valid, false);
    assert.equal(element.validationMessage, 'Please enter a duration.');
    assert.equal(element.checkValidity(), false);
    assert.equal(element.willValidate, true);
    assert.equal(formValues.get(element), null);

    element.value = '00:00:00.000';
    assert.equal(element.validity.valid, true);
    assert.equal(element.checkValidity(), true);
    assert.equal(formValues.get(element), '00:00:00.000');

    element.value = '';
    assert.equal(element.validity.valueMissing, true);
});

test('incomplete field edits are invalid until they form a complete duration', () => {
    const element = createInputDuration();
    element.setAttribute('required', '');
    const hours = element.shadowRoot.querySelector('.sH');

    hours.value = '1';
    hours.dispatchEvent(new window.Event('input', { bubbles: true }));
    assert.equal(element.validity.badInput, true);
    assert.equal(formValues.get(element), null);

    hours.dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.equal(element.validity.valid, true);
    assert.equal(formValues.get(element), '01:00:00.000');
});

test('form disabled callback disables and enables all duration fields', () => {
    const element = createInputDuration();
    const fields = [...element.shadowRoot.querySelectorAll('.timeCase input')];

    element.formDisabledCallback(true);
    assert.deepEqual(fields.map(field => field.disabled), [true, true, true, true]);

    element.formDisabledCallback(false);
    assert.deepEqual(fields.map(field => field.disabled), [false, false, false, false]);

    element.disable();
    assert.equal(element.hasAttribute('disabled'), true);
    assert.deepEqual(fields.map(field => field.disabled), [true, true, true, true]);
    element.enable();
    assert.equal(element.hasAttribute('disabled'), false);
    assert.deepEqual(fields.map(field => field.disabled), [false, false, false, false]);

    element.disabled = true;
    assert.equal(element.disabled, true);
    assert.equal(element.willValidate, false);
    element.disabled = false;
});

test('form reset restores the default value or clears required state', () => {
    const withDefault = document.createElement('input-duration');
    withDefault.setAttribute('value', '12:34:56.789');
    document.body.appendChild(withDefault);
    const defaultHours = withDefault.shadowRoot.querySelector('.sH');
    defaultHours.value = '01';
    defaultHours.dispatchEvent(new window.Event('input', { bubbles: true }));
    withDefault.formResetCallback();
    assert.equal(withDefault.value, '12:34:56.789');
    assert.equal(formValues.get(withDefault), '12:34:56.789');

    const withoutDefault = createInputDuration();
    withoutDefault.setAttribute('required', '');
    const hours = withoutDefault.shadowRoot.querySelector('.sH');
    hours.value = '01';
    hours.dispatchEvent(new window.Event('input', { bubbles: true }));
    withoutDefault.formResetCallback();
    assert.equal(withoutDefault.value, '00:00:00.000');
    assert.equal(withoutDefault.validity.valueMissing, true);
});

test('form state restoration restores the duration and required state', () => {
    const element = createInputDuration();
    element.setAttribute('required', '');
    element.value = '12:34:56.789';
    const savedState = formStates.get(element).restorationState;

    element.value = '01:02:03.004';
    element.formStateRestoreCallback(savedState, 'restore');

    assert.equal(element.value, '12:34:56.789');
    assert.equal(element.validity.valid, true);
    assert.equal(formValues.get(element), '12:34:56.789');

    const untouched = createInputDuration();
    untouched.setAttribute('required', '');
    const untouchedState = JSON.stringify({
        value: '00:00:00.000',
        valueIsSet: false
    });
    untouched.formStateRestoreCallback(untouchedState, 'restore');

    assert.equal(untouched.value, '00:00:00.000');
    assert.equal(untouched.validity.valueMissing, true);
    assert.equal(formValues.get(untouched), null);
});

test('form state restoration accepts a legacy duration string', () => {
    const element = createInputDuration();

    element.formStateRestoreCallback('09:08:07.006', 'restore');

    assert.equal(element.value, '09:08:07.006');
    assert.equal(formValues.get(element), '09:08:07.006');
});

test('value attribute changes update and reset the controls', () => {
    const element = createInputDuration();

    element.setAttribute('value', '12:34:56.789');
    assert.equal(element.value, '12:34:56.789');

    element.removeAttribute('value');
    assert.equal(element.value, '00:00:00.000');
});

test('initial value attributes populate the controls', () => {
    const container = document.createElement('div');
    container.innerHTML = '<input-duration value="99:59:59.999"></input-duration>';
    const element = container.firstElementChild;

    assert.equal(element.value, '99:59:59.999');
});

test('unit attributes hide their fields and dividers and can be removed', () => {
    const container = document.createElement('div');
    container.innerHTML = '<input-duration value="12:34:56.789" no-hours no-minutes no-seconds no-microseconds></input-duration>';
    const element = container.firstElementChild;
    const shadow = element.shadowRoot;

    assert.equal(element.value, '12:34:56.789');

    for (const selector of ['.sH', '.sM', '.sS', '.sMS', '.bds-h', '.bds-m', '.bds-s']) {
        assert.equal(shadow.querySelector(selector).style.display, 'none');
    }

    element.removeAttribute('no-hours');
    assert.equal(shadow.querySelector('.sH').style.display, '');
    assert.equal(shadow.querySelector('.bds-h').style.display, 'none');

    element.removeAttribute('no-minutes');
    assert.equal(shadow.querySelector('.sM').style.display, '');
    assert.equal(shadow.querySelector('.bds-h').style.display, '');

    element.removeAttribute('no-seconds');
    element.removeAttribute('no-microseconds');
    assert.equal(shadow.querySelector('.sS').style.display, '');
    assert.equal(shadow.querySelector('.sMS').style.display, '');
    assert.equal(shadow.querySelector('.bds-m').style.display, '');
    assert.equal(shadow.querySelector('.bds-s').style.display, '');
});

test('unit hide and show methods toggle their attributes', () => {
    const element = createInputDuration();
    const units = [
        ['no-hours', '.sH', () => element.hideHours(), () => element.showHours()],
        ['no-minutes', '.sM', () => element.hideMinutes(), () => element.showMinutes()],
        ['no-seconds', '.sS', () => element.hideSeconds(), () => element.showSeconds()],
        ['no-microseconds', '.sMS', () => element.hideMicroSeconds(), () => element.showMicroSeconds()]
    ];

    for (const [attribute, fieldSelector, hide, show] of units) {
        hide();
        assert.equal(element.hasAttribute(attribute), true);
        assert.equal(element.shadowRoot.querySelector(fieldSelector).style.display, 'none');

        show();
        assert.equal(element.hasAttribute(attribute), false);
        assert.equal(element.shadowRoot.querySelector(fieldSelector).style.display, '');
    }

    element.hideHours();
    element.hideMinutes();
    element.showHours();
    assert.equal(element.shadowRoot.querySelector('.bds-h').style.display, 'none');
    element.showMinutes();
    assert.equal(element.shadowRoot.querySelector('.bds-h').style.display, '');
});

test('no* methods remain aliases for hiding their corresponding units', () => {
    const element = createInputDuration();

    element.noHours();
    element.noMinutes();
    element.noSeconds();
    element.noMicroSeconds();

    for (const attribute of ['no-hours', 'no-minutes', 'no-seconds', 'no-microseconds']) {
        assert.equal(element.hasAttribute(attribute), true);
    }
});

test('divider attributes customize separators and add an optional milliseconds suffix', () => {
    const container = document.createElement('div');
    container.innerHTML = '<input-duration hours-divider="h" minutes-divider="m" seconds-divider="s" microseconds-divider="ms"></input-duration>';
    const element = container.firstElementChild;
    const shadow = element.shadowRoot;

    assert.deepEqual(
        [...shadow.querySelectorAll('[part~="divider"]')].map(divider => divider.textContent),
        ['h', 'm', 's', 'ms']
    );
    assert.equal(shadow.querySelector('.bds-ms').style.display, '');

    element.setAttribute('no-microseconds', '');
    assert.equal(shadow.querySelector('.bds-ms').style.display, 'none');
    element.removeAttribute('no-microseconds');
    assert.equal(shadow.querySelector('.bds-ms').style.display, '');

    element.setHoursDivider(' hrs ');
    element.setMinutesDivider(' min ');
    element.setSecondsDivider(' sec ');
    element.setMicroSecondsDivider(' ms');

    assert.deepEqual(
        [...shadow.querySelectorAll('[part~="divider"]')].map(divider => divider.textContent),
        [' hrs ', ' min ', ' sec ', ' ms']
    );

    for (const attribute of ['hours-divider', 'minutes-divider', 'seconds-divider', 'microseconds-divider']) {
        element.removeAttribute(attribute);
    }

    assert.deepEqual(
        [...shadow.querySelectorAll('[part~="divider"]')].map(divider => divider.textContent),
        [':', ':', '.', '']
    );
    assert.equal(shadow.querySelector('.bds-ms').style.display, 'none');
});

test('exposes styling parts for the control and its fields', () => {
    const element = createInputDuration();
    const shadow = element.shadowRoot;

    assert.equal(shadow.querySelector('[part~="control"]') !== null, true);
    assert.equal(shadow.querySelectorAll('[part~="field"]').length, 4);
    assert.equal(shadow.querySelectorAll('[part~="divider"]').length, 4);
    assert.equal(shadow.querySelector('[part~="icon"]') !== null, true);
    assert.match(shadow.querySelector('style').textContent, /--input-duration-border-color:\s*#9aa6b2/);
});

test('invalid pasted values are rejected and do not alter the duration', () => {
    const element = createInputDuration();
    const cases = [
        ['.sH', '100', '00'],
        ['.sM', '99', '00'],
        ['.sS', '60', '00'],
        ['.sMS', '1000', '000']
    ];

    for (const [selector, pastedValue, expectedValue] of cases) {
        const input = element.shadowRoot.querySelector(selector);
        input.value = pastedValue;
        input.dispatchEvent(new window.Event('input', { bubbles: true }));

        assert.equal(input.value, expectedValue);
        assert.equal(element.value, '00:00:00.000');
    }
});

test('input handling does not create debug globals', () => {
    const element = createInputDuration();

    assert.equal(Object.hasOwn(window, 'inputElement'), false);
    assert.equal(Object.hasOwn(window, 'kue'), false);

    const input = element.shadowRoot.querySelector('.sH');
    input.value = '1';
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
    input.dispatchEvent(new window.KeyboardEvent('keyup', { key: '1', bubbles: true }));

    assert.equal(Object.hasOwn(window, 'inputElement'), false);
    assert.equal(Object.hasOwn(window, 'kue'), false);
});

test('numeric input advances only one field at a time', () => {
    const element = createInputDuration();
    const inputs = element.shadowRoot;

    const cases = [
        ['.sH', '.sM'],
        ['.sM', '.sS'],
        ['.sS', '.sMS']
    ];

    for (const [currentSelector, nextSelector] of cases) {
        const currentInput = inputs.querySelector(currentSelector);
        currentInput.value = '55';
        currentInput.dispatchEvent(new window.Event('input', { bubbles: true }));

        const nextInput = inputs.querySelector(nextSelector);
        assert.equal(inputs.activeElement, nextInput);

        nextInput.dispatchEvent(new window.KeyboardEvent('keyup', {
            key: '5',
            bubbles: true
        }));

        assert.equal(inputs.activeElement, nextInput);
    }
});
