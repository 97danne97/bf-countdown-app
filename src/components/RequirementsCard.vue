<template>
  <table class="requirements-card">
    <tr>
      <thead>{{requirements.type}}</thead>
    </tr>
    <tr v-for="(val, key, index) in requirements.requirements" :key="key" :style="'animation-delay:'+ index/50+'s'">
      <td>{{ key }}</td><td>{{ val }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'RequirementsCard',
  props: ['requirements']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  max-width: 600px;
  font-family: Purista;
}

tr:not(:first-of-type) {
  display: flex;
  border-bottom: 1px solid #26FFD6;
  flex-wrap: wrap;
  opacity: 0;
  animation: fade-slide-in .3s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}
td{
  min-width: 200px;
  width: 50%;
  flex-grow: 1;
  padding: 8px 10px;
  font-size: 18px;
  flex-grow: 1;
}
</style>
