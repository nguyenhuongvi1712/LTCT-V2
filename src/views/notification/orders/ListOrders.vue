<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>New Orders</CCardHeader>
          <CCardBody>
            <el-table :data="newOrder" style="width: 100%">
              <el-table-column label="Id" prop="order_id">
                <template v-slot="scope">
                  <router-link to="/">{{ scope.row.order_id }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="Custormer Id" prop="user_id">
              </el-table-column>
              <el-table-column label="Total" prop="total"> </el-table-column>
              <el-table-column label="Subtotal" prop="subtotal">
              </el-table-column>
              <el-table-column label="Note" prop="delivery_note">
              </el-table-column>
              <el-table-column label="Payment method" prop="payment_method">
              </el-table-column>
              <el-table-column label="Status" prop="status"> </el-table-column>
              <el-table-column label="Operations">
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Cancel</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </CCardBody>
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
      search: '',
      filterStatus: [
        {
          value: 'unpaid',
          text: 'unpaid',
        },
        {
          value: 'active',
          text: 'active',
        },
      ],
    }
  },
  async created() {
    const res = (await getOrder()).data
    this.newOrder = res.filter(
      (e) => e.status === 'unpaid' || e.status === 'active',
    )
    console.log('new order', this.newOrder)
  },
}
</script>
