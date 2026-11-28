import React from 'react';
import { createRoot } from 'react-dom/client';
import Countdown from 'https://esm.sh/react-countdown@2.3.6?external=react,react-dom';
import { countdownMilliseconds, durationValue } from './duration.js';

const h = React.createElement;
const duration = document.querySelector('#duration');
const editor = document.querySelector('#editor');
const timer = document.querySelector('#timer');
const status = document.querySelector('#status');
const root = createRoot(timer);
let target = null;
let run = 0;

function display({ days, hours, minutes, seconds, milliseconds }) {
    const pad = (value, width) => String(value).padStart(width, '0');
    return h(React.Fragment, null,
        h('span', { className: 'countdown-sr-only' },
            `Edit duration. Time remaining: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds.`),
        h('span', { className: 'countdown-field', 'data-field': 'startDays', 'aria-hidden': true }, days),
        h('span', { className: 'countdown-divider countdown-day-divider', 'data-field': 'startDays', 'aria-hidden': true }, 'd '),
        h('span', { className: 'countdown-field', 'data-field': 'startHours', 'aria-hidden': true }, pad(hours, 2)),
        h('span', { className: 'countdown-divider', 'data-field': 'startHours', 'aria-hidden': true }, 'h '),
        h('span', { className: 'countdown-field', 'data-field': 'startMinutes', 'aria-hidden': true }, pad(minutes, 2)),
        h('span', { className: 'countdown-divider', 'data-field': 'startMinutes', 'aria-hidden': true }, 'm '),
        h('span', { className: 'countdown-field', 'data-field': 'startSeconds', 'aria-hidden': true }, pad(seconds, 2)),
        h('span', { className: 'countdown-divider', 'data-field': 'startMilliSecs', 'aria-hidden': true }, '.'),
        h('span', { className: 'countdown-field countdown-milliseconds', 'data-field': 'startMilliSecs', 'aria-hidden': true }, pad(milliseconds, 3)),
        h('span', { className: 'countdown-divider', 'data-field': 'startMilliSecs', 'aria-hidden': true }, 's'),
        h('svg', { className: 'countdown-icon', viewBox: '0 0 448 512', 'aria-hidden': true, focusable: 'false' },
            h('path', {
                fill: 'currentColor',
                d: 'M393.9 184l22.6-22.6c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0l-20.7 20.7c-31.1-27.5-70.4-45.9-113.8-50.8V48h28c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28v49.4C96.4 109.3 16 197.2 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-44.7-14.1-86.1-38.1-120zM224 464c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm12-112h-24c-6.6 0-12-5.4-12-12V204c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v136c0 6.6-5.4 12-12 12z',
            })));
}

function showTimer(total) {
    if (target === null) {
        const days = Math.floor(total / 86400000);
        const hours = Math.floor(total % 86400000 / 3600000);
        const minutes = Math.floor(total % 3600000 / 60000);
        const seconds = Math.floor(total % 60000 / 1000);
        root.render(display({ days, hours, minutes, seconds, milliseconds: total % 1000 }));
        return;
    }
    const id = ++run;
    root.render(h(Countdown, {
        key: id,
        date: target,
        intervalDelay: 10,
        precision: 3,
        renderer: display,
        onComplete: () => {
            if (id !== run) return;
            target = null;
            duration.value = durationValue(0);
            status.textContent = 'Countdown complete. Click the timer to set a new duration.';
        },
    }));
}

timer.addEventListener('click', event => {
    let fieldName = 'startDays';
    if (event.detail > 0) {
        const selected = event.target.closest('[data-field]');
        if (selected) {
            fieldName = selected.dataset.field;
        } else {
            const fields = [...timer.querySelectorAll('.countdown-field')];
            if (fields.length) {
                const distance = element => {
                    const rect = element.getBoundingClientRect();
                    return Math.abs(event.clientX - (rect.left + rect.width / 2));
                };
                const nearest = fields.reduce((closest, field) =>
                    distance(field) < distance(closest) ? field : closest);
                fieldName = nearest.dataset.field;
            }
        }
    }
    const remaining = target === null ? duration.value : durationValue(Math.max(0, target - Date.now()));
    target = null;
    run += 1;
    root.render(null);
    duration.value = remaining;
    timer.hidden = true;
    editor.hidden = false;
    status.textContent = 'Editing. Move focus away to start the countdown.';
    const field = duration.shadowRoot.querySelector(`input[name="${fieldName}"]`);
    field.focus();
    field.select();
});

duration.addEventListener('focusout', event => {
    if (event.relatedTarget === duration || duration.shadowRoot.contains(event.relatedTarget)) return;
    try {
        if (!duration.checkValidity()) throw new Error('Enter a complete duration.');
        const total = countdownMilliseconds(duration.value);
        target = Date.now() + total;
        editor.hidden = true;
        timer.hidden = false;
        status.textContent = 'Countdown running. Click the timer to edit the remaining time.';
        showTimer(total);
    } catch (error) {
        status.textContent = error.message;
    }
});

if (typeof Countdown !== 'function') throw new Error('The countdown component is unavailable.');
showTimer(countdownMilliseconds(duration.value));
timer.disabled = false;
status.textContent = 'Ready. Click the timer to edit and start.';
