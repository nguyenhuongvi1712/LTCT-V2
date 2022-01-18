<template>
  <h2 class="text-center mb-4">Create new product</h2>
  <CForm @submit.prevent="handleSubmit">
    <div class="mb-3">
      <CFormLabel for="name">Product's name</CFormLabel>
      <CFormInput
        type="text"
        id="name"
        placeholder="Love Parade: Die Looks"
        v-model="name"
      />
    </div>
    <div class="mb-3">
      <CFormLabel for="price">Product's price</CFormLabel>
      <CFormInput type="text" id="price" placeholder="500000" v-model="price" />
    </div>
    <div class="mb-3">
      <CFormLabel for="brand">Product's brand</CFormLabel>
      <CFormInput type="text" id="brand" placeholder="Gucci" v-model="brand" />
    </div>
    <div class="mb-3">
      <CFormLabel for="image">Image url</CFormLabel>
      <CFormInput type="text" id="image" placeholder="" v-model="image" />
    </div>
    <div class="mb-3">
      <CFormLabel for="image">Category</CFormLabel>
      <CFormSelect
        aria-label="select category"
        v-model="category_id"
        :options="option"
      >
      </CFormSelect>
    </div>
    <div class="mb-3">
      <CFormLabel for="detail">Detail</CFormLabel>
      <CFormTextarea id="detail" rows="3" v-model="detail"></CFormTextarea>
    </div>
    <div class="mb-3 text-center">
      <CButton color="primary" type="submit">Submit</CButton>
    </div>
  </CForm>
</template>

<script>
import {
  getListCategory,
  createNewProduct,
} from '../../../api/products/api-sp17'
export default {
  data() {
    return {
      name: '',
      price: '',
      brand: '',
      category_id: '',
      detail: '',
      image: '',
      option: ['Open this select menu'],
    }
  },
  methods: {
    async handleSubmit() {
      const req = {
        name: this.name,
        price: this.price,
        detail: this.detail,
        image: this.image,
        brand: this.brand,
        category: this.category_id,
      }
      const res = await createNewProduct(req)
      if (res.success === true) {
        this.$message({
          message: 'Product created successfully.',
          type: 'success',
        })
      } else {
        this.$message.error('Oops! ' + res.message)
      }
    },
  },
  async created() {
    var list_category = (await getListCategory()).data
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
