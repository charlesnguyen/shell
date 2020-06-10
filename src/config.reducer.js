const UPDATE_TOKEN = 'UPDATE_TOKEN'
const UPDATE_APPS = 'UPDATE_APPS'

const defaultState = {
  config: 'Shell',
  user: 'Ibanfirst',
  token: '',
  local: 'en',
  redirectUrl: '/login',
  apps: []
}

export const updateTokenAction = (token) => {
  return {
    type: UPDATE_TOKEN,
    payload: token
  }
}

export const updateAvailableAppsAction = (apps) => {
  return {
    type: UPDATE_APPS,
    payload: apps
  }
}
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case UPDATE_APPS:
      return {
        ...state,
        apps: action.payload
      }
    default:
      return state
  }
}
