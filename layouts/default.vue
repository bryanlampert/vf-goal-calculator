<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      permanent
      app
      absolute
      class="primary"
      id="nav"
    >
      <v-list two-line>
        <a href="https://www.vacationfund.io" target="_blank">
          <v-list-tile class="logo-bg">
              <v-list-tile-content>
                <img src="~/assets/images/logo.png" alt="logo" class="logo">
              </v-list-tile-content>
          </v-list-tile>
        </a>
      </v-list>
      <v-list two-line>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
          nuxt
          class="navList"
          active-class="navList activeLink"
        >
          <v-list-tile-action>
            <v-icon medium color="white" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text links" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-spacer></v-spacer>
      <v-btn class="user" flat large>
        <span class="mr-3">{{ user.name }}</span>
        <v-avatar>
          <img :src="user.avatar" :alt="user.name" class="avatar">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        fixed: true,
        items: [
          { icon: 'mdi-home-outline', title: 'My Account', to: '/' },
          { icon: 'mdi-bullseye', title: 'My Goals', to: '/goals' },
          { icon: 'mdi-tag-outline', title: 'My Offers', to: '/offers' },
          { icon: 'mdi-magnify', title: 'Browse Trips', to: '/trips' },
          { icon: 'wb_sunny', title: 'Vacation Policy', to: '/policy' }
        ],
        right: true,
        user: {
          name: 'Ashley F.',
          avatar: require('~/assets/images/Avatar.png')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.navList.primary--text {
  padding: 20px;
  height: 100%;
}
.user {
  border-left: 1px solid #e4e4e4;
  height: 55px;
}
.logo {
  height: 40%;
  margin: 0 auto;
}
.avatar {
  width: 80px;
}
.links {
  font-size: 22px;
  font-weight: 300;
}
.logo-bg {
  background: linear-gradient(to right, #3687c6 15%, #56c2cb);
  margin-top: -8px;
  height: 64px;
  position: relative;
}
#nav {
  width: 250px !important;
}
.list__tile--active .list__tile__action:first-of-type .icon {
  color: #56c2cb !important;
}
.navList.activeLink.list__tile--active{
  border-left: 5px solid #56c2cb !important;
  background: rgba(0, 0, 0, .12) !important;
}
</style>

