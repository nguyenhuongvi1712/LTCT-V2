<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader> Chart </CCardHeader>
        <CCardBody>
          <ChartBarAd :labels="label" :data="chartData" v-if="loaded" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow style="margin-top: 10px">
    <CCol :md="6" class="mb-4" v-for="ad in adList" :key="ad.id">
      <CCard>
        <CCardImage orientation="top" :src="ad.imageUrl" />
        <CCardBody>
          <CCardTitle> {{ ad.title }} </CCardTitle>
          <CCardText>{{ ad.content }}</CCardText>
          <CButton>
            <a :href="ad.advertismentUrl" target="_blank">Go to</a>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ChartBarAd from './ChartBar.vue'
import { getAdvertisment } from '../../../api/advertisment/index'
export default {
  name: 'Advertisment',
  components: {
    ChartBarAd,
  },
  data() {
    return {
      chartData: [],
      label: [],
      loaded: false,
      adList: [],
    }
  },
  async created() {
    this.loaded = false
    try {
      const res = (await getAdvertisment()).data
      this.adList = res
      this.chartData = Object.values(
        res.map((ad) => {
          return ad.accessNumber
        }),
      )
      this.label = Object.values(
        res.map((ad) => {
          return ad.title
        }),
      )
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
}
</script>
