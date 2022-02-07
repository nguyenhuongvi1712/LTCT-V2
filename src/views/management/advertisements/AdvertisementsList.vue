<template>
  <div>
    <h2 class="text-center mb-4">List advertisements</h2>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      border
      height="660px"
      stripe
    >
      <el-table-column label="Id" prop="id"> </el-table-column>
      <el-table-column label="Title">
        <template v-slot="scope">
          <a href="scope.row.advertismentUrl">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Image">
        <template v-slot="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
        prop="type"
        :filters="filterListType"
        :filter-method="filterType"
      >
      </el-table-column>
      <el-table-column label="Display type" prop="advertisingDisplayType">
      </el-table-column>
      <el-table-column label="Position" prop="advertisementPosition">
      </el-table-column>
      <el-table-column label="Access number" prop="accessNumber" sortable>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot:header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteConfirm(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: right">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="this.ads.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getAdvertisment,
  getListTypeOfAdvertisment,
  deleteAd,
} from '@/api/advertisment'
export default {
  data() {
    return {
      tableData: [],
      ads: [],
      loading: false,
      currentPage: null,
      search: '',
      filterListType: [],
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterType(value, row) {
      return row.type === value
    },
    deleteConfirm(index, row) {
      this.$confirm(
        'This will permanently delete this advertisement. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          this.loading = true
          await deleteAd(row.id)
          const idx = this.ads.findIndex((e) => e.id === row.id)
          this.ads.splice(idx, 1)
          this.loading = false
          this.$message({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch((err) => {
          this.$message.error('Oops! Something was wrong!')
          console.log(err)
          return
        })
    },
    handleEdit(index, row) {
      this.$router.push('/advertisements/' + row.id)
    },
  },
  watch: {
    currentPage(val) {
      const index = (val - 1) * 10
      this.tableData = this.ads.slice(index, index + 10)
    },
    search(val) {
      if (val !== '') {
        this.tableData = this.ads.filter(
          (data) =>
            !val ||
            data.title.toLowerCase().includes(val.toLowerCase()) ||
            parseInt(val) === data.id,
        )
      } else {
        const index = (this.currentPage - 1) * 10
        this.tableData = this.ads.slice(index, index + 10)
      }
    },
    ads(val) {
      const index = (this.currentPage - 1) * 10
      this.tableData = val.slice(index, index + 10)
    },
  },
  async created() {
    this.loading = true
    this.ads = (await getAdvertisment()).data
    this.loading = false
    this.currentPage = 1
    var list_type = (await getListTypeOfAdvertisment()).data
    this.filterListType = list_type.map((e) => {
      return { text: e, value: e }
    })
  },
}
</script>
