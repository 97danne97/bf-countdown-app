<template>
  <div class="countdowns">
      <transition-group name="list-complete" v-show="activeEvents.length + passedEvents.length > 0" class="countdowns-container" tag="div">
        <CountdownItem v-for="(event, index) in activeEvents" :key="index" :event="event"></CountdownItem>
        <CountdownItem v-for="(event, index) in passedEvents" :key="index" :event="event"></CountdownItem>
      </transition-group>
  </div>
</template>

<script>
import CountdownItem from '../components/CountdownItem'

export default {
  components: { CountdownItem },
  computed: {
    activeEvents () { return this.$store.getters.getEvents('upcoming') },
    passedEvents () { return this.$store.getters.getEvents('passed') }
  }
}
</script>
<style scoped>
.countdowns-container {
  position: relative;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  align-content: flex-start;
  gap: 20px;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
