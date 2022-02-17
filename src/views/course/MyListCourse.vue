<template>
  <h1 class="text-center">Danh sách các khóa học</h1>
  <CCard class="mb-4" v-loading="loading">
    <CCardBody>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol xs v-for="course in courses" :key="course.id">
          <CCard>
            <CCardImage orientation="top" :src="course.media.image.raw" />
            <CCardBody>
              <CCardTitle>{{ course.name }}</CCardTitle>
              <CCardText>
                {{ course.short_description }}
              </CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>Tổ chức : {{ course.org }}</CListGroupItem>
              <CListGroupItem>Mã:{{ course.number }}</CListGroupItem>
            </CListGroup>
            <CCardFooter>
              <small class="text-medium-emphasis"
                >Last updated 3 mins ago</small
              >
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import { getListCourse } from '../../api/course/index'
export default {
  data() {
    return {
      loading: false,
      listCourse: [],
      search: '',
    }
  },
  async created() {
    this.loading = true
    const res = await getListCourse()
    this.listCourse = res.results
    this.loading = false
    console.log('list', this.listCourse)
  },
  computed: {
    courses() {
      return this.listCourse.filter(
        (e) =>
          !this.search ||
          e.name.toLowerCase().includes(this.search.toLowerCase()) ||
          e.org.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
}
</script>
