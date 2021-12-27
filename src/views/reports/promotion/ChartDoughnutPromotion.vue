<template>
  <CChartDoughnut :data="defaultData" />
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'
export default {
  name: 'ChartDoughnutPromotion',
  components: { CChartDoughnut },
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    defaultData() {
      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.backgroundColor,
            data: this.data,
          },
        ],
      }
    },
  },
}
</script>
