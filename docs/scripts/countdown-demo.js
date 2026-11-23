import React from 'react';
import { createRoot } from 'react-dom/client';
import 'https://cdn.jsdelivr.net/npm/input-duration@3.5.2/+esm';
import { durationInMilliseconds } from './duration.js';

const h = React.createElement;
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const status = document.querySelector('#status');
const root = createRoot(document.querySelector('#timer'));
const timerType = document.body.dataset.timer;

const modules = {
    countdown: () => import('https://esm.sh/react-countdown@2.3.6?external=react,react-dom'),
    hook: () => import('https://esm.sh/react-timer-hook@4.0.9?external=react&target=es2022'),
};

if (!modules[timerType]) {
    throw new Error(`Unknown countdown demo: ${timerType}`);
}

const timerModule = await modules[timerType]();
const useTimer = timerModule.default?.useTimer;
if ((timerType === 'countdown' && typeof timerModule.default !== 'function')
    || (timerType === 'hook' && typeof useTimer !== 'function')) {
    throw new Error(`The ${timerType} timer module did not provide the expected component or hook.`);
}
let run = 0;

function formatTime(days, hours, minutes, seconds) {
    const pad = number => String(number).padStart(2, '0');
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function finished() {
    status.textContent = 'Countdown complete.';
}

function HookTimer({ target }) {
    const { totalMilliseconds, pause, resume, isRunning } = useTimer({
        expiryTimestamp: new Date(target),
        onExpire: finished,
        interval: 10,
    });
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const parts = [
        ['Days', Math.floor(totalSeconds / 86400), 2],
        ['Hours', Math.floor(totalSeconds % 86400 / 3600), 2],
        ['Minutes', Math.floor(totalSeconds % 3600 / 60), 2],
        ['Seconds', totalSeconds % 60, 2],
        ['Milliseconds', totalMilliseconds % 1000, 4],
    ];
    const accessibleTime = parts.map(([label, value]) => `${value} ${label}`).join(', ');

    return h(React.Fragment, null,
        h('div', { className: 'hook-display', role: 'img', 'aria-label': accessibleTime },
            parts.map(([label, value, width], index) => h(React.Fragment, { key: label },
                index > 0 && h('span', { className: 'hook-separator', 'aria-hidden': true }, ':'),
                h('div', { className: 'hook-part', 'aria-hidden': true },
                    h('span', { className: 'hook-label' }, label),
                    h('div', { className: 'hook-digits' },
                        [...String(value).padStart(width, '0')].map((digit, position) =>
                            h('span', { className: 'hook-digit', key: position }, digit))))))),
        h('div', { className: 'hook-controls' },
            h('button', {
                type: 'button',
                disabled: !isRunning,
                onClick: () => { pause(); status.textContent = 'Countdown paused.'; },
            }, 'Pause'),
            h('button', {
                type: 'button',
                disabled: isRunning || totalMilliseconds <= 0,
                onClick: () => { resume(); status.textContent = 'Countdown running. Press Start again to restart with the current duration.'; },
            }, 'Resume')));
}

function makeTimer(total, target) {
    if (timerType === 'countdown') {
        return h(timerModule.default, {
            key: run,
            date: target,
            intervalDelay: 100,
            precision: 3,
            onComplete: finished,
            renderer: ({ days, hours, minutes, seconds }) => formatTime(days, hours, minutes, seconds),
        });
    }
    if (timerType === 'hook') {
        return h(HookTimer, { key: run, target });
    }
}

startButton.addEventListener('click', () => {
    try {
        if (!durationInput.checkValidity()) {
            throw new Error('Enter a complete duration.');
        }
        const total = durationInMilliseconds(durationInput.value);
        run += 1;
        status.textContent = 'Countdown running. Press Start again to restart with the current duration.';
        root.render(makeTimer(total, Date.now() + total));
    } catch (error) {
        status.textContent = error.message;
    }
});

startButton.disabled = false;
status.textContent = 'Ready. Enter a duration and press Start.';
