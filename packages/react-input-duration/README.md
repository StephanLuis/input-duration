# React input-duration

A React wrapper around the [`input-duration`](https://github.com/StephanLuis/input-duration) web component.
It supports React 18.2 and 19 and loads the component in the browser after mounting.

```sh
npm install @stephanluis/react-input-duration
```

```jsx
import { useState } from 'react';
import InputDuration from '@stephanluis/react-input-duration';

export function DurationExample() {
    const [duration, setDuration] = useState('0:00:00:10.000');
    return <InputDuration value={duration} onChange={setDuration} showDays />;
}
```

`onChange` receives the committed duration string, not an event. With `value`, the component is
controlled: update the value in `onChange` to retain edits. Alternatively use `defaultValue` for
an uncontrolled input. Use either `value` or `defaultValue`, not both.

The `showDays`, `noHours`, `noMinutes`, `noSeconds`, and `noMicroseconds` boolean props control
visible fields. Separator props are `daysDivider`, `hoursDivider`, `minutesDivider`,
`secondsDivider`, and `microsecondsDivider`. Standard attributes such as `name`, `required`,
`disabled`, `className`, and `aria-label` are supported. A ref points to the underlying custom
element, exposing its methods and properties. See the [component documentation](https://github.com/StephanLuis/input-duration#readme)
for formats, styling, and methods.
Read `ref.current.valueAsMilliseconds` for the committed duration as a number of milliseconds.

Set `tabThrough` to preserve normal Tab navigation from the final field instead of finishing
editing with focus on the page.

The browser loads and registers the web component after the wrapper mounts. Server-rendered HTML
contains the custom element but its editable fields appear only after client-side initialization.

## React Hook Form

Install `react-hook-form` separately, then use its `Controller` to connect the committed string
value to the form:

```jsx
import { Controller, useForm } from 'react-hook-form';
import InputDuration from '@stephanluis/react-input-duration';

function DurationForm() {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { duration: '00:00:10.000' },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <label htmlFor="duration">Duration</label>
            <Controller
                name="duration"
                control={control}
                rules={{ validate: value => value !== '00:00:00.000' || 'Choose a duration greater than zero.' }}
                render={({ field, fieldState }) => (
                    <>
                        <InputDuration {...field} id="duration" tabThrough
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? 'duration-error' : undefined} />
                        {fieldState.error && <p id="duration-error" role="alert">{fieldState.error.message}</p>}
                    </>
                )}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => reset()}>Reset</button>
        </form>
    );
}
```

The value updates when a segment is committed, not on every keystroke. The example uses submit
validation and disables automatic error focus because the forwarded ref points to the custom
element, not an individual shadow-DOM field. `onBlur` can fire when focus moves between segments.
The [React Hook Form demo source](https://github.com/StephanLuis/input-duration/tree/main/packages/react-input-duration)
includes submission and reset; serve the repository root and open
`/packages/react-input-duration/react-hook-form-demo.html` to try it locally.

## Development

From this directory, run `npm ci` followed by `npm test` to test the wrapper and its TypeScript types.

To try the local wrapper, run `python3 -m http.server 8000` from the repository root and open
`http://localhost:8000/packages/react-input-duration/demo.html`. The demo uses the local wrapper and
web component; React is loaded from a CDN, so it requires an internet connection.
