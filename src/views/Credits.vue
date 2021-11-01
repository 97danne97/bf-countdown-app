<template>
    <div class="credits">
      <section class="credits-section">
        <h1 class="jumbotron">Credits</h1>
        <!-- <p>
          The soundtracks are legally played through the embedded YouTube player, as stated by the
          <a href="https://www.youtube.com/static?template=terms" target="_blank">YouTube terms</a>:
        </p>
        <p><strong>License to Other Users</strong><br>
          <q>You also grant each other user of the Service a worldwide, non-exclusive, royalty-free license to access your Content through the Service, and to use that Content, including to reproduce, distribute, prepare derivative works, display, and perform it, only as enabled by a feature of the Service <b>(such as video playback or embeds)</b>.
            For clarity, this license does not grant any rights or permissions for a user to make use of your Content independent of the Service.
          </q>
        </p> -->
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
export default { }
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
  color: var(--darkest);
  background-color: var(--accent);
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
  color: var(--accent);
  background-color: var(--darkest);
}

.artist-item {
  margin-top: 5px;
}
</style>
