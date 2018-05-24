<template>
  <v-layout column>
      <div class="headline text-xs-left">
        Hey Ashley, welcome to your dashboard
      </div>
      <v-card>
        <v-container
          fluid
          style="min-width: 95%;"
        >
          <v-card-text>
            <p class="goal-title">Create a goal to get started.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              round
              class="white--text"
              id="goal-button"
              nuxt
              to="/goals"
              @click.native="toggleAddGoal"
            >
              + Add a Goal
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
  </v-layout>
</template>

<script>
export default {
  methods: {
    toggleAddGoal () {
      this.$store.commit('toggleAddGoal')
    }
  }
}
</script>


<style scoped>
.headline {
  padding: 10px;
}
.goal-title {
  text-align: center;
}
#goal-button {
  margin: 0 auto;
}
</style>

