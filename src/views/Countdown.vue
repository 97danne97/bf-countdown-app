<template>
  <div id="countdown">
    <div id="countdown-nav">
        <router-link tag="div" class="countdown-btn" to="/countdowns"><i class="bi-arrow-left"></i></router-link>
        <div id="countdown-title">
          <transition name="slide-left">
            <span v-if="audioLoaded">{{countdown.name}}</span>
          </transition>
        </div>
        <div class="countdown-btn" @click="showPlayer = !showPlayer">
        <transition-group name="fade">
          <i v-if="showPlayer" class="bi-x"></i>
          <i v-else class="bi-music-note-beamed"></i>
        </transition-group>
      </div>
      </div>
    <div id="countdown-container">
      <transition name="slide-left">
      <div v-if="audioLoaded" id="countdown-card" :style="`animation-name: ${this.countdownAnimation};`">
        <span v-for="(time, index) in countdown.times" :key="index">{{time}}
          <transition name="fade">
          <span v-show="index + 1 < countdown.times.length"> : </span>
          </transition>
        </span>
      </div>
      </transition>
    </div>
    <div id="player-container">
 <!-- <AudioPlayer id="bgMusic" ref="audioplayer" @loaded="this.audioLoaded = true" :isActive="this.isActive" :mood="this.countdown.mood"></AudioPlayer> -->
      <transition name="fade">
        <div id="ytplayer-container" v-show="showPlayer&&audioLoaded">
          <YoutubePlayer id="ytplayer" @loaded="this.audioLoaded = true" :countdown="this.countdown">
          </YoutubePlayer>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import YoutubePlayer from '@/components/YoutubePlayer'
import AudioPlayer from '@/components/AudioPlayer'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { AudioPlayer, YoutubePlayer },
  name: 'Countdown',
  data () {
    return {
      showPlayer: false,
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
  flex-flow: column;
  justify-content: center;
  height: calc(100vh - 60px);
  overflow: hidden;
}

#countdown-nav {
  display: flex;
  position: absolute;
  top: 0;left: 0;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  align-items: center;
}

#countdown-title {
  margin: 0 auto;
  font-size: 24px;
  transform: translateY(-20px);
}

.countdown-btn {
  height: 60px;
  text-align: center;
  width: 60px;
  line-height: 55px;
  font-size: 25px;
  cursor: pointer;
  color: rgb(161, 161, 161);
  transition: color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.countdown-btn:hover {
  color: #26FFD6;
}

#countdown-nav > .countdown-btn {
  position: relative;
}

#countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#countdown-card {
  animation-direction: forwards;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-iteration-count: infinite;
}

#countdown-card span {
  font-size: 12vw;
  text-shadow: 0 0 5px #26FFD6;
  color: #26FFD6;
}

#player-container{
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  bottom: 20px;left: 0;
  overflow: hidden;
}

#ytplayer-container {
  position: relative;
  transform: none;
  transform-origin: bottom right;
  transition: .3s cubic-bezier(0.575, 0.82, 0.165, 1);
  height: 144px; width: 250px;
  max-width: 100%;
}

#ytplayer-container.visible {
  transform: none;
  opacity: 1;
}

#ytplayer {
  height: 100%;
  width: 100%;
}
</style>
