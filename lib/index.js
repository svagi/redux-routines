'use strict';

exports.__esModule = true;
exports.DEFAULT_SETTINGS = undefined;
exports.createActionType = createActionType;
exports.createRoutine = createRoutine;

var _reduxActions = require('redux-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * redux-routines
                                                                                                                                                                                                                   */

// Default routine settings
var DEFAULT_SETTINGS = exports.DEFAULT_SETTINGS = {
  separator: '/',
  stages: ['TRIGGER', 'REQUEST', 'SUCCESS', 'FAILURE', 'FULFILL']
};

// Routine action type factory
function createActionType(prefix, stage, separator) {
  if (typeof prefix !== 'string' || typeof stage !== 'string') {
    throw new Error('Invalid routine prefix or stage. It should be string.');
  }
  return '' + prefix + separator + stage;
}

// Routine factory
function createRoutine(prefix, payloadCreator, metaCreator, settings) {
  var _Object$assign = Object.assign({}, DEFAULT_SETTINGS, settings),
      stages = _Object$assign.stages,
      separator = _Object$assign.separator;

  var createRoutineAction = function createRoutineAction(stage) {
    var type = createActionType(prefix, stage, separator);
    return (0, _reduxActions.createAction)(type, payloadCreator, metaCreator);
  };
  return stages.reduce(function (routine, stage) {
    var _Object$assign2;

    var actionCreator = createRoutineAction(stage);
    return Object.assign(routine, (_Object$assign2 = {}, _defineProperty(_Object$assign2, stage.toLowerCase(), actionCreator), _defineProperty(_Object$assign2, stage.toUpperCase(), actionCreator.toString()), _Object$assign2));
  }, createRoutineAction(stages[0]));
}

exports.default = createRoutine;