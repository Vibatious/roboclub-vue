<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 lg10 xl8 offset-lg1 offset-xl2>
        <v-card class="green white--text">
          <div class="text-xs-center headline pt-4 pb-4">{{robocon.title || 'Robocon'}}</div>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="green" background-color="green lighten-3"></v-progress-linear>
        </v-card>
      </v-flex>
      <v-flex xs12 lg4>
        {{robocon.introduction}}
      </v-flex>
      <v-flex xs12 lg4>
        {{ robocon.about }}
      </v-flex>
      <v-flex xs12 lg4>
        {{ robocon.downloads }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Robocon'
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState('robocon', ['robocon'])
  },
  methods: mapActions('robocon', ['setRef']),
  created() {
    this.setRef({
      ref: this.$firebase.database().ref('robocon/current'),
      callbacks: {
        readyCallback: () => {
          this.loading = false
        },
        cancelCallback: error => {
          console.error(error)
          this.loading = false
        }
      }
    })
  }
}
</script>
