import { Mutation, Action } from 'vuex'
import { StoreModuleType } from '@/utils/store'

export interface CurrentUser {
  id: number
  name: string
  avatar: string
  roles: string[]
}

export interface StateType {
  currentUser: CurrentUser
  message: number
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType
  mutations: {
    saveCurrentUser: Mutation<StateType>
    saveMessage: Mutation<StateType>
  }
  actions: {
    fetchCurrent: Action<StateType, StateType>
    fetchMessage: Action<StateType, StateType>
    logout: Action<StateType, StateType>
  }
}

const initState: StateType = {
  currentUser: {
    id: 0,
    name: '',
    avatar: '',
    roles: [],
  },
  message: 0,
}

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'user',
  state: {
    ...initState,
  },
  mutations: {
    saveCurrentUser(state, payload) {
      state.currentUser = {
        ...initState.currentUser,
        ...payload,
      }
    },
    saveMessage(state, payload) {
      state.message = payload
    },
  },
  actions: {
    async logout({ commit }) {
      try {
        // await removeToken()
        commit('saveCurrentUser', { ...initState.currentUser })
        return true
      } catch (error) {
        return false
      }
    },
  },
}

export default StoreModel
