# Vuetils

A set of reusable Vue.js components.

## Releasing

This is a versioned/tagged package.

To release a new version:

1. Update the `package.json` version number
2. Build the release `npm run-script build`
3. Tag the release after changes committed. `git tag -a v1.x -m "notes on changes"`
4. Push the code `git push`
5. Push the tag `git push origin v1.x`

## Breaking changes

- 1.5.8 - changes number formatter to return `null` instead of `""` empty string.
