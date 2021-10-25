<template>
  <div id="countdown" class="bg-dark">
    <div id="countdown-nav">
      <router-link tag="div" class="countdown-btn" to="/countdowns"><i class="bi-arrow-left"></i></router-link>
      <transition name="slide-left">
        <div class="countdown-btn" @click="showPlayer = !showPlayer" v-show="audioLoaded">
          <transition name="fade">
            <i v-if="showPlayer" class="bi-x"></i>
            <i v-else class="bi-youtube"></i>
          </transition>
        </div>
      </transition>
    </div>
    <div id="countdown-container">
      <div id="countdown-card" :style="`animation-name: ${this.countdownAnimation};`">
        <transition name="slide-down">
          <div id="countdown-title" v-if="countdown.times">{{countdown.name}}</div>
        </transition>
        <transition name="slide-up">
          <div id="countdown-text" v-if="countdown.times">
            <span v-for="(time, index) in countdown.times" :key="index">{{time}}
              <span v-if="index + 1 < countdown.times.length"> : </span>
            </span>
          </div>
        </transition>
      </div>
    </div>
    <div id="player-container">
      <!-- <AudioPlayer id="bgMusic" ref="audioplayer" @loaded="this.audioLoaded = true" :isActive="this.isActive" :mood="this.countdown.mood"></AudioPlayer> -->
      <transition :name="showPlayer ? 'slide-up' : 'slide-down'">
        <div id="ytplayer-container" v-show="showPlayer&&audioLoaded">
          <YoutubePlayer id="ytplayer" @loaded="this.audioLoaded = true" ref="ytplayer" :countdown="this.countdown">
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
    countdown () { return this.$store.getters.getEventById(this.$route.params.id) }
  }
}
</script>

<style scoped>
#countdown {
  user-select: none;
  display: flex;
  flex-flow: column;
  justify-content: center;
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

.countdown-btn {
  height: 60px;
  text-align: center;
  width: 60px;
  line-height: 55px;
  font-size: 25px;
  cursor: pointer;
  color: rgb(161, 161, 161);
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

#countdown-title {
  font-size: 20px;
  text-align: center;
}

#countdown-text {
  font-size: 12vw;
  text-shadow: 0 0 5px #26FFD6;
  color: #26FFD6;
}

#player-container{
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 144px;
  bottom: 20px;left: 0;
  overflow: hidden;
}

#ytplayer-container {
  position: absolute;
  bottom: 0;
  height: 144px; width: 250px;
  max-width: 100%;
}

#ytplayer {
  height: 100%;
  width: 100%;
}
</style>
