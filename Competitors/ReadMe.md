# Duration Input Landscape

This page compares duration-specific controls with adjacent time-of-day and general-purpose inputs. The distinction
matters: a duration is a time span, whether it describes time already elapsed or time set for a future alarm, timer,
limit, or other interval. It is not a clock time or calendar date.

## Comparable Controls

### Duration-specific inputs

| Control | Framework and input model | Capabilities and differences |
| --- | --- | --- |
| [`input-duration`](../README.md) | Framework-independent Web Component | Separate numeric fields for units, optional days, configurable per-unit dividers, and a fixed duration format. Works in React and other frameworks without a separate framework-specific implementation. |
| [Input Duration Element](https://github.com/muan/input-duration-element/) | Web Component | Another duration-focused custom element. The existing project notes call out its character separation between units. |

### React ecosystem alternatives

#### React web

| Control | Approach | npm downloads/week* |
| --- | --- | ---: |
| [react-duration-input](https://github.com/kennybecerra/react-duration-input) | Formatting hook for a text input; returns milliseconds | 590 |
| [react-duration-picker](https://github.com/flurmbo/react-duration-picker) | Mobile-style scrolling picker for hours, minutes, and seconds | 329 |
| [react-duration-input-mask](https://github.com/nijk/react-duration-input-mask) | Masked input for days through seconds | 48 |
| [react-duration-control](https://github.com/nikkorn/react-duration-control) | Configurable segmented control, including days and milliseconds | Not verified |
| [react-duration](https://github.com/cloudtion/react-duration) | Duration input with a value in seconds | Not verified |
| [material-duration-picker](https://github.com/tran-simon/material-duration-picker) | Material-style picker | Not verified |

#### React Native

| Control | Approach | npm downloads/week* |
| --- | --- | ---: |
| [react-native-timer-picker](https://github.com/troberts-28/react-native-timer-picker) | Mobile scrolling duration picker for timers and alarms | 49,549 |
| [React Native Pickers](https://github.com/elik56a/react-native-pickers) | Picker collection including duration; also supports web | 237 |

\* npm figures are for **14–20 November 2026** and include automated installs. The remaining counts were not verified.
React Native packages target native applications and are not directly usable as browser controls.

### Adjacent controls (not dedicated duration inputs)

| Library | Related controls | Difference from a duration input |
| --- | --- | --- |
| [Kendo UI](https://www.telerik.com/kendo-react-ui/components/inputs) | TimePickers and general inputs such as numeric and masked fields across its framework suites | The TimePicker is for clock time, not a time span. I found no dedicated duration input in the official input catalogs reviewed for [React](https://www.telerik.com/kendo-react-ui/components/inputs), [Angular](https://www.telerik.com/kendo-angular-ui/components/inputs), and [Vue](https://www.telerik.com/kendo-vue-ui/components/inputs), or the [jQuery TimePicker documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/timepicker/overview). |
| [jQuery UI](https://jqueryui.com/) | The [Spinner](https://jqueryui.com/spinner/) includes a [Time spinner demo](https://jqueryui.com/resources/demos/spinner/time.html). | The demo formats a time of day (for example, `08:30 PM`) using culture-aware date formatting. Spinner is a general numeric widget, not a duration control. |

The [Parliament Live TV example](https://www.parliamentlive.tv/) was also noted during an earlier scan; it is a site-specific, jQuery-based example rather than a reusable framework-independent control.

### Countdown displays and timers

These are potential **partners**, not alternatives: `input-duration` lets a user choose a time span; a countdown
display or timer then tracks the time remaining. Some count down to a target date rather than accepting a duration.

| Project | npm downloads/week* | What it does |
| --- | ---: | --- |
| [react-countdown](https://github.com/ndresx/react-countdown) | 472,003 | Customizable React countdown display |
| [react-timer-hook](https://github.com/amrlabib/react-timer-hook) | 225,262 | React countdown and stopwatch logic |
| [react-countdown-circle-timer](https://github.com/vydimitrov/react-countdown-circle-timer) | 103,658 | Animated circular React countdown |
| [GrapesJS Countdown](https://github.com/GrapesJS/components-countdown) | 41,438 | Countdown for a visual website editor |
| [Vue Countdown](https://github.com/fengyuanchen/vue-countdown) | 34,966 | Vue countdown component |
| [ngx-countdown](https://github.com/cipchk/ngx-countdown) | 34,866 | Angular countdown component |
| [React Flip Clock Countdown](https://github.com/sLeeNguyen/react-flip-clock-countdown) | 25,432 | Animated flip-clock countdown |
| [jQuery Countdown](https://github.com/hilios/jQuery.countdown) | 22,032 | jQuery countdown display |
| [easytimer.js](https://github.com/albert-gonzalez/easytimer.js) | 17,434 | Framework-independent timer and stopwatch logic |
| [lgs1920/countdown](https://github.com/lgs1920/countdown) | Not checked | Web Component counting down to a target date, with animated digits; [live demo](https://lgs1920.github.io/countdown/) |

\* npm figures are for **14–20 November 2026**, include automated installs, and are not counts of individual users.
This is a shortlist from npm search, not an exhaustive ranking. `lgs1920/countdown` was discussed separately and was
not part of that download comparison.

For a first pairing, compare the [lgs1920/countdown demo](https://lgs1920.github.io/countdown/) and
`react-countdown-circle-timer` for presentation, `react-timer-hook` for React timer logic, and `easytimer.js` for a
framework-independent approach. The lgs1920 component uses a target date and Web Awesome dependencies; `easytimer.js`
provides logic rather than a ready-made visual display.

## Roadmap to Broaden Adoption

Prioritize making `input-duration` straightforward to use in existing applications before pursuing inclusion in a larger component library. Its native Web Component implementation provides a framework-independent foundation.

1. **Framework integration examples (available).** Copy-paste examples for React, Vue, Angular, and Svelte are in the main [README](../README.md#framework-examples). Make the React example especially easy to find: many developers search specifically for React controls and may not realize a Web Component can be used from React. Explain that this is the same framework-independent component, not a separate React implementation. Add adapters only if users encounter framework-specific friction.
2. **Support native HTML forms.** Named submission, required/validity, disabled state, form reset, and browser-managed state restoration are implemented for browsers that support form-associated custom elements. See the [forms and accessibility roadmap](#forms-and-accessibility-roadmap).
3. **Strengthen accessibility.** Document and verify labels for individual segments, group semantics, keyboard interaction, and screen-reader behavior. See the [forms and accessibility roadmap](#forms-and-accessibility-roadmap).
4. **Improve discoverability and onboarding (implemented).** The README now leads with a quick start and framework examples; package metadata exposes the ESM entry point and TypeScript declarations, and manual pages exercise local and CDN imports.
5. **Approach component libraries with focused integrations.** The open [Web Awesome duration-input PR](https://github.com/shoelace-style/webawesome/pull/3077) is an active proposal, not a shipped integration or confirmed acceptance. Use it to learn what a component library needs, and offer focused examples or wrappers that follow each library's conventions before proposing core inclusion.
6. **Explore a countdown pairing.** Try the [react-countdown](../docs/react-countdown-demo.html), [react-timer-hook](../docs/react-timer-hook-demo.html), and [circle timer](../docs/react-countdown-circle-demo.html) examples. They convert the committed duration, including optional days, to a timer's expected value or target date. The react-countdown and circle timer demos start when focus leaves the editor; the timer hook demo uses a Start button. Share a working example with the countdown author and ask whether an example or link would be useful to their users. Consider a separate package or repository only if the integration becomes independently reusable; check both projects' licenses and notice requirements before distribution.

Keep the purpose clear in examples and outreach: this control enters a time span for past or future use cases, such as elapsed time, an alarm, a timer, a limit, or a media offset. It does not replace a time-of-day or date input. Its fixed format avoids locale-dependent clock-time presentation, and its optional days field supports spans longer than 24 hours.

### Potential Integration Prospects

These are possible targets for examples, wrappers, or future contribution proposals—not existing integrations or confirmed partnerships. Start with framework-independent component libraries, then consider framework-specific ecosystems where users request them.

#### Web Component libraries

- [Web Awesome](https://webawesome.com/) (formerly Shoelace; duration-input proposal in [PR #3077](https://github.com/shoelace-style/webawesome/pull/3077))
- [Vaadin Components](https://vaadin.com/docs/latest/components)
- [FAST](https://www.fast.design/)

#### Framework-specific component libraries

- [MUI](https://mui.com/) and [Ant Design](https://ant.design/) for React
- [Angular Material](https://material.angular.io/) for Angular
- [PrimeReact](https://primereact.org/), [PrimeVue](https://primevue.org/), and [PrimeNG](https://primeng.org/) for React, Vue, and Angular
- [Vuetify](https://vuetifyjs.com/) for Vue

#### Duration libraries and forms

These are potential integrations, not competing duration inputs:

| Candidate | Integration idea | Considerations |
| --- | --- | --- |
| [Temporal.Duration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration) | Edit durations and exchange ISO 8601 values. | Browser support is limited; calendar units, negative values, and sub-millisecond precision need explicit handling because they do not directly match this control. |
| [Day.js Duration](https://day.js.org/docs/en/plugin/duration) | Convert between the input and Day.js duration objects. | Requires the Duration plugin; define behavior for values outside the input's supported range and precision. |
| [Luxon Duration](https://moment.github.io/luxon/api-docs/index.html#duration) | Convert between the input and Luxon duration objects. | Define how calendar units and unsupported values are handled. |
| [React Hook Form](https://react-hook-form.com/docs/usecontroller/controller) | Demonstrate a form integration using the React wrapper and `Controller`. | A form library, not a duration implementation; verify value, validation, focus, and reset behavior. |

Prioritize React Hook Form for adoption, or Temporal.Duration for a duration-focused integration.

### Forms and Accessibility Roadmap

#### HTML forms

- [x] Participate in forms using the form-associated custom elements API where supported.
- [x] Submit the duration through a `name` attribute and the component's existing `HH:mm:ss.SSS` value format.
- [x] Define `required` and validity behavior: an untouched zero display is missing when required, and incomplete edits are invalid.
- [x] Reflect disabled state in field interaction and form submission.
- [x] Restore the default value (or zero when unset) on form reset.
- [x] Support browser state restoration, including the required/unset state.
- [x] Add automated tests for named value synchronization, required and invalid values, disabled callbacks, reset, and state restoration.

#### Accessibility

- [ ] Provide an accessible group name and meaningful, individually accessible labels for the hour, minute, second, and millisecond fields.
- [ ] Verify keyboard navigation and editing behavior, including focus order and the component's digit-entry and arrow-key interactions.
- [ ] Test announcements and field relationships with representative screen readers and browsers; document verified combinations and known limitations.
- [ ] Ensure required, invalid, disabled, and focus states are communicated accessibly and remain visibly distinguishable.
- [ ] Add automated accessibility checks where practical, alongside manual keyboard and screen-reader testing.
