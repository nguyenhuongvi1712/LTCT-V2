<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>New Orders </CCardHeader>
          <CCardBody>
            <el-table
              :data="newOrder"
              style="width: 100%"
              v-loading="loading"
              stripe
              height="660px"
            >
              <el-table-column label="Id" prop="order_id">
                <template v-slot="scope">
                  <router-link :to="'/orders/' + scope.row.order_id">{{
                    scope.row.order_id
                  }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="Custormer Id" prop="user_id">
              </el-table-column>
              <el-table-column label="Total" prop="total" sortable>
              </el-table-column>
              <el-table-column label="Subtotal" prop="subtotal" sortable>
              </el-table-column>
              <el-table-column label="Note" prop="delivery_note">
              </el-table-column>
              <el-table-column label="Payment method">
                <template v-slot="scope">
                  <CIcon
                    :icon="setMethodSymbol(scope.row.payment_method)"
                    size="xl"
                  />
                  <span style="margin-left: 5px">
                    {{ scope.row.payment_method }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                prop="status"
                :filters="filterStatus"
                :filter-method="filterByStatus"
              >
              </el-table-column>
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
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>List Orders </CCardHeader>
          <CCardBody>
            <el-table
              :data="orders"
              style="width: 100%"
              v-loading="loading"
              stripe
            >
              <el-table-column label="Id" prop="order_id">
                <template v-slot="scope">
                  <router-link to="/">{{ scope.row.order_id }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="Custormer Id" prop="user_id">
              </el-table-column>
              <el-table-column label="Total" prop="total" sortable>
              </el-table-column>
              <el-table-column label="Subtotal" prop="subtotal" sortable>
              </el-table-column>
              <el-table-column label="Note" prop="delivery_note">
              </el-table-column>
              <el-table-column label="Payment method">
                <template v-slot="scope">
                  <CIcon
                    :icon="setMethodSymbol(scope.row.payment_method)"
                    size="xl"
                  />
                  <span style="margin-left: 5px">
                    {{ scope.row.payment_method }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                prop="status"
                :filters="filterStatus"
                :filter-method="filterByStatus"
              >
              </el-table-column>
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
            <div class="block" style="text-align: right">
              <el-pagination
                small
                layout="prev, pager, next"
                :total="this.orders?.length"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
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
      orders: [],
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
      loading: true,
      currentPage: 1,
    }
  },
  async created() {
    this.loading = true
    const res = (await getOrder()).data
    this.newOrder = res?.filter(
      (e) => e.status === 'unpaid' || e.status === 'active',
    )
    this.orders = res?.filter(
      (e) => e.status !== 'unpaid' && e.status !== 'active',
    )
    this.loading = false
  },
  methods: {
    setMethodSymbol(method) {
      if (method === 'VISA') {
        return 'cib-cc-visa'
      } else if (method === 'cod') {
        return 'cib-cc-paypal'
      } else {
        return 'cib-cc-mastercard'
      }
    },
    filterByStatus(value, row) {
      return row.status === value
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>
