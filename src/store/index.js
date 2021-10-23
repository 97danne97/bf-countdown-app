import { createStore } from 'vuex'
import soundtracks from '@/json/soundtracks.json'

export default createStore({
  state: {
    soundtracks: soundtracks,
    events: []
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
