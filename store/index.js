export const state = () => ({
  dialog: false,
  addGoal: false
})

export const mutations = {
  toggleDialog (state) {
    state.dialog = !state.dialog
  },
  toggleAddGoal (state) {
    state.addGoal = !state.addGoal
  }
}
