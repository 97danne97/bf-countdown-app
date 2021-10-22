<template>
  <iframe id="player"
      src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
      frameborder="0"
></iframe>
</template>

<script>
import YouTube from 'vue3-youtube'

export default {
  props: ['countdown'],
  components: {
    YouTube
  },
  data () {
    return {
      loaded: false,
      player: null,
      currentBPM: 1,
      songList: [
        // Fan-made
        /* { id: 'v1qF1nruSuQ', bpm: 110 },
        { id: '8HNDCX_DM9Q', bpm: 85 },
        { id: '-rrA5_6YZDg', bpm: 70 },
        { id: 'NPJrfwBB_Og', bpm: 95 },
        { id: 'sSbWOEa9Ogs', bpm: 50 }, */
        // Official
        { id: 'FytcxmBT9Ls', bpm: 119 },
        { id: 'qGChJXejJtA', bpm: 75 },
        { id: 'iXix8oK33yc', bpm: 90 },
        { id: 'VWTJ5-hEPJM', bpm: 95 },
        { id: '-uEc8_dcYUc', bpm: 118 },
        { id: 'dgwNvhHJRrg', bpm: 114 },
        { id: 'WC1DLT1s_hw', bpm: 139 },
        { id: 'pN3BYTv5YLA', bpm: 127 }
      ]
    }
  },
  computed: {
    savedMood () {
      return this.countdown.mood
    }
  },
  methods: {
    nextTrack () {
      const index = Math.floor(Math.random() * this.songList.length)
      this.player.pauseVideo()
      this.player.loadVideoById(this.songList[index].id)
      this.player.playVideo()
      console.log(this.songList[index].id)
      this.currentBPM = this.songList[index].bpm
    },
    createYouTubeIframe () {
      var tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.id = 'ytscript'
      var firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => {
        console.log('onYouTubeIframeAPIReady')
        this.initYoutube()
        this.$store.state.youtubeiframeready = true
      }
    },
    initYoutube () {
      const _ = this
      console.log('initYoutube')
      this.player = new YT.Player('player', {
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange
        }
      })
    },
    onPlayerReady () {
      console.log('Player ready')
      this.loaded = true
      this.$emit('loaded')
      this.nextTrack()
    },
    onPlayerStateChange (evt) {
      console.log('Player state changed', evt)
      if (evt.data === 0) {
        this.nextTrack()
      }
    }
  },
  watch: {
    savedMood () {
      if (this.loaded) {
        console.log('changed mood')
        this.nextTrack()
      }
    }
  },
  created () {
    console.log('created')
    console.log(this.$store.state.youtubeiframeready)
    if (!this.$store.state.youtubeiframeready) {
      this.createYouTubeIframe()
    } else {
      this.nextTrack()
    }
  }
}
</script>

<style>
iframe{
  width: 100%;
  height: 100%;
}
</style>
