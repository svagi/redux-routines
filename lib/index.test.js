'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global describe, it, expect */


var _index = require('./index');

var stages = _index.DEFAULT_SETTINGS.stages;


describe('createRoutine', function () {
  it('should be a function', function () {
    var routine = (0, _index.createRoutine)('test');
    expect(typeof routine === 'undefined' ? 'undefined' : _typeof(routine)).toBe('function');
  });
  it('should have all routine properties', function () {
    var routine = (0, _index.createRoutine)('test');
    stages.forEach(function (stage) {
      expect(routine).toHaveProperty(stage.toUpperCase());
      expect(routine).toHaveProperty(stage.toLowerCase());
    });
  });
  it('should create all action types with default stages', function () {
    var routine = (0, _index.createRoutine)('test');
    stages.forEach(function (stage) {
      var actionCreator = routine[stage.toLowerCase()];
      var actionType = routine[stage];
      expect(actionType).toBe('test/' + stage);
      expect(String(actionCreator)).toBe(actionType);
    });
  });
  it('should create all action creators with default stages', function () {
    var routine = (0, _index.createRoutine)('test');
    stages.forEach(function (stage) {
      var actionCreator = routine[stage.toLowerCase()];
      var actionType = routine[stage];
      expect(actionCreator()).toEqual({ type: 'test/' + stage });
      expect(actionCreator()).toEqual({ type: actionType });
    });
  });
  it('should create routine with payloadCreator', function () {
    var routine = (0, _index.createRoutine)('test', function (val) {
      return val + 1;
    });
    stages.forEach(function (stage) {
      var actionCreator = routine[stage.toLowerCase()];
      expect(actionCreator(0).payload).toBe(1);
    });
  });
  it('should create routine with metaCreator', function () {
    var routine = (0, _index.createRoutine)('test', null, function () {
      return { extra: true };
    });
    stages.forEach(function (stage) {
      var actionCreator = routine[stage.toLowerCase()];
      expect(actionCreator().meta).toEqual({ extra: true });
    });
  });
  it('should create routine with different separator', function () {
    var routine = (0, _index.createRoutine)('test', null, null, { separator: '+' });
    stages.forEach(function (stage) {
      var actionCreator = routine[stage.toLowerCase()];
      expect(actionCreator()).toEqual({ type: 'test+' + stage });
    });
  });
  it('should create routine with explicit stages', function () {
    var stages = ['REQUEST', 'SUCCESS', 'FAILURE'];
    var routine = (0, _index.createRoutine)('test', null, null, { stages: stages });
    stages.forEach(function (stage) {
      expect(routine).toHaveProperty(stage.toUpperCase());
      expect(routine).toHaveProperty(stage.toLowerCase());
    });
    expect(routine).not.toHaveProperty('TRIGGER');
    expect(routine).not.toHaveProperty('trigger');
    expect(routine).not.toHaveProperty('FULFILL');
    expect(routine).not.toHaveProperty('fulfill');
  });
});

describe('createActionType', function () {
  it('should throws if prefix is not specified', function () {
    expect(function () {
      return (0, _index.createActionType)();
    }).toThrow();
  });
  it('should throws if prefix is a not string', function () {
    expect(function () {
      return (0, _index.createActionType)(0);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)(1);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)(true);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)(false);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)({});
    }).toThrow();
  });
  it('should throws if stage is a not string', function () {
    expect(function () {
      return (0, _index.createActionType)('', 0);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)('', 1);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)('', true);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)('', false);
    }).toThrow();
    expect(function () {
      return (0, _index.createActionType)('', {});
    }).toThrow();
  });
  it('should prefix type', function () {
    expect((0, _index.createActionType)('TEST', 'TYPE', '_')).toBe('TEST_TYPE');
  });
  it('should not modify prefix to uppercase', function () {
    expect((0, _index.createActionType)('@test/TEST', 'TYPE', '_')).toBe('@test/TEST_TYPE');
  });
});