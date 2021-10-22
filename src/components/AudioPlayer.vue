<template>
  <audio @ended="nextTrack()">
    <source type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: ['mood', 'isActive'],
  data () {
    return {
      audio: {
        player: null,
        currentBPM: null,
        collection: {
          calm: [
            { name: 'calm0', bpm: 75 },
            { name: 'calm1', bpm: 50 },
            { name: 'calm2', bpm: 110 }
          ],
          hype: [
            { name: 'hype0', bpm: 70 },
            { name: 'hype1', bpm: 95 },
            { name: 'hype2', bpm: 60 },
            { name: 'hype3', bpm: 85 }
          ],
          launch: [
            { name: 'launch0', bpm: 86 }
          ],
          released: [
            { name: 'released1', bpm: 60 }
          ]
        }
      }
    }
  },
  computed: {
    savedMood () {
      return this.$props.mood
    }
  },
  methods: {
    nextTrack () {
      const index = Math.floor(Math.random() * this.audio.collection[this.savedMood].length)
      this.audio.player.pause()
      this.audio.player.src = require(`@/assets/sound/${this.savedMood}/${this.savedMood}${index}.mp3`)
      this.audio.player.load()
      this.audio.player.play()
      this.audio.currentBPM = this.audio.collection[this.savedMood][index].bpm
    }
  },
  watch: {
    isActive () {
      if (this.isActive) {
        this.audio.player.play()
      } else {
        this.audio.player.pause()
      }
    },
    savedMood () {
      console.log('changed mood')
      this.nextTrack()
    }
  },
  mounted () {
    this.audio.player = document.getElementById('bgMusic')
    this.audio.player.volume = 0.5
    this.nextTrack()
    this.$emit('loaded')
  }
}
</script>

<style>

</style>
