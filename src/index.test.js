/* global describe, it, expect */
import { createRoutine, createActionType, DEFAULT_SETTINGS } from './index'

const { stages } = DEFAULT_SETTINGS

describe('createRoutine', () => {
  it('should be a function', () => {
    const routine = createRoutine('test')
    expect(typeof routine).toBe('function')
  })
  it('should have all routine properties', () => {
    const routine = createRoutine('test')
    stages.forEach(stage => {
      expect(routine).toHaveProperty(stage.toUpperCase())
      expect(routine).toHaveProperty(stage.toLowerCase())
    })
  })
  it('should create all action types with default stages', () => {
    const routine = createRoutine('test')
    stages.forEach(stage => {
      const actionCreator = routine[stage.toLowerCase()]
      const actionType = routine[stage]
      expect(actionType).toBe(`test/${stage}`)
      expect(String(actionCreator)).toBe(actionType)
    })
  })
  it('should create all action creators with default stages', () => {
    const routine = createRoutine('test')
    stages.forEach(stage => {
      const actionCreator = routine[stage.toLowerCase()]
      const actionType = routine[stage]
      expect(actionCreator()).toEqual({ type: `test/${stage}` })
      expect(actionCreator()).toEqual({ type: actionType })
    })
  })
  it('should create routine with payloadCreator', () => {
    const routine = createRoutine('test', val => val + 1)
    stages.forEach(stage => {
      const actionCreator = routine[stage.toLowerCase()]
      expect(actionCreator(0).payload).toBe(1)
    })
  })
  it('should create routine with metaCreator', () => {
    const routine = createRoutine('test', null, () => ({ extra: true }))
    stages.forEach(stage => {
      const actionCreator = routine[stage.toLowerCase()]
      expect(actionCreator().meta).toEqual({ extra: true })
    })
  })
  it('should create routine with different separator', () => {
    const routine = createRoutine('test', null, null, { separator: '+' })
    stages.forEach(stage => {
      const actionCreator = routine[stage.toLowerCase()]
      expect(actionCreator()).toEqual({ type: `test+${stage}` })
    })
  })
  it('should create routine with explicit stages', () => {
    const stages = ['REQUEST', 'SUCCESS', 'FAILURE']
    const routine = createRoutine('test', null, null, { stages: stages })
    stages.forEach(stage => {
      expect(routine).toHaveProperty(stage.toUpperCase())
      expect(routine).toHaveProperty(stage.toLowerCase())
    })
    expect(routine).not.toHaveProperty('TRIGGER')
    expect(routine).not.toHaveProperty('trigger')
    expect(routine).not.toHaveProperty('FULFILL')
    expect(routine).not.toHaveProperty('fulfill')
  })
})

describe('createActionType', () => {
  it('should throws if prefix is not specified', () => {
    expect(() => createActionType()).toThrow()
  })
  it('should throws if prefix is a not string', () => {
    expect(() => createActionType(0)).toThrow()
    expect(() => createActionType(1)).toThrow()
    expect(() => createActionType(true)).toThrow()
    expect(() => createActionType(false)).toThrow()
    expect(() => createActionType({})).toThrow()
  })
  it('should throws if stage is a not string', () => {
    expect(() => createActionType('', 0)).toThrow()
    expect(() => createActionType('', 1)).toThrow()
    expect(() => createActionType('', true)).toThrow()
    expect(() => createActionType('', false)).toThrow()
    expect(() => createActionType('', {})).toThrow()
  })
  it('should prefix type', () => {
    expect(createActionType('TEST', 'TYPE', '_')).toBe('TEST_TYPE')
  })
  it('should not modify prefix to uppercase', () => {
    expect(createActionType('@test/TEST', 'TYPE', '_')).toBe('@test/TEST_TYPE')
  })
})
