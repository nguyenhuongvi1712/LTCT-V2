<template>
  <h2 class="text-center mb-4">List customers</h2>
</template>
<script>
import { getListUsers } from '@/api/users'
export default {
  data() {
    return {
      loading: false,
      users: [],
    }
  },
  async created() {
    this.loading = true
    this.users = await getListUsers()
    console.log('users', this.users)
    this.loading = false
  },
}
</script>
