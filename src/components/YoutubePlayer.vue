<template>
  <iframe id="ytplayer"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&controls=1&autoplay=1&loop=1&color=white"
  frameborder="0"
></iframe>
</template>

<script>
export default {
  props: ['countdown'],
  name: 'YoutubePlayer',
  data () {
    return {
      player: null,
      loaded: false,
      currentBPM: 1
    }
  },
  computed: {
    savedMood () { return this.countdown.mood },
    soundtracks () { return this.$store.getters.getSoundtracks() }
  },
  methods: {
    nextTrack () {
      let index = this.generateRandomIndex(this.soundtracks.length)
      while (this.player.playerInfo.videoData.video_id === this.soundtracks[index].youtubeId) {
        index = this.generateRandomIndex(this.soundtracks.length)
        console.log('Randomized soundtrack same as previous. Finding new...')
      }
      this.player.loadVideoById(this.soundtracks[index].youtubeId)
      this.player.playVideo()
      console.log(`Playing: ${this.soundtracks[index].youtubeId}`)
      this.currentBPM = this.soundtracks[index].bpm
    },
    generateRandomIndex (listSize) {
      return Math.floor(Math.random() * listSize)
    },
    createYouTubeIframe () {
      var tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.id = 'ytscript'
      var firstScriptTag = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => {
        console.log('onYouTubeIframeAPIReady')
        this.initYoutube()
      }
    },
    initYoutube () {
      const _ = this
      console.log('initYoutube')
      // eslint-disable-next-line no-undef
      this.player = new YT.Player('ytplayer', {
        playerVars: { },
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange
        }
      })
    },
    onPlayerReady (evt) {
      console.log('Player ready')
      this.nextTrack()
      this.loaded = true
      this.$emit('loaded')
    },
    onPlayerStateChange (evt) {
      console.log('Player state changed', evt)
      if (evt.data === 0)
        this.nextTrack()
    },
    playerDestroy () {
      if (document.getElementById('ytscript'))
        document.getElementById('ytscript').remove()
      if (document.getElementById('www-widgetapi-script'))
        document.getElementById('www-widgetapi-script').remove()
      this.player.destroy()
      document.querySelector('html').dispatchEvent(new CustomEvent('YouTubeIframeAPIReady'))
      window.YT = undefined
      window.YTConfig = undefined
      window.onYouTubeIframeAPIReady = undefined
      console.log('destroyed player')
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
  beforeUnmount () {
    this.playerDestroy()
  },
  created () {
    console.log('created')
    this.createYouTubeIframe()
  }
}
</script>
