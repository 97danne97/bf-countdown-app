<template>
  <Nav></Nav>
  <main>
    <router-view v-slot="{ Component, route }" el="div">
      <transition :name="route.meta.transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
<script>
import Nav from '@/components/AppSkeleton/Nav'

export default {
  components: {
    Nav
  },
  methods: {
    // Countdown and display time remaining
    countDown (event) {
      // Find time difference
      const distance = this.getTimeDifference(new Date(event.date).getTime())
      event.distance = distance

      if (distance <= 81000) {
        event.mood = 'released'
      } else if (distance < 3600000) {
        event.mood = 'launch'
      } else if (distance < 86400000) {
        event.mood = 'hype'
      } else {
        event.mood = 'calm'
      }

      // Time calculations for days, hours, minutes and seconds
      var d = Math.floor(distance / (1000 * 60 * 60 * 24))
      var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var s = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance <= 0) {
        event.times = [0, 0, 0, 0]
        clearInterval(event.interval)
      } else {
        event.times = [d, h, m, s]
      }

      // Add zero to numbers below 10
      event.times.forEach((time, index) => {
        let t = time.toString()
        if (t.length === 1) {
          t = '0'.concat(t)
        }
        event.times[index] = t
      })
    },
    getTimeDifference (toDate, fromDate = new Date().getTime()) {
      return toDate - fromDate
    }
  },
  created () {
    this.$store.state.events.forEach(event => {
      event.interval = setInterval(() => this.countDown(event), 1000)
    })
  }
}
</script>
<style>
/* Imports */
@import url('assets/css/animations.css');
@import url('assets/css/fonts.css');

::-webkit-scrollbar{
  display: block;
  width: 3px;
  height: 3px;
  background-color: #011c26;
}

::-webkit-scrollbar-thumb{
  background-color: #26ffdf;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.486);
}

.bg-blur {
  backdrop-filter: blur(25px);
}

hr{
  border-color: #26ffdf;
  padding: 0;margin: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: url('assets/images/bg.jpg');
  background-attachment: fixed;
}
#app {
  font-family: BFModernista;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

main {
  height: calc(100vh - 60px);
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  margin-top: 60px;
}
main > div{
  width: 100%;
  padding: 20px;
}
</style>
