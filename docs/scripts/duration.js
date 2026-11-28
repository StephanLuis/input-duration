import { durationInMilliseconds } from 'https://cdn.jsdelivr.net/npm/input-duration@4.1.0/+esm';

export function countdownMilliseconds(value) {
    let total;
    try {
        total = durationInMilliseconds(value);
    } catch (error) {
        if (!(error instanceof RangeError)) throw error;
        throw new Error('Enter a duration greater than zero and within the supported date range.');
    }
    if (total <= 0 || !Number.isFinite(new Date(Date.now() + total).getTime())) {
        throw new Error('Enter a duration greater than zero and within the supported date range.');
    }
    return total;
}

export function durationValue(total) {
    const pad = (value, width) => String(value).padStart(width, '0');
    const days = Math.floor(total / 86400000);
    const hours = Math.floor(total % 86400000 / 3600000);
    const minutes = Math.floor(total % 3600000 / 60000);
    const seconds = Math.floor(total % 60000 / 1000);
    return `${days}:${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(total % 1000, 3)}`;
}
