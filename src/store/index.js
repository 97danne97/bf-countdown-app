import { createStore } from 'vuex'
import events from '@/json/events.json'
import soundtracks from '@/json/soundtracks.json'

export default createStore({
  state: {
    soundtracks: soundtracks,
    events: events
  },
  getters: {
    getSoundTrackByMood: (state) => (mood) => {
      return state.soundtracks.filter(soundtrack => soundtrack.mood === mood)
    },
    getSoundtracks: (state) => (type) => {
      if (type === 'official')
        return state.soundtracks.filter(soundtrack => soundtrack.official === true)
      else if (type === 'fanmade')
        return state.soundtracks.filter(soundtrack => soundtrack.official === false)
      else
        return state.soundtracks
    },
    getOST: (state) => () => {
      return state.soundtracks.filter(soundtrack => soundtrack.official === true)
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
