<template>
  <div id="countdown" class="bg-dark">
    <section id="countdown-nav">
      <router-link tag="div" class="countdown-btn" to="/countdowns"><i class="bi-arrow-left"></i></router-link>
      <transition name="slide-left">
        <div class="countdown-btn" @click="showPlayer = !showPlayer" v-show="audioLoaded">
          <transition name="fade">
            <i v-if="showPlayer" class="bi-x"></i>
            <i v-else class="bi-youtube"></i>
          </transition>
        </div>
      </transition>
    </section>
    <section id="countdown-container">
        <transition name="slide-down">
          <div id="countdown-title" v-if="countdown.times">{{countdown.name}}</div>
        </transition>
        <transition name="slide-up">
          <div id="countdown-text" v-if="countdown.times">
            <span class="glitch" :data-text="displayedTime">{{displayedTime}}</span>
          </div>
        </transition>
    </section>
    <section id="player-container">
      <transition :name="showPlayer ? 'slide-up' : 'slide-down'">
        <div id="ytplayer-container" v-show="showPlayer&&audioLoaded">
          <YoutubePlayer id="ytplayer" @loaded="audioLoaded = true" ref="ytplayer" :countdown="countdown">
          </YoutubePlayer>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import YoutubePlayer from '@/components/YoutubePlayer'
export default {
  components: { YoutubePlayer },
  name: 'Countdown',
  data () {
    return {
      showPlayer: false,
      audioLoaded: false
    }
  },
  computed: {
    displayedTime () { return `${this.countdown.times[0]} : ${this.countdown.times[1]} : ${this.countdown.times[2]} : ${this.countdown.times[3]}` },
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
  top: 60px;left: 0;
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
  color: gray;
  transition: color .2s ease;
}
.countdown-btn:hover {
  color: var(--accent);
}

#countdown-nav > .countdown-btn {
  position: relative;
}

#countdown-container {
  text-align: center;
}

#countdown-title {
  font-size: 20px;
}

#countdown-text {
  font-size: 12vw;
  text-shadow: 0 0 5px var(--accent);
  color: var(--accent);
}

#player-container{
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 144px;
  bottom: 20px;
  left: 0;
  overflow: hidden;
}

#ytplayer-container {
  position: absolute;
  bottom: 0;
  height: 144px;
  width: 250px;
  max-width: 100%;
}

#ytplayer {
  height: 100%;
  width: 100%;
}
</style>
