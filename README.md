Synth
=====

Hobby project to

* learn about WebAudio, WebMidi, oscillators and filters
* more about the React and Redux ecosystem
* find a simple and tidy convention for all shapes and size of project
* try out parceljs
* go PWA baby

## Dependencies

- [React](https://reactjs.org/) for components
- [Redux](https://redux.js.org/) for state
- [Stylus](http://stylus-lang.com/) for style

## Build

I am trying outo [parcel](https://parceljs.org), a zero config build tool that
is a great time saver getting started on any hobby project in need of a build.

## Developing

```
# install all the deps
yarn

# run the watch build and dev server (parcel)
yarn dev
```

## Project structure

I decided to make up a convention since no one has ever thought of that but me, right now.

All of these names are my original ideas.

### lib

- `manager.js` - Scripts to run side effects. I will probably move this to redux-saga.

Pretty much anything can end up in here; utilities etc.

### state

- `actions.js` - redux actions
- `reducer.js` - redux reducer

### ui

Pretty self explanatory. React components, prefixed with `UI` to be explicit
that this file is the view representation and not an application entity.

## Typings

I'm using typescript in VSCode to read the jsdocs and help out, without getting
in my way. I've set up some typings in the `typings` folder.
