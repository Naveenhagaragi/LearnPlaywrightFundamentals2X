# LearnPlaywrightFundamentals2X

This repository contains a Playwright automation learning project covering core web testing concepts, locator strategies, assertions, frames, file uploads, downloads, and advanced test setup.

## What is included

- Playwright configuration and project setup
- Example and practice test files under the tests directory
- Coverage for basics, locators, assertions, browser interactions, and framework concepts
- A structured folder layout for progressing from beginner to advanced topics

## Project structure

- package.json - Node.js package configuration
- playwright.config.ts - Playwright configuration
- tests/ - Test suites organized by topic
- node_modules/ - Installed dependencies (ignored by Git)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run all tests:

```bash
npx playwright test
```

3. Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

4. Open the Playwright HTML report (after running tests):

```bash
npx playwright show-report
```

## Notes

- The node_modules folder is excluded from version control using .gitignore.
- This repository is intended for learning and practicing Playwright automation step by step.
