<template>
  <Nav/>
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
  components: { Nav },
  methods: {
    // Countdown and display time remaining
    countDown (event) {
      // Find time difference
      const distance = this.getTimeDifference(new Date(event.date).getTime())
      event.distance = distance

      if (distance <= 60000)
        event.mood = 'released'
      else if (distance < 3600000)
        event.mood = 'launch'
      else if (distance < 86400000)
        event.mood = 'hype'
      else
        event.mood = 'calm'

      // Time calculations for days, hours, minutes and seconds
      const d = Math.floor(distance / (1000 * 60 * 60 * 24))
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance <= 0) {
        event.times = [0, 0, 0, 0]
        clearInterval(event.interval)
      } else
        event.times = [d, h, m, s]

      // Add zero to numbers below 10
      event.times.forEach((time, index) => {
        let t = time.toString()
        if (t.length === 1)
          t = '0'.concat(t)
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

::-webkit-scrollbar-thumb{ background-color: #26ffdf; }

.bg-dark { background-color: rgba(0, 0, 0, 0.486); }

.bg-blur {  backdrop-filter: blur(25px); }

.chip {
  border-radius: 7px;
  color: #011c26;
  margin-left: 5px;
  background-color: white;
  font-size: 10px;
  padding: 1px 5px;
}

h1.jumbotron { font-size: 40px; }

* { box-sizing: border-box; }

a { text-decoration: none; }

body {
  margin: 0;
  padding: 0;
  background: url('assets/images/bg.jpg');
  background-attachment: fixed;
  overflow-x: hidden;
}

hr { border-color: #26ffdf; }

#app {
  font-family: BFModernista;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

main {
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  margin-top: 60px;
  width: 100vw;
}

main > div {
  min-height: calc(100vh - 60px);
  width: 100%;
  padding: 20px;
}

</style>
