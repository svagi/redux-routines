"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SETTINGS = void 0;
exports.createActionType = createActionType;
exports.createRoutine = createRoutine;
exports["default"] = void 0;
var _reduxActions = require("redux-actions");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Default routine settings
var DEFAULT_SETTINGS = {
  separator: '/',
  stages: ['TRIGGER', 'REQUEST', 'SUCCESS', 'FAILURE', 'FULFILL']
};

// Routine action type factory
exports.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
function createActionType(prefix, stage, separator) {
  if (typeof prefix !== 'string' || typeof stage !== 'string') {
    throw new Error('Invalid routine prefix or stage. It should be string.');
  }
  return "".concat(prefix).concat(separator).concat(stage);
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
var _default = createRoutine;
exports["default"] = _default;