import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react';
import type InputDurationElement from 'input-duration';

export interface InputDurationProps extends Omit<HTMLAttributes<InputDurationElement>, 'onChange' | 'defaultValue'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    showDays?: boolean;
    noHours?: boolean;
    noMinutes?: boolean;
    noSeconds?: boolean;
    noMicroseconds?: boolean;
    daysDivider?: string;
    hoursDivider?: string;
    minutesDivider?: string;
    secondsDivider?: string;
    microsecondsDivider?: string;
}

declare const InputDuration: ForwardRefExoticComponent<InputDurationProps & RefAttributes<InputDurationElement>>;
export default InputDuration;
