# Feel free to list or upload a scrape of a control that does the same as <input-duration>:

- Parliament Live TV (js scraped)
  - drawback is jQ
- [Input Duration Element (Muan)](https://github.com/muan/input-duration-element/)
  - one benefit is character separation of units

## Roadmap to Broaden Adoption

Prioritize making `input-duration` straightforward to use in existing applications before pursuing inclusion in a larger component library. Its native Web Component implementation provides a framework-independent foundation.

1. **Framework integration examples (available).** Copy-paste examples for React, Vue, Angular, and Svelte are in the main [README](../README.md#framework-examples). Start with examples rather than separate adapter packages; add adapters only if users encounter framework-specific friction.
2. **Support native HTML forms.** Named submission, required/validity, disabled state, form reset, and browser-managed state restoration are implemented for browsers that support form-associated custom elements. See the [forms and accessibility roadmap](#forms-and-accessibility-roadmap).
3. **Strengthen accessibility.** Document and verify labels for individual segments, group semantics, keyboard interaction, and screen-reader behavior. See the [forms and accessibility roadmap](#forms-and-accessibility-roadmap).
4. **Improve discoverability and onboarding.** Lead the README with short install-and-use instructions for common frameworks, and review package metadata for TypeScript declarations and clear exports.
5. **Approach component libraries with focused integrations.** Offer an optional integration example or wrapper that follows each library's conventions before proposing that a specialized duration control be included in its core set.

Keep the component's purpose clear throughout: it supports elapsed-duration entry in a fixed format, including durations over 24 hours; it is not a replacement for time-of-day inputs.

### Potential Integration Prospects

These are possible targets for examples, wrappers, or future contribution proposals—not existing integrations or confirmed partnerships. Start with the framework-independent component libraries, then consider framework-specific ecosystems where users request them.

#### Web Component libraries

- [Web Awesome](https://webawesome.com/) (formerly Shoelace)
- [Vaadin Components](https://vaadin.com/docs/latest/components)
- [FAST](https://www.fast.design/)

#### Framework-specific component libraries

- [MUI](https://mui.com/) and [Ant Design](https://ant.design/) for React
- [Angular Material](https://material.angular.io/) for Angular
- [PrimeReact](https://primereact.org/), [PrimeVue](https://primevue.org/), and [PrimeNG](https://primeng.org/) for React, Vue, and Angular
- [Vuetify](https://vuetifyjs.com/) for Vue

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
