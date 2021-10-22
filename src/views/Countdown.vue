<template>
  <div id="countdown">
    <div id="countdown-container">
      <div id="countdown-nav">
        <router-link tag="div" id="countdown-close" to="/countdowns"><i class="bi-arrow-left"></i></router-link>
        <div id="countdown-title">
          <transition name="fade">
            <span v-if="audioLoaded">{{countdown.name}}</span>
          </transition>
        </div>
      </div>
      <transition name="slide-left">
      <div v-if="audioLoaded" id="countdown-card" :style="`animation-name: ${this.countdownAnimation};`">
        <span v-for="(time, index) in countdown.times" :key="index">{{time}}
          <span v-show="index + 1 < countdown.times.length"> : </span>
        </span>
      </div>
      </transition>
    </div>
    <div id="player-container">
 <!-- <AudioPlayer id="bgMusic" ref="audioplayer" @loaded="this.audioLoaded = true" :isActive="this.isActive" :mood="this.countdown.mood"></AudioPlayer> -->
      <YoutubePlayer v-show="false" @loaded="this.audioLoaded = true" :countdown="this.countdown">
      </YoutubePlayer>
    </div>
  </div>
</template>

<script>
import YoutubePlayer from '@/components/YoutubePlayer'
import AudioPlayer from '@/components/AudioPlayer'
export default {
  components: { AudioPlayer, YoutubePlayer },
  data () {
    return {
      audioLoaded: false
    }
  },
  computed: {
    countdownAnimation () {
      let animation = ''
      switch (this.countdown.mood) {
        case 'launch':
          animation = 'shake-medium'
          break
        case 'hype':
          animation = 'shake-light'
          break
        case 'calm':
          animation = 'shake-heavy'
          break
        default:
          animation = 'shake-heavy'
      }
      return animation
    },
    countdown () {
      return this.$store.getters.getEventById(this.$route.params.id)
    }
  },
  created () {
    console.log(this.$store.getters.getEventById(this.$route.params.id))
  }
}
</script>

<style scoped>
#countdown {
  background-color: rgba(0, 0, 0, 0.596);
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
}

#countdown > #player-container{
  position: absolute;
  height: 0;
}

#countdown-nav {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  min-height: 60px;
  align-items: center;
}

#countdown-title {
  text-align: center;
  margin: 0 auto 0 auto;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
}

#countdown-close {
  position: absolute;
  left: 0;
  height: 60px;
  text-align: center;
  width: 60px;
  line-height: 55px;
  font-size: 30px;
  cursor: pointer;
  overflow: hidden;
  color: white;
  transition: color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
#countdown-close:hover {
  color: #011C26;
}

#countdown-close::before {
  content: '';
  position: absolute;
  background-color: #26FFD6;
  width: 100%;
  height: 100%;
  left: 0; bottom: 0;
  z-index: -1;
  transform: scale(0.9);
  opacity: 0;
  transition: transform .12s ease-out, opacity .12s ease-out;
}

#countdown-close:hover::before {
  transform: none;
  opacity: 1;
}

#countdown #countdown-card {
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-iteration-count: infinite;
}

#countdown-card span {
  font-size: 11vw;
  text-shadow: 0 0 5px #26FFD6;
  color: #26FFD6;
}

@media all and (max-width: 320px) {
  #countdown-title {
    text-align: right;
    margin-right: 10px;
  }
}
</style>
