declare class InputDuration extends HTMLElement {
    static readonly formAssociated: boolean;

    value: string;
    readonly dayFriendlyValue: string | null;
    validity: ValidityState | null;
    validationMessage: string;
    willValidate: boolean;
    disabled: boolean;

    checkValidity(): boolean;
    reportValidity(): boolean;
    disable(): void;
    enable(): void;

    hideHours(): void;
    showDays(): void;
    hideDays(): void;
    showHours(): void;
    noHours(): void;
    hideMinutes(): void;
    showMinutes(): void;
    noMinutes(): void;
    hideSeconds(): void;
    showSeconds(): void;
    noSeconds(): void;
    hideMicroSeconds(): void;
    showMicroSeconds(): void;
    noMicroSeconds(): void;

    setDaysDivider(text: string): void;
    setHoursDivider(text: string): void;
    setMinutesDivider(text: string): void;
    setSecondsDivider(text: string): void;
    setMicroSecondsDivider(text: string): void;

    isValidValue(value: unknown): boolean;
}

declare global {
    interface HTMLElementTagNameMap {
        'input-duration': InputDuration;
    }
}

export default InputDuration;
