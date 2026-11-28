export function isValidDurationValue(value) {
    if (typeof value !== 'string') return false;

    const parts = value.split(/[:.]/);
    if (parts.length === 4) {
        return /^[0-9]{2}$/.test(parts[0]) &&
            /^[0-5][0-9]$/.test(parts[1]) &&
            /^[0-5][0-9]$/.test(parts[2]) &&
            /^[0-9]{3}$/.test(parts[3]);
    }

    return parts.length === 5 &&
        /^[0-9]+$/.test(parts[0]) &&
        Number.isSafeInteger(Number(parts[0])) &&
        Number(parts[0]) <= Math.floor(Number.MAX_SAFE_INTEGER / 24) &&
        /^(?:[01][0-9]|2[0-3])$/.test(parts[1]) &&
        /^[0-5][0-9]$/.test(parts[2]) &&
        /^[0-5][0-9]$/.test(parts[3]) &&
        /^[0-9]{3}$/.test(parts[4]);
}
