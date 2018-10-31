# Vuetils

A set of reusable Vue.js components.

## Developing

Running `npm run-script dev` opens 2 tabs. The first is all of the components on
a page that is helpful for testing. The 2nd is a "foamtree" showing the
breakdown of the contents of the package.

## Releasing

This is a versioned/tagged package.

To release a new version:

1. Update the `package.json` version number
2. Build the release `npm run-script build`
3. Commit the code changes.
3. Tag the release. `git tag -a v1.5.x -m "notes on changes"`
4. Push the code `git push`
5. Push the tag `git push origin v1.x`


Notes on deleting tags (in the case they were wrong or need to be fixed).

- `git push --delete origin tagname` - delete a remote tag
- `git tag --delete tagname` - to delete a local tag

## Breaking changes

- 1.5.9 - revert changes in 1.5.8
- 1.5.8 - changes number formatter to return `null` instead of `""` empty string.
