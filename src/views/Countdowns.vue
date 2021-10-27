<template>
  <div class="countdowns">
    <CountdownItem
      v-for="(event, index) in events"
      :key="index"
      :event="event"
    >
    </CountdownItem>
  </div>
</template>

<script>
import CountdownItem from '../components/CountdownItem'

export default {
  components: { CountdownItem },
  data () {
    return {
      events: this.$store.state.events
    }
  }
}
</script>
<style scoped>
.countdowns {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-content: center;
}
</style>
