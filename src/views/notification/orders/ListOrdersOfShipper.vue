<template>
  <div>
    <h2 class="text-center mb-4">My Delivery</h2>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase()),
        )
      "
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column label="Delivery Id" prop="deliveryId"> </el-table-column>
      <el-table-column label="orderId">
        <template v-slot="scope">
          <a :href="scope.row.orderId">{{ scope.row.orderId }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Cost" prop="cost"> </el-table-column>
      <el-table-column label="ShippingFee" prop="shippingFee">
      </el-table-column>
      <el-table-column label="Status" prop="status"> </el-table-column>
      <el-table-column align="right">
        <template v-slot:header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="takeConfirm(scope.$index, scope.row)"
            >Update status</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getDeliveryByShipperId, updateStatus } from '../../../api/shipping'
export default {
  data() {
    return {
      tableData: [],
      search: '',
      loading: false,
    }
  },
  methods: {
    takeConfirm(index, row) {
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'Confirm your decision',
      })
        .then(async () => {
          this.loading = true
          await updateStatus(row.deliveryId)
          this.loading = false
          this.$message({
            type: 'success',
            message: 'Completed',
          })
          await this.getData()
        })
        .catch((err) => {
          this.$message.error('Oops! Something was wrong!')
          console.log(err)
          return
        })
    },
    async getData() {
      this.loading = true
      var user = JSON.parse(localStorage.getItem('user'))
      if (!user.id) {
        user = { ...user, id: user._id }
      }
      this.tableData = (await getDeliveryByShipperId(user.id)).deliveries
      this.loading = false
    },
  },
  async created() {
    await this.getData()
  },
}
</script>
