<template>
  <h2 class="text-center mb-4">List customers</h2>
  <el-table
    :data="
      users.filter(
        (data) =>
          !search ||
          data.username.toLowerCase().includes(search.toLowerCase()) ||
          data.phone.toLowerCase().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase()),
      )
    "
    border
    style="width: 100%"
    v-loading="loading"
    stripe
    height="800"
  >
    <el-table-column prop="id" label="User's ID" width="85"></el-table-column>
    <el-table-column prop="gender" label="Gender" width="90"> </el-table-column>
    <el-table-column prop="name" label="User's Name" min-width="180">
    </el-table-column>
    <el-table-column prop="username" label="Username" min-width="180">
    </el-table-column>
    <el-table-column prop="email" label="Email" min-width="220">
    </el-table-column>
    <el-table-column prop="phone" label="Phone number" min-width="140">
    </el-table-column>
    <el-table-column
      prop="status"
      label="Status"
      width="100"
      :filters="[
        { text: 'Active', value: 'active' },
        { text: 'Blocked', value: 'blocked' },
      ]"
      :filter-method="filterStatus"
      filter-placement="bottom-end"
    >
      <template v-slot="scope">
        <el-tag
          :type="scope.row.status === 'active' ? 'primary' : 'success'"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="220">
      <template v-slot:header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template v-slot="scope">
        <el-button size="mini">
          <router-link
            :to="{ name: 'Customer information', params: { id: scope.row.id } }"
          >
            Detail
          </router-link>
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteConfirm(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getListUsers, deleteUser } from '@/api/users'
export default {
  data() {
    return {
      loading: true,
      users: [],
      search: '',
    }
  },
  async created() {
    this.loading = true
    this.users = (await getListUsers()).data.filter((e) => e.role == 'user')
    console.log(this.users)
    this.loading = false
  },
  methods: {
    deleteConfirm(index, row) {
      this.$confirm(
        'This will permanently delete this account. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          console.log(index, row)
          this.loading = true
          await deleteUser(row.id)
          const idx = this.users.findIndex((e) => e.id === row.id)
          this.users.splice(idx, 1)
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
    filterStatus(value, row) {
      return row.status === value
    },
  },
}
</script>
