<template>
  <div>
    <v-jumbotron :gradient="gradient" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">
              <v-icon style="font-size: 100px;">mdi-alert-box</v-icon>
              My Offers page under construction
            </h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
  export default {
    data: () => ({
      gradient: 'to right, #3687c6, #56c2cb'
    })
  }
</script>
