<template>
  <div v-loading="loading">
    <h2 class="text-center mb-4">Customer information</h2>
    <CCard class="mb-4">
      <CCardHeader>
        <strong>Customer information (ID: {{ user.id }})</strong>
      </CCardHeader>
      <CCardBody>
        <CRow class="mb-3">
          <CFormLabel for="username" class="col-sm-2 col-form-label">
            Username
          </CFormLabel>
          <div class="col-sm-10">
            <CFormInput
              type="text"
              id="username"
              readonly
              plain-text
              :value="user.username"
            />
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel class="col-sm-2 col-form-label">Gender</CFormLabel>
          <div class="col-sm-10">
            <el-radio v-model="gender" label="male">Male</el-radio>
            <el-radio v-model="gender" label="female">Female</el-radio>
          </div>
        </CRow>
        <!-- <CRow class="mb-3">
          <CFormLabel class="col-sm-2 col-form-label">Status</CFormLabel>
          <div class="col-sm-10">
            <el-tooltip :content="'Switch value: ' + value" placement="top">
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="100"
                inactive-value="0"
              >
              </el-switch>
            </el-tooltip>
          </div>
        </CRow> -->
        <CRow class="mb-3">
          <CFormLabel for="staticEmail" class="col-sm-2 col-form-label">
            Name
          </CFormLabel>
          <div class="col-sm-10">
            <CFormInput type="text" id="staticEmail" v-model="uname" />
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="email" class="col-sm-2 col-form-label">
            Email
          </CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.email.$errors.length }">
            <CFormInput type="text" id="email" v-model="v$.email.$model" />
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="phone" class="col-sm-2 col-form-label">
            Phone number
          </CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.phone.$errors.length }">
            <CFormInput type="text" id="phone" v-model="v$.phone.$model" />
            <div
              class="input-errors"
              v-for="error of v$.phone.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="address" class="col-sm-2 col-form-label">
            Address
          </CFormLabel>
          <div class="col-sm-10">
            <CFormTextarea id="address" v-model="address"></CFormTextarea>
          </div>
        </CRow>
        <CRow class="mb-3 text-center">
          <div>
            <el-button type="primary" round @click="handlerOnSubmit">
              Update
            </el-button>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { getAccountInfo, updateUser } from '@/api/users'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      email: { required, email },
      phone: { required, numeric },
    }
  },
  data() {
    return {
      user: [],
      gender: '',
      loading: true,
      uname: '',
      phone: '',
      email: '',
      address: '',
    }
  },
  methods: {
    setValue() {
      if (this.user) {
        this.uname = this.user.name
        this.phone = this.user.phone
        this.email = this.user.email
        this.address = this.user.address
        this.gender = this.user.gender
      }
    },
    async handlerOnSubmit() {
      this.loading = true
      await updateUser(this.user.id, {
        name: this.uname,
        gender: this.gender,
        address: this.address,
        phone: this.phone,
        email: this.email,
      })
      this.user = await getAccountInfo(this.user.id)
      this.setValue()
      this.$message({
        message: 'Account updated successfully!',
        type: 'success',
      })
      this.loading = false
    },
  },
  async created() {
    try {
      this.loading = true
      const id = this.$route.params.id
      this.user = await getAccountInfo(id)
      this.setValue()
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
