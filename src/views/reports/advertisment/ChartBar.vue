<template>
  <CChartBar :data="defaultData" />
</template>
<script>
import { CChartBar } from '@coreui/vue-chartjs'
export default {
  name: 'ChartBarAd',
  components: { CChartBar },
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    defaultData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Numbers of Advertising access',
            backgroundColor: '#f87979',
            data: this.data,
          },
        ],
      }
    },
  },
}
</script>
