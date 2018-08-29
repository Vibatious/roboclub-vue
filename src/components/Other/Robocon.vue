<template>
  <div>
    <p>The Robocon Page</p>
  </div>
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
