<template>
  <h2 class="text-center mb-4">Create new product</h2>
  <CForm @submit.prevent="handleSubmit">
    <div class="mb-3 form-group" :class="{ error: v$.name.$errors.length }">
      <CFormLabel for="name">Product's name</CFormLabel>
      <CFormInput
        type="text"
        id="name"
        placeholder="Love Parade: Die Looks"
        v-model.trim="v$.name.$model"
      />
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 form-group" :class="{ error: v$.price.$errors.length }">
      <CFormLabel for="price">Product's price</CFormLabel>
      <CFormInput
        type="number"
        id="price"
        placeholder="500000"
        v-model.trim="v$.price.$model"
      />
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.price.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 form-group" :class="{ error: v$.quantity.$errors.length }">
      <CFormLabel for="quantity">Product's quantity</CFormLabel>
      <CFormInput
        type="number"
        id="quantity"
        placeholder="50"
        v-model.trim="v$.quantity.$model"
      />
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.quantity.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 form-group" :class="{ error: v$.brand.$errors.length }">
      <CFormLabel for="brand">Product's brand</CFormLabel>
      <CFormInput
        type="text"
        id="brand"
        placeholder="Gucci"
        v-model.trim="v$.brand.$model"
      />
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.brand.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 form-group" :class="{ error: v$.image.$errors.length }">
      <CFormLabel for="image">Image url</CFormLabel>
      <CFormInput
        type="text"
        id="image"
        placeholder=""
        v-model.trim="v$.image.$model"
      />
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.image.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div
      class="mb-3 form-group"
      :class="{ error: v$.category_id.$errors.length }"
    >
      <CFormLabel for="image">Category</CFormLabel>
      <CFormSelect
        aria-label="select category"
        v-model.trim="v$.category_id.$model"
        :options="option"
      >
      </CFormSelect>
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.category_id.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 form-group" :class="{ error: v$.detail.$errors.length }">
      <CFormLabel for="detail">Detail</CFormLabel>
      <CFormTextarea
        id="detail"
        rows="3"
        v-model.trim="v$.detail.$model"
      ></CFormTextarea>
      <div
        class="input-errors mt-3 mb-3"
        v-for="error of v$.detail.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-danger">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-3 text-center">
      <CButton color="primary" type="submit">Submit</CButton>
    </div>
  </CForm>
</template>

<script>
import { createNewProduct, getListCategory } from '@/api/products'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      name: { required },
      price: { required, numeric },
      brand: { required },
      category_id: { required, numeric },
      detail: { required },
      image: { required },
      quantity: { required, numeric },
    }
  },
  data() {
    return {
      name: '',
      price: null,
      brand: '',
      category_id: '',
      detail: '',
      image: '',
      quantity: null,
      option: ['Open this select menu'],
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.v$.$validate()
      if (!isValid) return
      const req = {
        name: this.name,
        price: parseInt(this.price),
        detail: this.detail,
        image: this.image,
        brand: this.brand,
        category_id: parseInt(this.category_id),
        quantity: parseInt(this.quantity),
      }
      const res = await createNewProduct(req)
      if (res.success_code === true) {
        this.$message({
          message: 'Product created successfully.',
          type: 'success',
        })
        this.$router.push('/products/list')
      } else {
        this.$message.error('Oops! Something was wrong!')
      }
    },
  },
  async created() {
    var list_category = await getListCategory()
    list_category = list_category.map((e) => {
      return {
        label: e.name,
        value: e.id,
      }
    })
    this.option.push(...list_category)
  },
}
</script>
