<template>
  <div id="countdown">
    <div id="countdown-nav">
        <router-link tag="div" class="countdown-btn" to="/countdowns"><i class="bi-arrow-left"></i></router-link>
        <div id="countdown-title">
          <transition name="slide-left">
            <span v-if="audioLoaded">{{countdown.name}}</span>
          </transition>
        </div>
      </div>
    <div id="countdown-container">
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
      <div class="countdown-btn" v-if="showPlayer" @click="showPlayer = !showPlayer">
        <i v-show="showPlayer" class="bi-x"></i>
      </div>
      <transition name="fade">
        <div id="ytplayer-container" v-show="false" :class="{visible: showPlayer&&audioLoaded}">
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
  position: absolute;
  width: 100%;
}

#countdown-nav {
  display: flex;
  position: absolute;
  top: 0;
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
  position: absolute;
}

#countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#countdown-card {
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
  justify-content: right;
  align-items: center;
  width: 100%;
  bottom: 0;
  overflow: hidden;
  padding: 0 15px 15px;
}

#ytplayer-container {
  position: relative;
  transition: .3s cubic-bezier(0.375, 0.82, 0.165, 1);
  height: 60px;width: 60px;
  transform-origin: bottom right;
  margin: 0 15px;
  border-radius: 50%;
  overflow: hidden;
}

#ytplayer-container.visible {
  border-radius: 0px;
  height: 144px; width: 250px;
  transition: .3s cubic-bezier(0.375, 0.82, 0.165, 1);
}

#ytplayer-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.11);
}

#ytplayer-container.visible::before {
  transform: scale(0);
}

#ytplayer {
  height: 100%;
  width: 100%;
}
</style>
