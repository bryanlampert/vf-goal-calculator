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
              href="/goals"
              @click.native="toggleDialog"
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
    toggleDialog () {
      this.$store.commit('toggleDialog')
    }
  },
  computed: {
    dialog: function () {
      return this.$store.state.dialog
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

