<template>
  <div v-loading="loading">
    <h2 class="text-center mb-4">Create new account</h2>
    <CCard class="mb-4">
      <CCardBody>
        <CRow class="mb-3">
          <CFormLabel for="username" class="col-sm-2 col-form-label">
            Username
          </CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.username.$errors.length }">
            <CFormInput
              type="text"
              id="username"
              v-model="v$.username.$model"
            />
            <div
              class="input-errors"
              v-for="error of v$.username.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel class="col-sm-2 col-form-label">Gender</CFormLabel>
          <div class="col-sm-10">
            <el-radio v-model="gender" label="male">Male</el-radio>
            <el-radio v-model="gender" label="female">Female</el-radio>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel class="col-sm-2 col-form-label">Role</CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.role.$errors.length }">
            <el-select
              v-model="v$.role.$model"
              placeholder="Select role"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div
              class="input-errors"
              v-for="error of v$.role.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="staticEmail" class="col-sm-2 col-form-label">
            Name
          </CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.uname.$errors.length }">
            <CFormInput
              type="text"
              id="staticEmail"
              v-model="v$.uname.$model"
            />
            <div
              class="input-errors"
              v-for="error of v$.uname.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="inputPassword" class="col-sm-2 col-form-label">
            Password
          </CFormLabel>
          <div class="col-sm-10" :class="{ error: v$.password.$errors.length }">
            <CFormInput
              type="password"
              id="inputPassword"
              v-model="v$.password.$model"
            />
            <div
              class="input-errors"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="inputPassword" class="col-sm-2 col-form-label">
            Repeat password
          </CFormLabel>
          <div
            class="col-sm-10"
            :class="{ error: v$.repeatPassword.$errors.length }"
          >
            <CFormInput type="password" v-model="v$.repeatPassword.$model" />
            <div
              class="error text-danger"
              v-if="repeatPassword !== '' && repeatPassword !== password"
            >
              Passwords must be identical.
            </div>
            <div
              class="input-errors"
              v-for="error of v$.repeatPassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-danger">
                {{ error.$message }}
              </div>
            </div>
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
              Submit
            </el-button>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { createNewAccount } from '@/api/users'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      email: { required, email },
      phone: { required, numeric },
      uname: { required },
      username: { required },
      role: { required },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        required,
      },
    }
  },
  data() {
    return {
      user: [],
      gender: '',
      loading: false,
      uname: '',
      phone: '',
      email: '',
      address: '',
      u_status: null,
      username: '',
      options: [
        {
          value: 'user',
          label: 'User',
        },
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'shipper',
          label: 'Shipper',
        },
      ],
      role: '',
      password: '',
      repeatPassword: '',
    }
  },
  methods: {
    async handlerOnSubmit() {
      const isValid = await this.v$.$validate()
      if (!isValid || this.repeatPassword !== this.password) return
      this.loading = true
      const res = await createNewAccount({
        name: this.uname,
        username: this.username,
        gender: this.gender,
        address: this.address,
        phone: this.phone,
        email: this.email,
        password: this.password,
        rePassword: this.repeatPassword,
        password_confirmation: this.repeatPassword,
        role: this.role,
      })
      if (res.success === true) {
        this.$message({
          message: 'Account created successfully!',
          type: 'success',
        })
        this.$router.push('/users/accounts')
      } else {
        this.$message.error('Oops! Something was wrong!')
      }
      this.loading = false
    },
  },
}
</script>
