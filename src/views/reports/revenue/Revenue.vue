<template>
  <CRow>
    <CCol :xs="12" class="mb-4">
      <CCard>
        <CCardHeader>
          <span>Pick a year </span>
          <el-date-picker v-model="year" type="year" placeholder="Pick a year">
          </el-date-picker>
        </CCardHeader>
        <CCardBody>
          <CChartLine :data="defaultData" v-if="loaded" :options="option" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12" class="mb-4">
      <CCard>
        <CCardHeader>
          <div class="block">
            <span class="demonstration" style="margin-right: 5px"
              >Best Product
            </span>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="To"
              start-placeholder="Start month"
              end-placeholder="End month"
            >
            </el-date-picker>
          </div>
        </CCardHeader>
        <CCardBody>
          <el-table
            :data="tableData"
            :default-sort="{ prop: 'quantity', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column prop="product_id" label="product Id">
            </el-table-column>
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column
              prop="type"
              label="Type"
              :filters="productType"
              :filter-method="filterTypeHandler"
            >
            </el-table-column>
            <el-table-column prop="price" label="Price"> </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantity"
              width="180"
              sortable
            >
            </el-table-column>
          </el-table>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Best type of product</CCardHeader>
        <CCardBody>
          <CChartDoughnut :data="typeData" v-if="dnLoaded" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader
          >Report from : {{ start }} to
          {{ end }}
        </CCardHeader>
        <CCardBody style="height: 630px">
          <p>
            <strong>Best product :</strong>
            {{ bestProduct?.name }} - Price: {{ bestProduct?.price }} - Sold
            quantity: {{ bestProduct?.quantity }}
          </p>
          <p>
            <strong> Best type of product :</strong> {{ bestType?.type }} - Sold
            quantity: {{ bestType?.quantity }}
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLine, CChartDoughnut } from '@coreui/vue-chartjs'
import faker from 'faker'
import { getOrders, getOrdersByFilter } from '../../../api/orders'
import { getProducts } from '../../../api/products/api-sp17'
import {
  unique,
  sumSimpleArray,
  formatMonthDate,
  findMaxIndex,
} from '../../../utils'

export default {
  name: 'Total up',
  components: { CChartLine, CChartDoughnut },
  data() {
    return {
      products: [],
      tableData: [],
      orders: [],
      productType: [],
      year: new Date(),
      reportByTotal: [],
      reportByNumOfOrder: [],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      loaded: false,
      dnLoaded: false,
      value1: [],
      option: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Total up',
          },
        },
        scales: {
          y: {
            display: true,
            position: 'left',
          },
          y1: {
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
      bestProduct: {},
      bestType: {},
    }
  },
  methods: {
    getData() {
      getOrders(this.year.getFullYear()).then((response) => {
        this.month.forEach((month) => {
          var data = response.filter((item) => {
            return new Date(item.order_timestamp).getMonth() == month - 1
          })
          this.reportByTotal[month - 1] = 0
          this.reportByNumOfOrder[month - 1] = data.length
          data.map((value) => {
            this.reportByTotal[month - 1] += value.total
          })
        })
        this.defaultData.datasets[0].data = this.reportByNumOfOrder
        this.defaultData.datasets[1].data = this.reportByTotal
        this.loaded = true
      })
    },
    getProductList() {
      getOrdersByFilter(this.value1[0], this.value1[1]).then((res) => {
        this.orders = res
        const soldProduct = []
        const productMap = []
        res.forEach((order) => {
          productMap.push(...order.product_list)
        })
        productMap.forEach((p) => {
          const element = soldProduct.find((o) => o.product_id === p.product_id)
          const product = this.products.filter((pro) => {
            return p.product_id === pro.id
          })
          if (element) {
            element.quantity += p.quantity
          } else
            soldProduct.push({
              ...p,
              price: product[0]?.price,
              name: product[0]?.name,
              type: product[0]?.type,
            })
        })
        const unSoldProduct = []
        this.products
          .map((product) => ({
            ...product,
            product_id: product.id,
          }))
          .forEach((products) => {
            if (!soldProduct.find((p) => p.product_id == products.id))
              unSoldProduct.push({
                ...products,
                quantity: 0,
              })
          })
        this.tableData = [...soldProduct, ...unSoldProduct]
        // render dn chart
        const dnChartData = []
        const backgroundColor = []
        this.productType.forEach((type) => {
          const val = this.tableData
            .filter((e) => {
              return e.type === type.value
            })
            .map((e) => {
              return e.quantity
            })
          console.log('val', val)
          const sum = sumSimpleArray(val)
          dnChartData.push(sum)
          backgroundColor.push(faker.internet.color())
        })
        this.typeData.datasets[0].data = dnChartData
        this.typeData.datasets[0].backgroundColor = backgroundColor
        this.typeData.labels = this.productType.map((o) => {
          return o.value
        })
        console.log(this.typeData)
        this.dnLoaded = true

        // find best product and best type of product
        this.bestProduct = this.tableData.sort((first, second) => {
          if (first.quantity > second.quantity) return -1
          else return 0
        })[0]
        const index = findMaxIndex(this.typeData.datasets[0].data)
        this.bestType = {
          type: this.typeData.labels[index],
          quantity: this.typeData.datasets[0].data[index],
        }
      })
    },
    filterTypeHandler(value, row) {
      return row.type === value
    },
  },
  computed: {
    defaultData() {
      return {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'number of orders',
            backgroundColor: 'rgb(228,102,81,0.9)',
            borderColor: 'rgb(228,102,81,0.9)',
            data: [30, 39, 10, 50, 30, 70, 35, 10, 50, 30, 70, 35, 30, 70, 35],
            yAxisID: 'y',
          },
          {
            label: 'revenue',
            backgroundColor: 'rgb(0,216,255,0.9)',
            borderColor: 'rgb(0,216,255,0.9)',
            data: [39, 80, 40, 35, 40, 20, 45, 10, 50, 30, 70, 35, 30, 70, 35],
            yAxisID: 'y1',
          },
        ],
      }
    },
    typeData() {
      return {
        labels: [],
        datasets: [{}],
      }
    },
    start() {
      return this.value1[0] ? formatMonthDate(this.value1[0], '/') : ''
    },
    end() {
      return this.value1[1] ? formatMonthDate(this.value1[1], '/') : ''
    },
  },
  async created() {
    this.getData()
    const current = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(current.getMonth() - 1)
    this.products = await getProducts()
    const listType = this.products.map((o) => {
      return o.type
    })
    this.productType = unique(listType).map((pro) => {
      return { text: pro, value: pro }
    })
    this.getProductList()
  },
  watch: {
    year: function (oldVal, val) {
      if (oldVal !== val) {
        this.loaded = false
        this.getData()
      }
    },
    value1: function (oldVal, val) {
      if (oldVal !== val) {
        this.dnLoaded = false
        this.getProductList()
      }
    },
  },
}
</script>
