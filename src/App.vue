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
import events from '@/json/events.json'

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
    this.$store.state.events = events
    this.$store.state.events.forEach(event => {
      event.interval = setInterval(() => this.countDown(event), 1000)
    })
  }
}
</script>
<style>
::-webkit-scrollbar{
  display: block;
  width: 3px;
  height: 3px;
  background-color: #011c26;
}

::-webkit-scrollbar-thumb{
  background-color: #26ffdf;
}
@font-face {
  font-family: 'EABFFont';
  src: url('assets/fonts/EABFFont.woff2') format('woff2');
}
@font-face {
  font-family: 'BFModernista';
  src: url('assets/fonts/BF_Modernista-Bold.woff2') format('woff2');
}
@font-face {
  font-family: 'Purista';
  src: url('assets/fonts/Purista-Bold.woff2') format('woff2');
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
  padding: 0 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}

.fade-enter-from {
  opacity: 0;
  position: absolute;
}
.fade-leave-to {
  opacity: 0;
  position: absolute;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.375, 0.885, 0.12, 1.0);
}

.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
  position: absolute;
}

.slide-left-leave-to,
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-30px, 0);
  position: absolute;
}

/* Animations */

@keyframes fade-in{
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
@keyframes fade-out{
  0% {

  }
  100% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
  }
}
@keyframes grow-in {
  0% {
    transform: scale(.95);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-slide-in{
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes shake-heavy {
  0% { transform: translate(1px, 1px); }
  10% { transform: translate(-1px, -2px); }
  20% { transform: translate(-2px, 0px) rotate(1deg); }
  30% { transform: translate(2px, 2px) rotate(0deg);}
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) scale(1.02); filter: blur(2px);}
  60% { transform: translate(-2px, 1px); }
  70% { transform: translate(2px, 1px); }
  80% { transform: translate(-1px, -1px); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg) scale(1.02); }
}
@keyframes shake-medium {
  0% { transform: translate(1px, 1px); }
  10% { transform: translate(-1px, -2px); }
  20% { transform: translate(-2px, 0px)}
  30% { transform: translate(2px, 2px)}
  40% { transform: translate(1px, -1px)}
  50% { transform: translate(-1px, 2px); filter: blur(2px);}
  60% { transform: translate(-2px, 1px); }
  70% { transform: translate(2px, 1px); }
  80% { transform: translate(-1px, -1px); }
  90% { transform: translate(1px, 2px)}
  100% { transform: translate(1px, -2px)}
}
@keyframes shake-light {
  0% { transform: translate(1px, 1px); filter: blur(1px);}
  10% { transform: translate(-0px, -1px); }
  20% { transform: translate(-1px, 0px); filter: blur(1px);}
  30% { transform: translate(0px, 1px); }
  40% { transform: translate(1px, -1px)}
  50% { transform: translate(-1px, 0px);}
  60% { transform: translate(-1px, 1px); }
  70% { transform: translate(0px, 1px);  filter: blur(1px);}
  80% { transform: translate(-1px, -1px); }
  90% { transform: translate(1px, 0px)}
  100% { transform: translate(0px, -1px)}
}
</style>
