'use strict';

exports.__esModule = true;
exports.prefixType = prefixType;
exports.createAction = createAction;
exports.createRoutine = createRoutine;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * redux-routines
 */
var identity = function identity(f) {
  return f;
};

var TRIGGER = exports.TRIGGER = 'TRIGGER';
var REQUEST = exports.REQUEST = 'REQUEST';
var SUCCESS = exports.SUCCESS = 'SUCCESS';
var FAILURE = exports.FAILURE = 'FAILURE';
var FULFILL = exports.FULFILL = 'FULFILL';

function prefixType(prefix, type) {
  if (typeof prefix !== 'string') {
    throw new Error('Invalid routine prefix. It should be string.');
  }
  return prefix + '_' + type;
}

function createAction(type, payload) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(args, [{ type: type, payload: payload }]));
}

function createRoutine(prefix) {
  var enhancer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

  var routine = {
    TRIGGER: prefixType(prefix, TRIGGER),
    REQUEST: prefixType(prefix, REQUEST),
    SUCCESS: prefixType(prefix, SUCCESS),
    FAILURE: prefixType(prefix, FAILURE),
    FULFILL: prefixType(prefix, FULFILL),
    state: {
      trigger: false,
      request: false,
      success: false,
      failure: false,
      fulfill: false
    },
    trigger: function trigger(payload) {
      routine.state.trigger = true;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return enhancer(createAction.apply(undefined, [routine.TRIGGER, payload].concat(_toConsumableArray(args))));
    },
    request: function request(payload) {
      routine.state.request = true;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return enhancer(createAction.apply(undefined, [routine.REQUEST, payload].concat(_toConsumableArray(args))));
    },
    success: function success(payload) {
      routine.state.success = true;
      routine.state.failure = false;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return enhancer(createAction.apply(undefined, [routine.SUCCESS, payload].concat(_toConsumableArray(args))));
    },
    failure: function failure(payload) {
      routine.state.success = false;
      routine.state.failure = true;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return enhancer(createAction.apply(undefined, [routine.FAILURE, payload].concat(_toConsumableArray(args))));
    },
    fulfill: function fulfill(payload) {
      routine.state.fulfill = true;

      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      return enhancer(createAction.apply(undefined, [routine.FULFILL, payload].concat(_toConsumableArray(args))));
    }
  };
  function call(payload) {
    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return routine.trigger.apply(routine, [payload].concat(args));
  }
  return Object.assign(call, routine);
}