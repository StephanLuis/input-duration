import { isValidDurationValue } from './validate-duration.js';

export function durationInMilliseconds(value) {
    if (!isValidDurationValue(value)) {
        throw new TypeError('Enter a complete duration.');
    }
    const parts = value.split(/[:.]/);
    const [days, hours, minutes, seconds, milliseconds] = parts.length === 5
        ? parts.map(Number)
        : [0, ...parts.map(Number)];
    const total = (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
    if (!Number.isSafeInteger(total)) {
        throw new RangeError('Duration exceeds the safe integer range in milliseconds.');
    }
    return total;
}
