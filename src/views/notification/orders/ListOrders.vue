<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>New Orders</CCardHeader>
          <CCardBody>Test</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { getOrder } from '../../../api/orders'
export default {
  data() {
    return {
      newOrder: [],
    }
  },
  async created() {
    const res = await getOrder()
    console.log('res', res)
  },
}
</script>
