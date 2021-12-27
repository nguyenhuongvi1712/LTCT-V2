<template>
  <div>
    <CChartBar :data="defaultData" style="height: 560px" />
  </div>
</template>
<script>
import { CChartBar } from '@coreui/vue-chartjs'
export default {
  name: 'ChartBarPro',
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
            label: 'Number of uses',
            backgroundColor: '#f87979',
            data: this.data,
          },
        ],
      }
    },
  },
}
</script>
