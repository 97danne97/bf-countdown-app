<template>
  <div class="countdowns">
    <CountdownItem
      v-for="(event, index) in events"
      :key="index"
      :style="`animation-delay:${index/30}s`"
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
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-content: flex-start;
}
</style>
