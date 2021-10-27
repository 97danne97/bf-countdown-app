<template>
    <div class="credits">
      <section class="credits-section">
        <h1 class="jumbotron">Credits</h1>
        <h2>Soundtracks</h2>
        <hr>
        <div class="credits-box">
          <a class="credit card"
            v-for="(soundtrack, index) in this.$store.getters.getSoundtracks()"
            :key="index"
            target="_blank"
            :href="`https://www.youtube.com/watch?v=${soundtrack.youtubeId}`">
            <span class="chip" v-if="soundtrack.official">Official</span>
            <span class="chip" v-else>Fanmade</span>
            <div class="title-item">
              <span>
                {{soundtrack.title}}
              </span>
            </div>
            <div class="artist-container">
              <span class="artist-item" v-for="(artist, index) in soundtrack.artists" :key="index">{{artist}}</span>
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
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
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

.artist-item:not(:last-of-type)::after {
  content: ', ';
}

.credit:hover .chip {
  color: #26ffdf;
  background-color: #011c26;
}

.artist-item {
  margin-top: 5px;
}
</style>
