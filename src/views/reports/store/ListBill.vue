<template>
  <h1 class="text-center mb-4">List Bill</h1>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase()),
      )
    "
    style="width: 100%"
  >
    <el-table-column label="id" prop="id"> </el-table-column>
    <el-table-column label="Product id" prop="product_id"> </el-table-column>
    <el-table-column label="Quantity" prop="quantity"> </el-table-column>
    <el-table-column label="Color" prop="color"> </el-table-column>
    <el-table-column label="Description" prop="description"> </el-table-column>
    <el-table-column label="Created at" prop="created_at"> </el-table-column>
    <!-- <el-table-column align="right">
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
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import { getBill } from '@/api/store-sp18'
export default {
  data() {
    return {
      tableData: [],
      search: '',
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
  },
  async created() {
    const res = await getBill()
    this.tableData = res
  },
}
</script>
