<template>
  <div
    class="bg-light min-vh-100 d-flex flex-row align-items-center"
    v-loading="loading"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <div
                    class="form-group"
                    :class="{ error: v$.username.$errors.length }"
                  >
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autocomplete="username"
                        v-model.trim="v$.username.$model"
                        class="form__input"
                      />
                    </CInputGroup>
                    <div
                      class="input-errors mb-3"
                      v-for="error of v$.username.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-danger">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    :class="{ error: v$.password.$errors.length }"
                  >
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                        v-model.trim="v$.password.$model"
                      />
                    </CInputGroup>
                    <div
                      class="input-errors mb-3"
                      v-for="error of v$.password.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-danger">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { login } from '@/api/users'
export default {
  name: 'Login',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  validations() {
    return {
      username: { required },
      password: { required },
    }
  },
  methods: {
    async login() {
      const isValid = await this.v$.$validate()
      if (!isValid) {
        return
      } else {
        this.loading = true
        const res = await login(this.username, this.password)
        console.log('res', res)
        this.loading = false
        if (res.status === 200) {
          const user = res.data
          if (user.role === 'admin' || user.role === 'shipper') {
            this.$store.commit('authStore/login', {
              user,
              token: res.token,
            })
            this.$router.replace({ path: '/' })
          } else {
            this.$message.error("Oops, you don't have permission!")
          }
        } else {
          this.$message.error('Username or password is incorrect!')
        }
      }
    },
  },
}
</script>
