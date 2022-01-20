<template>
  <el-table
    style="width: 100%"
    height="660px"
    stripe
    :data="
      products.filter(
        (e) =>
          !search ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.id === parseInt(search),
      )
    "
  >
    <el-table-column prop="id" label="Product's ID"></el-table-column>
    <el-table-column prop="name" label="Product's Name"></el-table-column>
    <el-table-column prop="price" label="Price" sortable> </el-table-column>
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
    <el-table-column
      prop="quantity"
      label="Quantity"
      sortable
    ></el-table-column>
    <el-table-column
      prop="category"
      label="Category"
      :filters="filterListCategory"
      :filter-method="filterCategory"
    ></el-table-column>
    <el-table-column align="right">
      <template v-slot:header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template v-slot="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteConfirm(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  getListProducts,
  getListCategory,
  filtersCategory,
  deleteProduct,
} from '@/api/products'
export default {
  methods: {
    handleClick() {
      console.log('click')
    },
    filterCategory(value, row) {
      return row.category === value
    },
    deleteConfirm(index, row) {
      console.log('index', index)
      console.log('row', row)
      this.$confirm(
        'This will permanently delete this product. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          await deleteProduct(row.id)
          row.splice(index, 1)
          this.$message({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch(() => {
          return
        })
    },
  },
  data() {
    return {
      products: [],
      search: '',
      categories: [],
      filterListCategory: [],
    }
  },
  async mounted() {
    const res = await getListProducts()
    this.categories = await getListCategory()
    this.products = res.map((e) => {
      return {
        ...e,
        category: filtersCategory(this.categories, e.id)?.name,
      }
    })
    this.filterListCategory = this.categories.map((e) => {
      return {
        text: e.name,
        value: e.name,
      }
    })
  },
}
</script>
