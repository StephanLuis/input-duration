import React from 'react';
import { createRoot } from 'react-dom/client';
import { CountdownCircleTimer } from 'https://esm.sh/react-countdown-circle-timer@3.2.1?external=react';
import 'https://cdn.jsdelivr.net/npm/input-duration@3.5.2/+esm';
import { durationInMilliseconds, durationValue } from './duration.js';

const h = React.createElement;
const duration = document.querySelector('#duration');
const editor = document.querySelector('#editor');
const display = document.querySelector('#circle-display');
const edit = document.querySelector('#edit');
const status = document.querySelector('#status');
const root = createRoot(document.querySelector('#timer'));
const minutesField = duration.shadowRoot.querySelector('input[name="startMinutes"]');
const secondsField = duration.shadowRoot.querySelector('input[name="startSeconds"]');
minutesField.setAttribute('aria-label', 'Minutes');
secondsField.setAttribute('aria-label', 'Seconds');
const secondsSuffix = document.createElement('span');
secondsSuffix.textContent = 's';
secondsSuffix.setAttribute('aria-hidden', 'true');
secondsField.after(secondsSuffix);
let current = null;
let run = 0;

function showTimer() {
    const { id, total, playing } = current;
    const seconds = total / 1000;
    root.render(h(CountdownCircleTimer, {
        key: id,
        isPlaying: playing,
        duration: seconds,
        size: 180,
        strokeWidth: 12,
        strokeLinecap: 'butt',
        colors: display.classList.contains('editing')
            ? '#2196f3'
            : ['#004777', '#F7B801', '#A30000', '#A30000'],
        colorsTime: [seconds, seconds * 5 / 7, seconds * 2 / 7, 0],
        onComplete: () => {
            if (current?.id !== id || !current.playing) return;
            current.playing = false;
            current.remaining = 0;
            duration.value = durationValue(0);
            status.textContent = 'Countdown complete. Click the circle to set a new duration.';
        },
    }, ({ remainingTime, elapsedTime }) => {
        if (current?.id === id && current.playing) {
            current.remaining = Math.max(0, Math.ceil(total - elapsedTime * 1000));
        }
        if (remainingTime === 0) return h('div', { className: 'circle-content complete' }, 'Too late ...');
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return h('div', { className: 'circle-content' },
            h('span', null, 'Remaining'),
            h('span', { className: 'circle-value' }, `${minutes}:${String(seconds).padStart(2, '0')}`));
    }));
}

edit.addEventListener('click', () => {
    if (current.playing) {
        duration.value = durationValue(Math.ceil(current.remaining / 1000) * 1000);
    }
    current.playing = false;
    display.classList.add('editing');
    showTimer();
    edit.hidden = true;
    editor.hidden = false;
    status.textContent = 'Editing. Move focus away to start the countdown.';
    minutesField.focus();
    minutesField.select();
});

duration.addEventListener('change', () => {
    const hours = duration.shadowRoot.querySelector('input[name="startHours"]');
    if (Number(hours.value) !== 0) {
        duration.value = `00:${duration.value.split(':').slice(-2).join(':')}`;
    }
});

duration.addEventListener('focusout', event => {
    if (event.relatedTarget === duration || duration.shadowRoot.contains(event.relatedTarget)) return;
    try {
        if (!duration.checkValidity()) throw new Error('Enter a complete duration.');
        const total = durationInMilliseconds(duration.value);
        editor.hidden = true;
        display.classList.remove('editing');
        edit.hidden = false;
        status.textContent = 'Countdown running. Click the circle to edit the remaining time.';
        current = { id: ++run, total, remaining: total, playing: true };
        showTimer();
    } catch (error) {
        status.textContent = error.message;
    }
});

if (typeof CountdownCircleTimer !== 'function') throw new Error('The circle timer component is unavailable.');
const total = durationInMilliseconds(duration.value);
current = { id: ++run, total, remaining: total, playing: false };
showTimer();
edit.disabled = false;
status.textContent = 'Ready. Click the circle to edit and start.';
