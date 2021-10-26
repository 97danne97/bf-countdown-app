<template>
    <div class="credits">
      <section class="credits-section">
        <h1 class="jumbotron">Credits</h1>
        <h2>Soundtracks</h2>
        <hr>
        <div class="credits-box">
          <a class="credit"
            v-for="(soundtrack, index) in this.$store.getters.getSoundtracks()"
            :key="index"
            target="_blank"
            :href="`https://www.youtube.com/watch?v=${soundtrack.youtubeId}`">
            <div class="left">
              <div class="title-item">{{soundtrack.title}}
                <!-- <span class="chip" v-if="soundtrack.official"> OST</span> -->
              </div>
              <div class="artist-item" v-for="(artist, index) in soundtrack.artists" :key="index">{{artist}}</div>
            </div>
            <div class="right">
              <i class="yt-icon bi-youtube"></i>
            </div>
          </a>
        </div>
      </section>
    </div>
</template>

<script>
export default { data () { return {} } }
</script>

<style scoped>
.credits {
  width: 100%;
}

.credits-section {
  margin: 0 auto;
  max-width: 900px;
}

.credits-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.credit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-family: EABFFont;
  color: white;
  transition: background-color .2s ease, color .2s ease;
}

.credit:hover {
  color: #011c26;
  background-color: #26ffdf;
}

.title-item {
  font-size: 20px;
  display: flex;
  align-items: center;
}

.artist-item {
  margin-top: 5px;
}

.left {
  flex-grow: 1;
}

.yt-icon {
  padding-left: 5px;
  font-size: 25px;
  position: relative;
}
</style>
