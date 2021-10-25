<template>
  <div class="requirements-card">
    <h2>{{requirements.type}}</h2>
    <ul>
      <li v-for="(val, key, index) in requirements.requirements" :key="key" :style="'animation-delay:'+ index/50+'s'">
        <b>{{ key }}: </b><span>{{ val }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RequirementsCard',
  props: ['requirements']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.requirements-card > ul {
  font-family: Purista;
}

.requirements-card > ul > li {
  font-size: 18px;
  color: #26FFD6;
  font-family: EABFFont;
  margin: 12px 0;
}
.requirements-card > ul > li > * {
  color: white;
}
</style>
