/**
 * redux-routines
 */

import { createAction } from 'redux-actions'

// Default routine settings
export const DEFAULT_SETTINGS = {
  separator: '/',
  stages: ['TRIGGER', 'REQUEST', 'SUCCESS', 'FAILURE', 'FULFILL']
}

// Routine action type factory
export function createActionType (prefix, stage, separator) {
  if (typeof prefix !== 'string' || typeof stage !== 'string') {
    throw new Error('Invalid routine prefix or stage. It should be string.')
  }
  return `${prefix}${separator}${stage}`
}

// Routine factory
export function createRoutine (prefix, payloadCreator, metaCreator, settings) {
  const { stages, separator } = Object.assign({}, DEFAULT_SETTINGS, settings)
  const createRoutineAction = stage => {
    const type = createActionType(prefix, stage, separator)
    return createAction(type, payloadCreator, metaCreator)
  }
  return stages.reduce((routine, stage) => {
    const actionCreator = createRoutineAction(stage)
    return Object.assign(routine, {
      [stage.toLowerCase()]: actionCreator,
      [stage.toUpperCase()]: actionCreator.toString()
    })
  }, createRoutineAction(stages[0]))
}

export default createRoutine
