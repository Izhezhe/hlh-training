import * as types from './mutation-types'

const mutations = {
  [types.SET_QUES] (state, ques) {
    state.ques = ques
  }
}

export default mutations
