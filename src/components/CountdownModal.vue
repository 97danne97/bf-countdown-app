<template>
  <div id="countdown-modal">
    <div id="countdown-container">
      <div id="countdown-modal-nav">
        <div id="countdown-close" @click="$emit('close');"><i class="bi-x"></i></div>
        <div id="countdown-modal-title"><img src="../assets/images/bf-2042-teal-nav-logo.svg"><span>{{countdown.name}}</span></div>
      </div>
      <div v-if="audioLoaded" id="countdown-card" :style="`animation-duration: ${60/this.$refs.ytplayer.$data.currentBPM}s; animation-name: ${this.countdownAnimation};`">
        <span v-for="(time, index) in countdown.times" :key="index">{{time}}
          <span v-show="index + 1 < countdown.times.length"> : </span>
        </span>
      </div>
    </div>
    <div id="player-container">
 <!-- <AudioPlayer id="bgMusic" ref="audioplayer" @loaded="this.audioLoaded = true" :isActive="this.isActive" :mood="this.countdown.mood"></AudioPlayer> -->
      <YoutubePlayer v-show="true" @loaded="this.audioLoaded = true" ref="ytplayer" :countdown="this.countdown" :isActive="this.isActive">
      </YoutubePlayer>
    </div>
  </div>
</template>

<script>
import YoutubePlayer from '@/components/YoutubePlayer'
import AudioPlayer from '@/components/AudioPlayer'
export default {
  components: { AudioPlayer, YoutubePlayer },
  props: ['countdown', 'isActive'],
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
    }
  }
}
</script>

<style scoped>
#countdown-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.596);
  backdrop-filter: blur(25px);
  animation: forwards .2s fade-out cubic-bezier(0.765, 0.84, 0.44, 1);
  user-select: none;
}
#countdown-modal.active {
  animation: forwards .4s fade-in cubic-bezier(0.075, 0.82, 0.165, 1);
}

#countdown-modal > div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

#countdown-modal > #player-container{
  position: absolute;
  z-index: -1;
}

#countdown-modal > #countdown-container {
  z-index: 1;
  /* backdrop-filter: blur(20px) brightness(.4); */
}

#countdown-modal-nav {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  min-height: 60px;
}

#countdown-modal-title {
  text-align: center;
  margin: 10px auto 0 auto;
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
  color: rgb(129, 129, 129);
  transition: color .3s cubic-bezier(0.075, 0.82, 0.165, 1), background-color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
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

#countdown-modal.active #countdown-card {
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-iteration-count: infinite;
}

#countdown-card span {
  font-size: 11vw;
  text-shadow: 0 0 5px #26FFD6;
  color: #26FFD6;
}

@media all and (max-width: 320px) {
  #countdown-modal-title {
    text-align: right;
    margin-right: 10px;
  }
}
</style>
