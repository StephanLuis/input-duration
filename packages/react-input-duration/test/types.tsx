import { createRef } from 'react';
import type InputDurationElement from 'input-duration';
import InputDuration from '../index.js';

const ref = createRef<InputDurationElement>();
<InputDuration ref={ref} value="01:02:03.004" onChange={value => value.toUpperCase()}
    showDays tabThrough disabled={false} name="duration" aria-label="Duration" />;
<InputDuration defaultValue="01:02:03.004" minutesDivider=":" />;
// @ts-expect-error Values must be strings.
<InputDuration value={123} />;
// @ts-expect-error onChange receives a string.
<InputDuration onChange={(value: number) => value.toFixed()} />;
