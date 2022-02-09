<template>
  <h2 class="text-center mb-4">List promotions</h2>
  <el-table
    style="width: 100%"
    height="660px"
    stripe
    v-loading="loading"
    :data="
      promotions?.filter(
        (e) =>
          !search ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e._id.toLowerCase().includes(search.toLowerCase()),
      )
    "
  >
    <el-table-column prop="_id" label="ID"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="description" label="Description"> </el-table-column>
    <el-table-column
      prop="discount.discountValue"
      label="Discount value"
      sortable
    ></el-table-column>
    <el-table-column
      prop="discount.discountType"
      label="discountType"
      sortable
    ></el-table-column>
    <el-table-column prop="isActived" label="Status" width="100">
      <template v-slot="scope">
        <el-tag
          :type="scope.row.isActived === false ? 'primary' : 'success'"
          disable-transitions
          >{{ scope.row.isActived }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column
      prop="applyProduct.applyProductId.length"
      label="Number of uses"
      sortable
    >
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
import { getListPromotion, deletePromotion } from '../../../api/promotions'
export default {
  data() {
    return {
      promotions: null,
      search: '',
    }
  },
  async created() {
    this.loading = true
    this.promotions = (await getListPromotion()).data
    this.loading = false
    console.log('res', this.promotions)
  },
  methods: {
    deleteConfirm(index, row) {
      this.$confirm(
        'This will permanently delete this promotion. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          this.loading = true
          await deletePromotion(row._id)
          const idx = this.promotions.findIndex((e) => e._id === row._id)
          console.log('idx', idx)
          this.promotions.splice(idx, 1)
          console.log('promotion', this.promotions)
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
