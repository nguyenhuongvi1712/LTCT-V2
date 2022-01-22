<template>
  <h2 class="text-center mb-4">Manage Categories</h2>
  <CButton color="primary" variant="outline" @click="handleCreate">
    <CIcon icon="cilPencil" />
    Create new
  </CButton>
  <el-table
    style="width: 100%"
    class="mt-4 mb-4"
    stripe
    v-loading="loading"
    :data="
      categoriesData.filter(
        (e) =>
          !search ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.id === parseInt(search),
      )
    "
  >
    <el-table-column prop="id" label="Category's ID"></el-table-column>
    <el-table-column prop="name" label="Category's Name"></el-table-column>
    <el-table-column prop="count" label="Product count" sortable>
    </el-table-column>
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
  getListCategory,
  getCountProductOfCategory,
  getListProducts,
  editCategory,
  createNewCategory,
  deleteCategory,
} from '@/api/products'
export default {
  data() {
    return {
      loading: true,
      categories: [],
      products: [],
      search: '',
    }
  },
  computed: {
    categoriesData() {
      return this.categories.map((e) => {
        return {
          ...e,
          count: getCountProductOfCategory(this.products, e.id)?.length,
        }
      })
    },
  },
  async mounted() {
    this.categories = await getListCategory()
    this.products = await getListProducts()
    this.loading = false
  },
  methods: {
    async handleEdit(index, row) {
      this.$prompt(
        `Edit name of category ${row.name}`,
        'Category Id: ' + row.id,
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputPattern: /([^\s])/,
          inputErrorMessage: 'Value is required!',
        },
      )
        .then(async ({ value }) => {
          this.loading = true
          if (value.trim() === '') {
            return
          } else {
            await editCategory(row.id, value.trim())
            this.categories = await getListCategory()
            this.$message({
              type: 'success',
              message: 'Category updated successfully.',
            })
          }
          this.loading = false
        })
        .catch(() => {
          return
        })
    },
    async handleCreate() {
      this.$prompt(
        'Please input name of new category ; ',
        'Create new category',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputPattern: /([^\s])/,
          inputErrorMessage: 'Value is required!',
        },
      )
        .then(async ({ value }) => {
          this.loading = true
          if (value.trim() === '') {
            return
          } else {
            await createNewCategory({ name: value.trim() })
            this.categories = await getListCategory()
            this.$message({
              type: 'success',
              message: 'Category created successfully!',
            })
          }
          this.loading = false
        })
        .catch(() => {
          return
        })
    },
    deleteConfirm(index, row) {
      console.log('row', row.id)
      this.$confirm(
        'This will permanently delete this category. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          this.loading = true
          await deleteCategory(row.id)
          this.categories = await getListCategory()
          this.loading = false
          this.$message({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch((err) => {
          console.log(err)
          return
        })
    },
  },
}
</script>
