<template>
  <div class="requirements">
    <RequirementsCard v-for="(requirements, index) in requirementTypes" :key="index" :requirements="requirements"/>
  </div>
</template>

<script>
import RequirementsCard from '@/components/RequirementsCard.vue'
import requirements from '@/json/requirements.json'

export default {
  name: 'Requirements',
  components: {
    RequirementsCard
  },
  data () {
    return {
      requirementTypes: requirements
    }
  }
}
</script>

<style scoped>
  .requirements{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    align-items: center;
  }
</style>
