<template>
    <div class="credits">
      <div class="credits-container">
        <section class="credits-section" v-for="(credit, key) in credits" :key="key">
          <h1>{{key.toUpperCase()}}</h1>
          <hr>
          <div class="credit-box" v-for="(artist, index) in credit" :key="index">
            <h2>{{artist.name}}</h2>
            <ul>
              <li v-for="(song, index) in artist.songs" :key=index>
                <a target="_blank" :href="`https://www.youtube.com/watch?v=${song.youtubeID}`">{{song.title}}</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      credits: {
        artists: [
          {
            name: 'Afroh Music',
            songs: [
              { title: '"The Non-Patriated" Theme (Extended)', youtubeID: 'v1qF1nruSuQ' },
              { title: 'Portal Theme OST', youtubeID: '8HNDCX_DM9Q' },
              { title: 'Kaleidoscope Theme (Golmud Railway Theme 2042 Remix)', youtubeID: '-rrA5_6YZDg' },
              { title: 'Hourglass Theme OST', youtubeID: '-NPJrfwBB_Og' },
              { title: 'Battlefield 2042 Solomon\'s Theme Remix', youtubeID: 'sSbWOEa9Ogs' },
              { title: 'Orbital Theme OST', youtubeID: 'naV3k0j2lhI' },
              { title: 'Battlefield 2042 Main Theme OST', youtubeID: 'CIy3qJsOG5c' },
              { title: 'Battlefield 2042 Main Theme Full OST', youtubeID: 'IbpZJvnM5RM' }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a {
  color: #ffffff;
  transition: text-shadow .2s, color .2s;
  text-decoration: none;
}
a:hover {
  color: #26ffdf;
  text-shadow: 0 0 7px #26ffdec5;
}
.credits {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.credits-container {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.credit-section {
  display: flex;
  gap: 20px;
}

.credit-box {
  padding: 10px 0;
}

.credit-box ul > li {
  font-family: EABFFont;
  margin: 8px 0;
  list-style-type: '>  ';
  color: #26ffdf;
}
</style>
