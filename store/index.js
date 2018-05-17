export const state = () => ({
  goals: [],
  dialog: false
})

export const mutations = {
  addGoal: (state, payload) => {
    state.goals.push(payload)
  },
  toggleDialog (state) {
    state.dialog = !state.dialog
  }
}

export const getters = {
  goals: state => state.goals
}
