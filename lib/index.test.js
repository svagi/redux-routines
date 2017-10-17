'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global describe, it, expect */


var _index = require('./index');

describe('createRoutine', function () {
  it('should be a function', function () {
    var routine = (0, _index.createRoutine)('test');
    expect(typeof routine === 'undefined' ? 'undefined' : _typeof(routine)).toBe('function');
  });
  it('should have initial state', function () {
    var _createRoutine = (0, _index.createRoutine)('test'),
        state = _createRoutine.state;

    expect(state.trigger).toBe(false);
    expect(state.request).toBe(false);
    expect(state.success).toBe(false);
    expect(state.failure).toBe(false);
    expect(state.fulfill).toBe(false);
  });
  it('should have trigger state', function () {
    var routine = (0, _index.createRoutine)('test');
    var state = routine.state;

    expect(routine.trigger().type).toContain('TRIGGER');
    expect(state.trigger).toBe(true);
    expect(state.request).toBe(false);
    expect(state.success).toBe(false);
    expect(state.failure).toBe(false);
    expect(state.fulfill).toBe(false);
  });
  it('should have request state', function () {
    var routine = (0, _index.createRoutine)('test');
    var state = routine.state;

    expect(routine.request().type).toContain('REQUEST');
    expect(state.trigger).toBe(false);
    expect(state.request).toBe(true);
    expect(state.success).toBe(false);
    expect(state.failure).toBe(false);
    expect(state.fulfill).toBe(false);
  });
  it('should have success state', function () {
    var routine = (0, _index.createRoutine)('test');
    var state = routine.state;

    expect(routine.success().type).toContain('SUCCESS');
    expect(state.trigger).toBe(false);
    expect(state.request).toBe(false);
    expect(state.success).toBe(true);
    expect(state.failure).toBe(false);
    expect(state.fulfill).toBe(false);
  });
  it('should have failure state', function () {
    var routine = (0, _index.createRoutine)('test');
    var state = routine.state;

    expect(routine.failure().type).toContain('FAILURE');
    expect(state.trigger).toBe(false);
    expect(state.request).toBe(false);
    expect(state.success).toBe(false);
    expect(state.failure).toBe(true);
    expect(state.fulfill).toBe(false);
  });
  it('should have fulfill state', function () {
    var routine = (0, _index.createRoutine)('test');
    var state = routine.state;

    expect(routine.fulfill().type).toContain('FULFILL');
    expect(state.trigger).toBe(false);
    expect(state.request).toBe(false);
    expect(state.success).toBe(false);
    expect(state.failure).toBe(false);
    expect(state.fulfill).toBe(true);
  });
  it('should modify payload with enhancer', function () {
    var routine = (0, _index.createRoutine)('test', function (action) {
      action.payload += 1;
      return action;
    });
    expect(routine.trigger(0).payload).toBe(1);
    expect(routine.request(0).payload).toBe(1);
    expect(routine.success(0).payload).toBe(1);
    expect(routine.failure(0).payload).toBe(1);
    expect(routine.fulfill(0).payload).toBe(1);
  });
  it('should trigger on routine invocation', function () {
    var routine = (0, _index.createRoutine)('test');
    var action = routine();
    expect(action.type).toContain('TRIGGER');
    expect(routine.state.trigger).toBe(true);
  });
});

describe('createAction', function () {
  it('should create an action object', function () {
    var type = 'TEST';
    var payload = {};
    var action = (0, _index.createAction)(type, payload);
    expect(action).toMatchObject({
      type: type,
      payload: payload
    });
  });
  it('should create an action object with additional properties', function () {
    var type = 'TEST';
    var payload = {};
    var props = { test: true };
    var action = (0, _index.createAction)(type, payload, props);
    expect(action).toMatchObject({
      type: type,
      payload: payload,
      test: true
    });
  });
  it('should not mutate action with additional properties', function () {
    var type = 'TEST';
    var props = { test: true };
    var action1 = (0, _index.createAction)('type1', null, props);
    var action2 = (0, _index.createAction)('type2', null, props);
    expect(action1.type).toContain('type1');
    expect(action2.type).toContain('type2');
  });
});

describe('prefixType', function () {
  it('should throws if prefix is not specified', function () {
    expect(_index.prefixType).toThrow();
  });
  it('should throws if prefix is a not string', function () {
    expect(function () {
      return (0, _index.prefixType)(0);
    }).toThrow();
    expect(function () {
      return (0, _index.prefixType)(1);
    }).toThrow();
    expect(function () {
      return (0, _index.prefixType)(true);
    }).toThrow();
    expect(function () {
      return (0, _index.prefixType)(false);
    }).toThrow();
    expect(function () {
      return (0, _index.prefixType)({});
    }).toThrow();
  });
  it('should prefix type', function () {
    expect((0, _index.prefixType)('TEST', 'TYPE')).toBe('TEST_TYPE');
  });
  it('should not modify prefix to uppercase', function () {
    expect((0, _index.prefixType)('@@test/TEST', 'TYPE')).toBe('@@test/TEST_TYPE');
  });
});