import React from 'react';
import { createRoot } from 'react-dom/client';
import { Controller, useForm } from 'react-hook-form';
import InputDuration from './index.js';

const h = React.createElement;

class DemoError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }
    static getDerivedStateFromError() { return { failed: true }; }
    componentDidCatch(error) { console.error('Unable to load the duration input:', error); }
    render() {
        return this.state.failed
            ? h('p', { role: 'alert' }, 'Could not load the duration input. Check the console and reload.')
            : this.props.children;
    }
}

function App() {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { duration: '00:00:10.000' },
        shouldFocusError: false,
    });
    const [submitted, setSubmitted] = React.useState(null);
    return h('form', { onSubmit: handleSubmit(data => setSubmitted(data.duration)) },
        h('label', { htmlFor: 'duration' }, 'Duration'),
        h(Controller, {
            name: 'duration', control,
            rules: { validate: value => value !== '00:00:00.000' || 'Choose a duration greater than zero.' },
            render: ({ field, fieldState }) => h(React.Fragment, null,
                h('div', { className: 'scroll' },
                    h(InputDuration, {
                        ...field, id: 'duration', tabThrough: true,
                        'aria-invalid': fieldState.invalid,
                        'aria-describedby': fieldState.error ? 'duration-error' : undefined,
                    })),
                fieldState.error && h('p', { id: 'duration-error', role: 'alert' }, fieldState.error.message)),
        }),
        h('button', { type: 'submit' }, 'Submit'),
        h('button', { type: 'button', onClick: () => { reset(); setSubmitted(null); } }, 'Reset'),
        h('p', { role: 'status' }, submitted === null ? 'No submission yet.' : h(React.Fragment, null, 'Submitted: ', h('output', null, submitted))));
}

createRoot(document.querySelector('#app')).render(h(DemoError, null, h(App)));
