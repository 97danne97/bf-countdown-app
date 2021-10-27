<template>
  <div class="requirements">
    <RequirementsCard v-for="(requirements, index) in requirementTypes" :key="index" :requirements="requirements"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RequirementsCard from '@/components/RequirementsCard.vue'

export default {
  name: 'Requirements',
  components: {
    RequirementsCard
  },
  data () {
    return {
      requirementTypes:
      [
        {
          type: 'Minimum',
          requirements: {
            OS: '64-bit Windows 10',
            'Processor (AMD)': 'AMD Ryzen 5 3600',
            'Processor (Intel)': 'Core i5 6600K',
            Memory: '8GB',
            'Video Memory': '4GB',
            'Graphics card (NVIDIA)': 'Nvidia GeForce GTX 1050 Ti',
            'Graphics card (AMD)': 'AMD Radeon RX 560',
            DirectX: '12',
            'Online Connection Requirements': '512 KBPS or faster Internet connection',
            'Hard-drive space': '100GB'
          }
        },
        {
          type: 'Recommended',
          requirements: {
            OS: '64-bit Windows 10',
            'Processor (AMD)': 'AMD Ryzen 7 2700X',
            'Processor (Intel)': 'Intel Core i7 4790',
            Memory: '16GB',
            'Video Memory': '8GB',
            'Graphics card (NVIDIA)': 'Nvidia GeForce RTX 3060',
            'Graphics card (AMD)': 'AMD Radeon RX 6600 XT',
            DirectX: '12',
            'Online Connection Requirements': '512 KBPS or faster Internet connection',
            'Hard-drive space': '100GB SSD'
          }
        }
      ]
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
