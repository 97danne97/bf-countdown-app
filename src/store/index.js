import { createStore } from 'vuex'

export default createStore({
  state: {
    soundtracks: [],
    events: [],
    youtubeiframeready: false
  },
  getters: {
    getSoundTrackByMood: (state) => (mood) => {
      return state.soundtracks.filter(soundtrack => soundtrack.mood === mood)
    },
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === parseInt(id))
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
