export function durationInMilliseconds(value) {
    const match = /^(?:(\d+):)?(\d{2}):([0-5]\d):([0-5]\d)\.(\d{3})$/.exec(value);
    if (!match) {
        throw new Error('Enter a complete duration.');
    }

    const [, days = '0', hours, minutes, seconds, milliseconds] = match;
    const total = (((Number(days) * 24 + Number(hours)) * 60 + Number(minutes)) * 60 + Number(seconds)) * 1000
        + Number(milliseconds);
    if (!Number.isSafeInteger(total) || total <= 0 || !Number.isFinite(new Date(Date.now() + total).getTime())) {
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
