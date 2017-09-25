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
  return `${prefix}_${type}`
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
      return enhancer(createAction(routine.TRIGGER, payload, ...args))
    },
    request (payload, ...args) {
      routine.state.request = true
      return enhancer(createAction(routine.REQUEST, payload, ...args))
    },
    success (payload, ...args) {
      routine.state.success = true
      routine.state.failure = false
      return enhancer(createAction(routine.SUCCESS, payload, ...args))
    },
    failure (payload, ...args) {
      routine.state.success = false
      routine.state.failure = true
      return enhancer(createAction(routine.FAILURE, payload, ...args))
    },
    fulfill (payload, ...args) {
      routine.state.fulfill = true
      return enhancer(createAction(routine.FULFILL, payload, ...args))
    }
  }
  function call (payload, ...args) {
    return routine.trigger(payload, ...args)
  }
  return Object.assign(call, routine)
}
