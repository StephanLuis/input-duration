import { createElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

const InputDuration = forwardRef(function InputDuration({
    value,
    defaultValue,
    onChange,
    showDays,
    noHours,
    noMinutes,
    noSeconds,
    noMicroseconds,
    daysDivider,
    hoursDivider,
    minutesDivider,
    secondsDivider,
    microsecondsDivider,
    disabled,
    required,
    ...props
}, forwardedRef) {
    const elementRef = useRef(null);
    const initialValue = useRef(value ?? defaultValue);
    const current = useRef({ value, onChange });
    const [ready, setReady] = useState(false);
    const [loadError, setLoadError] = useState(null);
    current.current = { value, onChange };
    const setRef = useCallback(element => {
        elementRef.current = element;
        if (typeof forwardedRef === 'function') forwardedRef(element);
        else if (forwardedRef) forwardedRef.current = element;
    }, [forwardedRef]);

    useEffect(() => {
        let mounted = true;
        import('input-duration').then(() => {
            if (mounted) setReady(true);
        }, error => {
            if (mounted) setLoadError(error);
        });
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (!ready) return;
        const element = elementRef.current;
        if (initialValue.current !== undefined) element.value = initialValue.current;
        const handleChange = () => {
            const nextValue = element.value;
            current.current.onChange?.(nextValue);
            if (current.current.value !== undefined) element.value = current.current.value;
        };
        element.addEventListener('change', handleChange);
        return () => element.removeEventListener('change', handleChange);
    }, [ready]);

    useEffect(() => {
        if (ready && value !== undefined) elementRef.current.value = value;
    }, [ready, value]);

    useEffect(() => {
        if (ready) elementRef.current.disabled = Boolean(disabled);
    }, [ready, disabled]);

    if (loadError) throw loadError;

    return createElement('input-duration', {
        ...props,
        ref: setRef,
        'show-days': showDays ? '' : undefined,
        'no-hours': noHours ? '' : undefined,
        'no-minutes': noMinutes ? '' : undefined,
        'no-seconds': noSeconds ? '' : undefined,
        'no-microseconds': noMicroseconds ? '' : undefined,
        'days-divider': daysDivider,
        'hours-divider': hoursDivider,
        'minutes-divider': minutesDivider,
        'seconds-divider': secondsDivider,
        'microseconds-divider': microsecondsDivider,
        disabled: disabled ? '' : undefined,
        required: required ? '' : undefined,
    });
});

export default InputDuration;
