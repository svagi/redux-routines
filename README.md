# redux-routines

Simple, yet effective tool for removing Redux boilerplate code.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/svagi/redux-routines.svg?style=shield)](https://circleci.com/gh/svagi/redux-routines)
[![Coverage Status](https://coveralls.io/repos/github/svagi/redux-routines/badge.svg)](https://coveralls.io/github/svagi/redux-routines)

## About

The `redux-routines` is utility library for [redux](https://github.com/reactjs/redux) whose main goal is simplicity and boilerplate reduction.

## Installation

```sh
npm install --save redux-routines
```

## Features

* Predefined actions creators and action types for common async tasks in a single object called "routine"
* [FSA](https://github.com/acdlite/flux-standard-action) compatible – based on [redux-actions](https://github.com/reduxactions/redux-actions) library

## The gist

```js
import { createStore } from 'redux'
import { createRoutine } from 'redux-routines'

// Create a new "fetchUsers" routine
const fetchUsers = createRoutine('FETCH_USERS')

// Created action types
fetchUsers.TRIGGER === 'FETCH_USERS_TRIGGER' // true
fetchUsers.REQUEST === 'FETCH_USERS_REQUEST' // true
fetchUsers.SUCCESS === 'FETCH_USERS_SUCCESS' // true
fetchUsers.FAILURE === 'FETCH_USERS_FAILURE' // true
fetchUsers.FULFILL === 'FETCH_USERS_FULFILL' // true

// Available actions
const payload = {}
fetchUsers.trigger(payload)
// { type: 'FETCH_USERS_TRIGGER', payload: {} }
fetchUsers.request(payload)
// { type: 'FETCH_USERS_REQUEST', payload: {} };
fetchUsers.success(payload)
// { type: 'FETCH_USERS_SUCCESS', payload: {} };
fetchUsers.failure(payload)
// { type: 'FETCH_USERS_FAILURE', payload: {} };
fetchUsers.fulfill(payload)
// { type: 'FETCH_USERS_FULFILL', payload: {} };

// Initial state of reducer
const initialState = {
  isProcessing: false,
  isFetching: false,
  data: [],
  error: null
}

// The reducer
function users(state = initialState, action) {
  switch (action.type) {
    case fetchUsers.TRIGGER:
      return { ...state, isProcessing: true }
    case fetchUsers.REQUEST:
      return { ...state, isFetching: true }
    case fetchUsers.SUCCESS:
      return { ...state, isFetching: false, data: action.payload }
    case fetchUsers.FAILURE:
      return { ...state, isFetching: false, error: action.payload }
    case fetchUsers.FULFILL:
      return { ...state, isProcessing: false }
  }
}

// The store
const store = createStore(users)
store.subscribe(() => console.log(store.getState()))

// Describe state changes with routine actions
store.dispatch(fetchUsers.trigger())
// { isProcessing: true, isFetching: false, data: [], error: null }
store.dispatch(fetchUsers.request())
// { isProcessing: true, isFetching: true, data: [], error: null }
store.dispatch(fetchUsers.success([1, 2]))
// { isProcessing: true, isFetching: false, data: [ 1, 2 ], error: null }
store.dispatch(fetchUsers.fulfill())
// { isProcessing: false, isFetching: false, data: [ 1, 2 ], error: null }
```

### License

MIT
