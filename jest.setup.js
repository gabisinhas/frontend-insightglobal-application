// Polyfill for TextEncoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add jest-dom for extended matchers
require('@testing-library/jest-dom');