<template>
  <h1 class="text-center">Danh sách các khóa học</h1>
  <CCard class="mb-4">
    <el-input
      placeholder="Tìm kiếm khóa học theo tên hoặc tổ chức"
      v-model="search"
    >
      <i :v-slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </CCard>
  <CCard class="mb-4" v-loading="loading">
    <CCardBody v-show="courses.length === 0">
      <div class="text-center">Không có kết quả tìm kiếm</div>
    </CCardBody>
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
  <h2 class="text-center">Thống kê</h2>
  <CCard class="mb-4">
    <CCardBody>
      <CChartBar :data="defaultData" v-if="loaded" />
    </CCardBody>
  </CCard>
  <CCard class="mb-4">
    <CCardBody>
      <CChartDoughnut :data="defaultDataDn" v-if="loaded" />
    </CCardBody>
  </CCard>
</template>
<script>
import { getListCourse, getListCourseAmount } from '../../api/course/index'
import { CChartBar, CChartDoughnut } from '@coreui/vue-chartjs'
import { unique } from '../../utils/'
import faker from 'faker'

export default {
  data() {
    return {
      loading: false,
      listCourse: [],
      search: '',
      courseIds: [],
      dataChartMap: [],
      loaded: false,
      courseOrgs: [],
      dataChartDnMap: [],
    }
  },
  components: { CChartBar, CChartDoughnut },
  async created() {
    this.loading = true
    const res = await getListCourse()
    this.listCourse = res.results
    this.loading = false
    const res2 = (await getListCourseAmount()).results
    this.courseIds = this.listCourse.map((e) => {
      return e.course_id
    })
    this.courseIds = unique(this.courseIds)
    this.courseIds.forEach((e) => {
      const data = res2.filter((o) => o.course_id === e)
      const name = this.listCourse.find((o) => o.course_id === e)?.name
      this.dataChartMap.push({
        id: e,
        dataSet: data.length,
        label: name,
      })
    })
    this.defaultData.labels = this.dataChartMap.map((e) => {
      return e.label
    })
    this.defaultData.datasets[0].data = this.dataChartMap.map((e) => {
      return e.dataSet
    })
    this.courseOrgs = unique(
      this.listCourse.map((e) => {
        return e.org
      }),
    )
    this.courseOrgs.forEach((e) => {
      const listCourse = this.listCourse.filter((o) => o.org === e)
      this.dataChartDnMap.push({
        label: e,
        data: listCourse.length,
        bgColor: faker.internet.color(),
      })
    })
    this.defaultDataDn.labels = this.dataChartDnMap.map((e) => {
      return e.label
    })
    this.defaultDataDn.datasets[0].data = this.dataChartDnMap.map((e) => {
      return e.data
    })
    this.defaultDataDn.datasets[0].backgroundColor = this.dataChartDnMap.map(
      (e) => {
        return e.bgColor
      },
    )
    console.log(this.defaultDataDn)
    this.loaded = true
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
    defaultData() {
      return {
        labels: [],
        datasets: [
          {
            label: 'Số người đăng ký khóa học',
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      }
    },
    defaultDataDn() {
      return {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      }
    },
  },
}
</script>
