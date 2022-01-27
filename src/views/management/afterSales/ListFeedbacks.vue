<template>
  <div>
    <h2 class="text-center mb-4">List Feedbacks</h2>
    <CCard class="mb-4">
      <CCardHeader>
        <strong>Vue Widgets</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol :xs="4" v-for="feedback in feedbacks" :key="feedback.id">
            <CWidgetStatsF
              :color="
                feedback.id % 3 === 0
                  ? 'primary'
                  : feedback.id % 3 === 1
                  ? 'infor'
                  : 'warning'
              "
              :title="feedback.content"
              :value="feedback.user_id"
            >
              <template #icon>
                <CIcon icon="cil-user" size="xl" />
              </template>
            </CWidgetStatsF>
          </CCol>
          <!-- <CCol :xs="4">
            <CWidgetStatsF color="info" title="Title" value="$1.999,50">
              <template #icon>
                <CIcon icon="cil-user" size="xl" />
              </template>
            </CWidgetStatsF>
          </CCol>
          <CCol :xs="4">
            <CWidgetStatsF color="warning" title="Title" value="$1.999,50">
              <template #icon>
                <CIcon icon="cil-user" size="xl" />
              </template>
            </CWidgetStatsF>
          </CCol> -->
        </CRow>
      </CCardBody>
      <CCardFooter style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="feedbacks.length"
        >
        </el-pagination>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { getListFeedbacks } from '@/api/afterSales'
export default {
  data() {
    return {
      feedbacks: [],
    }
  },
  async created() {
    this.feedbacks = await getListFeedbacks()
    console.log('feedbackssss', this.feedbacks)
  },
}
</script>
