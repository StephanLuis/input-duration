import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { JSDOM } from 'jsdom';
import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { act as legacyAct } from 'react-dom/test-utils';
import InputDuration from '../index.js';

const act = React.act ?? legacyAct;
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    configurable: true,
    value() {
        return {
            setValidity() {},
            setFormValue() {},
        };
    },
});

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
const h = React.createElement;

async function render(props) {
    await act(async () => {
        root.render(h(InputDuration, props));
        await new Promise(resolve => setTimeout(resolve, 20));
    });
    const element = container.querySelector('input-duration');
    await act(async () => {
        for (let i = 0; i < 100 && !element.shadowRoot; i++) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    });
    assert.ok(element.shadowRoot, 'custom element was not initialized');
    return element;
}

async function editHours(element, value) {
    const field = element.shadowRoot.querySelector('input[name="startHours"]');
    await act(async () => {
        field.value = value;
        field.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
}

after(async () => {
    await act(async () => root.unmount());
    dom.window.close();
});

test('uncontrolled edits report committed values and preserve them across renders', async () => {
    const changes = [];
    const ref = createRef();
    const element = await render({
        defaultValue: '01:02:03.004', ref, onChange: value => changes.push(value),
        showDays: true, minutesDivider: '/', name: 'duration', 'aria-label': 'Duration',
    });
    assert.equal(ref.current, element);
    assert.equal(element.value, '0:01:02:03.004');
    assert.equal(ref.current.valueAsMilliseconds, 3723004);
    assert.equal(element.getAttribute('minutes-divider'), '/');
    assert.equal(element.getAttribute('name'), 'duration');
    assert.equal(element.getAttribute('aria-label'), 'Duration');
    await editHours(element, '05');
    assert.deepEqual(changes, ['0:05:02:03.004']);
    assert.equal(ref.current.valueAsMilliseconds, 18123004);
    await render({ defaultValue: '01:02:03.004', showDays: true });
    assert.equal(element.value, '0:05:02:03.004');
});

test('controlled values reject unaccepted edits and accept parent updates', async () => {
    const changes = [];
    const element = await render({ value: '01:02:03.004', onChange: value => changes.push(value) });
    await editHours(element, '06');
    assert.deepEqual(changes, ['06:02:03.004']);
    assert.equal(element.value, '01:02:03.004');
    await render({ value: '06:02:03.004', onChange: value => changes.push(value) });
    assert.equal(element.value, '06:02:03.004');
    await render({ value: '07:08:09.010', disabled: true, required: true, noSeconds: true });
    assert.equal(element.value, '07:08:09.010');
    assert.equal(element.hasAttribute('disabled'), true);
    assert.equal(element.hasAttribute('required'), true);
    assert.equal(element.hasAttribute('no-seconds'), true);
    await render({ value: '07:08:09.010', disabled: false, required: false });
    assert.equal(element.hasAttribute('disabled'), false);
    assert.equal(element.hasAttribute('required'), false);
    assert.equal(element.hasAttribute('no-seconds'), false);
});

test('replacing callbacks uses the latest callback', async () => {
    const changes = [];
    const element = await render({ onChange: () => changes.push('old') });
    await render({ onChange: value => changes.push(value) });
    await editHours(element, '08');
    assert.deepEqual(changes, ['08:08:09.010']);
});

test('tabThrough toggles the tab-through attribute', async () => {
    const element = await render({ tabThrough: true });
    assert.equal(element.hasAttribute('tab-through'), true);
    await render({ tabThrough: false });
    assert.equal(element.hasAttribute('tab-through'), false);
});

test('a React state update accepts an edit in controlled mode', async () => {
    function Example() {
        const [value, setValue] = React.useState('01:02:03.004');
        return h(InputDuration, { value, onChange: setValue });
    }
    await act(async () => root.render(h(Example)));
    const element = container.querySelector('input-duration');
    await editHours(element, '09');
    assert.equal(element.value, '09:02:03.004');
});
