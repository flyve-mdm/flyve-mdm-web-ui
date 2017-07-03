import GetMode from '../Utils/GetMode'
import GetAllUsers from '../Utils/GetAllUsers'
import InitialPeople from './InitialPeople'

const INITIAL_STATE = {
    splitViewId: 'rootSplitView',
    paneOpened: false,
    mode: GetMode(),
    location: ['people'],
    splitViewConfigs: {
        small: {
            closedDisplayMode: 'none',
            openedDisplayMode: 'overlay'
        },
        medium: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'overlay'
        },
        large: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'inline'
        }
    },
    people: InitialPeople(),
    users: ''
}

// Constants
const HANDLE_TOGGLE_PANE = 'flyve-mdm-web-ui/Users/handleTogglePane'
const CLOSE_PANE = 'flyve-mdm-web-ui/Users/closePane'
const CHANGE_MODE = 'flyve-mdm-web-ui/Users/changeMode'
const CHANGE_LOCATION = 'flyve-mdm-web-ui/Users/changeLocation'
const HANDLE_BACK = 'flyve-mdm-web-ui/Users/handleBack'
const CHANGE_PEOPLE = 'flyve-mdm-web-ui/Users/changePeople'
const UPLOAD_USERS = 'flyve-mdm-web-ui/Users/uploadUsers'

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_TOGGLE_PANE:
            return {
               ...state,
               paneOpened: !state.paneOpened
            }

        case CLOSE_PANE:
            return {
               ...state,
               paneOpened: false
            }
        
        case CHANGE_MODE:
            return {
               ...state,
               mode: action.nexMode
            }
        
        case CHANGE_LOCATION:
            return {
               ...state,
               location: action.newLocation
            }

        case HANDLE_BACK:
            return {
               ...state,
               location: [...state.location.slice(0, 1)]
            }
        case CHANGE_PEOPLE:
            return {
               ...state,
               people: action.newPeople
            }
        case UPLOAD_USERS:
            return {
               ...state,
               users: action.users
            }

        default: return state
    }
}

// Action Creators
export function handleTogglePane () {
  return { 
      type: HANDLE_TOGGLE_PANE
    }
}
export function closePane () {
  return { 
      type: CLOSE_PANE
    }
}
export function changeMode (nexMode) {
  return { 
      type: CHANGE_MODE,
      nexMode
    }
}
export function changeLocation (newLocation) {
  return { 
      type: CHANGE_LOCATION,
      newLocation
    }
}
export function handleBack () {
  return { 
      type: HANDLE_BACK
    }
}
export function changePeople (newPeople) {
  return { 
      type: CHANGE_PEOPLE,
      newPeople
    }
}
export function uploadUsers (users) {
  return { 
      type: UPLOAD_USERS,
      users
    }
}