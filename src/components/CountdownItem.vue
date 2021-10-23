<template>
  <transition name="fade" v-if="event.times">
    <div @click="$router.push(`/countdowns/${event.id}`)" class="event">
      <h1>{{event.name}}</h1>
      <div class="countdown">
        <span v-for="(time, index) in event.times" :key="index">
          <span class="countdown-time-unit">
            {{time}}
            <span class="countdown-time-unit-separator" v-if="index + 1 < event.times.length"> : </span>
          </span>
        </span>
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
  opacity: 0;
  border: 2px solid transparent;
  text-align: center;
  animation: forwards .5s fade-slide-in cubic-bezier(0.165, 0.84, 0.44, 1);
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

@media all and (max-width: 320px) {
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
