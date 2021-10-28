<template>
  <div class="countdowns">
    <div class="countdowns-container">
      <transition-group name="fade" v-show="activeEvents.length > 0">
        <CountdownItem
          v-for="(event, index) in activeEvents"
          :key="index"
          :event="event"
        >
        </CountdownItem>
      </transition-group>
    </div>
  </div>
</template>

<script>
import CountdownItem from '../components/CountdownItem'

export default {
  components: { CountdownItem },
  computed: {
    activeEvents () {
      return this.$store.getters.getActiveEvents()
    }
  }
}
</script>
<style scoped>
.countdowns-container {
  user-select: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
