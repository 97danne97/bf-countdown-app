<template>
  <audio @ended="nextTrack()" id="bgMusic">
    <source type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: ['countdown'],
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
      return this.$props.countdown.mood
    }
  },
  methods: {
    nextTrack () {
      let index = Math.floor(Math.random() * this.audio.collection[this.savedMood].length)
      if (this.audio.player.src === '')
        this.audio.player.src = require(`@/assets/sound/${this.savedMood}/${this.savedMood}${index}.mp3`)
      else {
        this.audio.player.pause()
        while (this.audio.player.src === require(`@/assets/sound/${this.savedMood}/${this.savedMood}${index}.mp3`)) {
          index = Math.floor(Math.random() * this.audio.collection[this.savedMood].length)
          this.audio.player.src = require(`@/assets/sound/${this.savedMood}/${this.savedMood}${index}.mp3`)
          console.log('Randomized soundtrack same as previous. Finding new...')
        }
      }
      this.audio.player.load()
      this.audio.player.play()
      this.audio.currentBPM = this.audio.collection[this.savedMood][index].bpm
    }
  },
  watch: {
    savedMood () {
      console.log('changed mood')
      this.nextTrack()
    }
  },
  mounted () {
    this.audio.player = document.getElementById('bgMusic')
    this.audio.player.volume = 0.5
    this.$emit('loaded')
  }
}
</script>
