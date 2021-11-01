<template>
  <Nav/>
  <main class="bg-dark">
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

/* --- Imports --- */

@import url('assets/css/animations.css');
@import url('assets/css/fonts.css');

/* --- Variables --- */

:root{
  --darkest: #011C26;
  --darker: #025159;
  --dark: #08A696;
  --accent: #26FFDF;
  --red: #FF2C10;
  --orange: #F26A1B;
}

/* --- Class styling --- */

.bg-dark { background-color: rgba(0, 0, 0, 0.5); }

.bg-blur {  backdrop-filter: blur(25px); }

.text-accent { color: var(--accent) !important; }

.chip {
  border-radius: 3px;
  color: var(--darkest);
  background-color: var(--accent);
  font-size: 11px;
  flex-grow: 0;
  padding: 1px 6px;
  transition: background-color .2s ease, color .2s ease;
  white-space: nowrap;
}

.no-margin { margin: 0; }

h1.jumbotron { font-size: 40px; }

/* --- Global styles --- */

::-webkit-scrollbar{
  display: block;
  width: 3px;
  height: 3px;
  background-color: var(--darkest);
}

::-webkit-scrollbar-thumb{ background-color: var(--accent); }

* { box-sizing: border-box; }

p { font-family: EABFFont; }

p > a { color: var(--accent); }

a { text-decoration: none; color: white;}

body, html {
  margin: 0;
  padding: 0;
  background: url('assets/images/bg.jpg');
  background-position: left;
  background-attachment: fixed;
  overflow: hidden;
}

hr { border-color: var(--accent); }

#app {
  font-family: BFModernista;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 100%;
}

main {
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

main > div {
  top: 0;
  height: 100%;
  width: 100%;
  padding: 60px 20px 60px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
