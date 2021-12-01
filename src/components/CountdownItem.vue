<template>
  <transition name="fade">
    <div @click="$router.push(`/countdowns/${event.id}`)" class="event" v-if="event.times">
      <h1>{{event.name}}</h1>
      <div v-if="event.distance > 0" class="countdown">
        <span v-for="(time, index) in event.times" :key="index">
          <span class="countdown-time-unit">
            {{time}}
            <span class="countdown-time-unit-separator" v-if="index + 1 < event.times.length"> : </span>
          </span>
        </span>
      </div>
      <div v-else class="countdown">
        <span>LAUNCHED</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style scoped>

.event {
  cursor: pointer;
  padding: 0 20px;
  border: 2px solid transparent;
  text-align: center;
  transition: .2s ease;
}

.event:hover {
  background-color: #26FFD6;
  color: #011c26;
}

.event h1 {
  font-size: 22px;
}

.event .countdown {
  margin: 0 0 20px 0;
  font-size: 32px;
}

@media all and (max-width: 319px) {
.event {
  width: 100%;
}
.event .countdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.countdown-time-unit-separator {
  display: none;
}
}
</style>
