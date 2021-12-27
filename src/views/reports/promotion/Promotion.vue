<template>
  <CRow>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader> Chart </CCardHeader>
        <CCardBody>
          <chart-doughnut-promotion
            :labels="labelDnChart"
            :data="dnChartData"
            :backgroundColor="backgroundColor"
            v-if="loaded"
          />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader> Bar Chart </CCardHeader>
        <CCardBody>
          <chart-bar-pro
            :labels="labelBarChart"
            :data="barChartData"
            v-if="loaded"
          />
          <div class="block">
            <span class="demonstration" style="margin-right: 10px"
              >With quick options</span
            >
            <el-date-picker
              v-model="value2"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            >
            </el-date-picker>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ChartDoughnutPromotion from './ChartDoughnutPromotion.vue'
import ChartBarPro from './CharBarPromotion.vue'
import { getPromotion } from '../../../api/promotion/index'
import faker from 'faker'

import { sumSimpleArray, unique } from '../../../utils'

export default {
  name: 'Advertisment',
  components: {
    ChartDoughnutPromotion,
    ChartBarPro,
  },
  data() {
    return {
      dnChartData: [],
      labelDnChart: [],
      loaded: false,
      promotionList: [],
      backgroundColor: [],
      value2: '',
      datePicker: {
        startDate: null,
        endDate: null,
      },
      barChartData: [],
      labelBarChart: [],
    }
  },
  watch: {
    value2: function (val) {
      if (val.length == 2) {
        this.datePicker.startDate = new Date(val[0])
        this.datePicker.endDate = new Date(val[1])
      }
    },
  },

  async created() {
    this.loaded = false
    try {
      const res = await getPromotion()
      this.promotionList = res
      this.labelBarChart = res.map((item) => {
        return item.type
      })
      this.barChartData = res.map((item) => {
        return item.numOfUses
      })
      const typeOfPromotion = unique(
        res.map((item) => {
          return item.type
        }),
      )
      typeOfPromotion.forEach((element) => {
        const val = res
          .filter((e) => {
            return e.type == element
          })
          .map((e) => {
            return e.numOfUses
          })
        const sum = sumSimpleArray(val)
        this.dnChartData.push(sum)
        this.backgroundColor.push(faker.internet.color())
      })
      this.labelDnChart = typeOfPromotion
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
}
</script>
