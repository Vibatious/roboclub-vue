<template lang="html">
  <v-container>
    <v-layout v-if="user" row>
      <v-flex xs12 sm8 lg6 xl4 offset-sm2 offset-lg3 offset-xl4>
        <v-card>
          <div class="display-1 text-xs-center pt-3">
            You are already logged in!
          </div>
          <v-layout row wrap class="mt-2 pb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
              <v-btn info large to="/profile" class="purple">
                Profile
              </v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
              <v-btn error large @click="logout">
                Logout
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-show="!user" row>
      <v-flex xs12 sm8 lg6 xl4 offset-sm2 offset-lg3 offset-xl4>
        <v-card>
          <div class="display-1 text-xs-center pt-3">
            Sign In or Register
          </div>
          <div id="firebaseui-auth-container" class="pt-3 pb-3" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style src="firebaseui/dist/firebaseui.css"></style>

<script>
import firebaseui from 'firebaseui'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Sign In'
    }
  },
  computed: mapState(['user']),
  mounted() {
    const firebase = this.$firebase
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    }
    const uiInstance = firebaseui.auth.AuthUI.getInstance()
    const firebaseUI =
      uiInstance !== null
        ? uiInstance
        : new firebaseui.auth.AuthUI(firebase.auth())
    firebaseUI.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
