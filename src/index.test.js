/* global describe, it, expect */
import { createAction, createRoutine, prefixType } from './index'

describe('createRoutine', () => {
  it('should be a function', () => {
    const routine = createRoutine('test')
    expect(typeof routine).toBe('function')
  })
  it('should have initial state', () => {
    const { state } = createRoutine('test')
    expect(state.trigger).toBe(false)
    expect(state.request).toBe(false)
    expect(state.success).toBe(false)
    expect(state.failure).toBe(false)
    expect(state.fulfill).toBe(false)
  })
  it('should have trigger state', () => {
    const routine = createRoutine('test')
    const { state } = routine
    expect(routine.trigger().type).toContain('TRIGGER')
    expect(state.trigger).toBe(true)
    expect(state.request).toBe(false)
    expect(state.success).toBe(false)
    expect(state.failure).toBe(false)
    expect(state.fulfill).toBe(false)
  })
  it('should have request state', () => {
    const routine = createRoutine('test')
    const { state } = routine
    expect(routine.request().type).toContain('REQUEST')
    expect(state.trigger).toBe(false)
    expect(state.request).toBe(true)
    expect(state.success).toBe(false)
    expect(state.failure).toBe(false)
    expect(state.fulfill).toBe(false)
  })
  it('should have success state', () => {
    const routine = createRoutine('test')
    const { state } = routine
    expect(routine.success().type).toContain('SUCCESS')
    expect(state.trigger).toBe(false)
    expect(state.request).toBe(false)
    expect(state.success).toBe(true)
    expect(state.failure).toBe(false)
    expect(state.fulfill).toBe(false)
  })
  it('should have failure state', () => {
    const routine = createRoutine('test')
    const { state } = routine
    expect(routine.failure().type).toContain('FAILURE')
    expect(state.trigger).toBe(false)
    expect(state.request).toBe(false)
    expect(state.success).toBe(false)
    expect(state.failure).toBe(true)
    expect(state.fulfill).toBe(false)
  })
  it('should have fulfill state', () => {
    const routine = createRoutine('test')
    const { state } = routine
    expect(routine.fulfill().type).toContain('FULFILL')
    expect(state.trigger).toBe(false)
    expect(state.request).toBe(false)
    expect(state.success).toBe(false)
    expect(state.failure).toBe(false)
    expect(state.fulfill).toBe(true)
  })
  it('should modify payload with enhancer', () => {
    const routine = createRoutine('test', action => {
      action.payload += 1
      return action
    })
    expect(routine.trigger(0).payload).toBe(1)
    expect(routine.request(0).payload).toBe(1)
    expect(routine.success(0).payload).toBe(1)
    expect(routine.failure(0).payload).toBe(1)
    expect(routine.fulfill(0).payload).toBe(1)
  })
  it('should trigger on routine invocation', () => {
    const routine = createRoutine('test')
    const action = routine()
    expect(action.type).toContain('TRIGGER')
    expect(routine.state.trigger).toBe(true)
  })
})

describe('createAction', () => {
  it('should create an action object', () => {
    const type = 'TEST'
    const payload = {}
    const action = createAction(type, payload)
    expect(action).toMatchObject({
      type: type,
      payload: payload
    })
  })
  it('should create an action object with additional properties', () => {
    const type = 'TEST'
    const payload = {}
    const props = { test: true }
    const action = createAction(type, payload, props)
    expect(action).toMatchObject({
      type: type,
      payload: payload,
      test: true
    })
  })
  it('should not mutate action with additional properties', () => {
    const type = 'TEST'
    const props = { test: true }
    const action1 = createAction('type1', null, props)
    const action2 = createAction('type2', null, props)
    expect(action1.type).toContain('type1')
    expect(action2.type).toContain('type2')
  })
})

describe('prefixType', () => {
  it('should throws if prefix is not specified', () => {
    expect(prefixType).toThrow()
  })
  it('should throws if prefix is a not string', () => {
    expect(() => prefixType(0)).toThrow()
    expect(() => prefixType(1)).toThrow()
    expect(() => prefixType(true)).toThrow()
    expect(() => prefixType(false)).toThrow()
    expect(() => prefixType({})).toThrow()
  })
  it('should prefix type', () => {
    expect(prefixType('TEST', 'TYPE')).toBe('TEST_TYPE')
  })
  it('should not modify prefix to uppercase', () => {
    expect(prefixType('@@test/TEST', 'TYPE')).toBe('@@test/TEST_TYPE')
  })
})
