import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import InputDuration from '../index.js';

test('renders on the server without browser globals', () => {
    const html = renderToString(React.createElement(InputDuration, { showDays: true, 'aria-label': 'Duration' }));
    assert.match(html, /<input-duration/);
    assert.match(html, /show-days=""/);
    assert.match(html, /aria-label="Duration"/);
});
