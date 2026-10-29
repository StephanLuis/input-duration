import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;

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
