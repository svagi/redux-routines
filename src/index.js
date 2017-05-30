/**
 * redux-routines
 */
const identity = f => f

export const TRIGGER = 'TRIGGER'
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const FULFILL = 'FULFILL'

export function prefixType (prefix, type) {
  if (typeof prefix !== 'string') {
    throw new Error('Invalid routine prefix. It should be string.')
  }
  return `${prefix.toUpperCase()}_${type}`
}

export function createAction (type, payload, ...args) {
  return Object.assign(...args, {
    type: type,
    payload: payload
  })
}

export function createRoutine (prefix, enhancer = identity) {
  const routine = {
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
    trigger (payload, ...args) {
      routine.state.trigger = true
      return createAction(routine.TRIGGER, enhancer(payload), ...args)
    },
    request (payload, ...args) {
      routine.state.request = true
      return createAction(routine.REQUEST, enhancer(payload), ...args)
    },
    success (payload, ...args) {
      routine.state.success = true
      routine.state.failure = false
      return createAction(routine.SUCCESS, enhancer(payload), ...args)
    },
    failure (payload, ...args) {
      routine.state.success = false
      routine.state.failure = true
      return createAction(routine.FAILURE, enhancer(payload), ...args)
    },
    fulfill (payload, ...args) {
      routine.state.fulfill = true
      return createAction(routine.FULFILL, enhancer(payload), ...args)
    }
  }
  function call (payload, enhancer = identity) {
    return enhancer(routine.trigger(payload))
  }
  return Object.assign(call, routine)
}
