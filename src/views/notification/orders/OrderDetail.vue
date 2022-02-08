<template>
  <div v-loading="loading">
    <CCard>
      <CCardHeader class="text-center">Order Id : {{ id }}</CCardHeader>
      <CCardBody>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-user" style="margin-right: 10px" />Customer :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <router-link
                :to="'/users/' + this.order.user_id"
                v-if="this.user?.username"
                >{{ this.user?.username }}</router-link
              >
              <span v-else>Undefine</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon
                icon="cib-cc-mastercard"
                style="margin-right: 10px"
              />Payment method :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.payment_method }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-file" style="margin-right: 10px" />From address :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.from_address }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-file" style="margin-right: 10px" />To address :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.to_address }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-bell" style="margin-right: 10px" />Time :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.order_timestamp }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-star" style="margin-right: 10px" />Status :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.status }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-list" style="margin-right: 10px" />Phone number :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.phone_number }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-notes" style="margin-right: 10px" />Delivery note
              :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.delivery_note }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-calendar" style="margin-right: 10px" />Delivery
              time :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.deliver_timestamp }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-task" style="margin-right: 10px" />Products ({{
                this.order?.product_list.length
              }}) :
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="24">
            <el-table :data="products" style="width: 100%" border="" stripe>
              <el-table-column label="image">
                <template v-slot="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.image"
                    :preview-src-list="[scope.row.image]"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column label="Product name">
                <template v-slot="scope">
                  <router-link :to="'/products/' + scope.row.id">{{
                    scope.row.name
                  }}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="order_qty" label="Quantity">
              </el-table-column>
              <el-table-column prop="price" label="Price"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-list" style="margin-right: 10px" />Subtotal :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.subtotal }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-calculator" style="margin-right: 10px" />Shipping
              fee :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.shipping_fee }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-ban" style="margin-right: 10px" />Shipping unit :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.shipping_unit }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-menu" style="margin-right: 10px" />Shipping
              voucher :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <span>{{ this.order?.shipping_voucher }}</span>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-dollar" style="margin-right: 10px" />Total :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <strong style="color: red">{{ this.order?.total }}</strong>
            </div></el-col
          >
        </el-row>
        <el-row class="mb-4">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <CIcon icon="cil-basket" style="margin-right: 10px" />Update
              status :
            </div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content bg-purple-light">
              <el-radio v-model="status" label="unpaid">Unpaid</el-radio>
              <el-radio v-model="status" label="active">Active</el-radio>
              <el-radio v-model="status" label="delivered">Delivered</el-radio>
              <el-radio v-model="status" label="cancelled">Cancelled</el-radio>
            </div>
            <div>
              <el-button type="primary" plain @click="updateStatus"
                >Submit</el-button
              >
            </div>
          </el-col>
        </el-row>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { getOrderById, updateStatus } from '../../../api/orders'
import { getAccountInfo } from '../../../api/users'
import { getProductById } from '../../../api/products'
export default {
  data() {
    return {
      id: null,
      order: null,
      loading: true,
      user: null,
      products: [],
      status,
    }
  },
  async created() {
    this.loading = true
    this.id = this.$route.params.id
    this.order = await getOrderById(this.id)
    console.log('order', this.order)
    var user = JSON.parse(localStorage.getItem('user'))
    if (user.role === 'admin') {
      const res = await getAccountInfo(this.order.user_id)
      if (!res && !res.phone) this.user = null
      else this.user = res
    }
    const res = this.order.product_list
    for (const e of res) {
      const product = await getProductById(e.product_id)
      this.products.push({
        ...product,
        order_qty: e.quantity,
      })
    }
    this.status = this.order.status
    this.loading = false
  },
  methods: {
    async updateStatus() {
      try {
        this.loading = true
        const res = await updateStatus(this.id, { status: this.status })
        this.loading = false
        console.log('res', res)
        if (res.success === true) {
          this.$router.push('/orders/list')
        } else {
          this.$message.error('Oops! Something was wrong!')
        }
      } catch (error) {
        console.log('error', error)
      }
    },
  },
}
</script>
