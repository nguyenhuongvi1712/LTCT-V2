<template>
  <h2 class="text-center mb-4">Edit advertisement</h2>
  <div v-loading="loading">
    <CForm @submit.prevent="handleSubmit">
      <div class="mb-3 form-group" :class="{ error: v$.title.$errors.length }">
        <CFormLabel for="name">Title</CFormLabel>
        <CFormInput
          type="text"
          id="name"
          placeholder="Love Parade: Die Looks"
          v-model.trim="v$.title.$model"
        />
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.title.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-3 form-group" :class="{ error: v$.url.$errors.length }">
        <CFormLabel for="url">Link</CFormLabel>
        <CFormInput
          type="text"
          id="url"
          placeholder="https://www.facebook.com/chemistryismylove/"
          v-model.trim="v$.url.$model"
        />
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.url.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div
        class="mb-3 form-group"
        :class="{ error: v$.imageUrl.$errors.length }"
      >
        <CFormLabel for="url">Image Url</CFormLabel>
        <CFormInput
          type="text"
          id="imageUrlUrl"
          placeholder="https://www.facebook.com/chemistryismylove/"
          v-model.trim="v$.imageUrl.$model"
        />
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.imageUrl.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-3 form-group">
        <CFormLabel for="quantity">Status</CFormLabel>
        <div>
          <el-radio v-model="status" label="active">Active</el-radio>
          <el-radio v-model="status" label="inactive">Inactive</el-radio>
        </div>
      </div>
      <div
        class="mb-3 form-group"
        :class="{ error: v$.displayType.$errors.length }"
      >
        <CFormLabel for="displayType">Display Type</CFormLabel>
        <CFormInput
          type="text"
          id="displayType"
          placeholder="digital"
          v-model.trim="v$.displayType.$model"
        />
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.displayType.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div
        class="mb-3 form-group"
        :class="{ error: v$.position.$errors.length }"
      >
        <CFormLabel for="imageUrl">Position</CFormLabel>
        <CFormInput
          type="text"
          id="imageUrl"
          placeholder="product page"
          v-model.trim="v$.position.$model"
        />
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.position.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-3 form-group" :class="{ error: v$.type.$errors.length }">
        <CFormLabel for="imageUrl">Type</CFormLabel>
        <CFormSelect
          aria-label="select type"
          v-model.trim="v$.type.$model"
          :options="option"
        >
        </CFormSelect>
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.type.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-3 form-group">
        <CFormLabel>Date</CFormLabel>
        <div class="block">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        class="mb-3 form-group"
        :class="{ error: v$.content.$errors.length }"
      >
        <CFormLabel for="content">Content</CFormLabel>
        <CFormTextarea
          id="content"
          rows="3"
          v-model.trim="v$.content.$model"
        ></CFormTextarea>
        <div
          class="input-errors mt-3 mb-3"
          v-for="error of v$.content.$errors"
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
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {
  getAdvertismentById,
  getListTypeOfAdvertisment,
  editAdvertisement,
} from '@/api/advertisment'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      title: { required },
      url: { required },
      displayType: { required },
      type: { required },
      content: { required },
      imageUrl: { required },
      position: { required },
    }
  },
  data() {
    return {
      ad: {},
      id: '',
      title: '',
      url: null,
      displayType: '',
      type: '',
      content: '',
      imageUrl: '',
      position: '',
      option: ['Open this select type'],
      date: [],
      status: 'active',
      loading: false,
    }
  },
  async created() {
    this.id = this.$route.params.id
    const res = (await getAdvertismentById(this.id)).data
    this.title = res.title
    this.type = res.type
    this.url = res.advertismentUrl
    this.displayType = res.advertisingDisplayType
    this.content = res.content
    this.imageUrl = res.imageUrl
    this.position = res.advertisementPosition
    this.status = res.status
    this.date = [new Date(res.startAt), new Date(res.endAt)]
    var list_type = (await getListTypeOfAdvertisment()).data
    list_type = list_type.map((e) => {
      return {
        label: e,
        value: e,
      }
    })
    this.option.push(...list_type)
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.v$.$validate()
      if (!isValid) return
      const req = {
        title: this.title,
        content: this.content,
        advertismentUrl: this.url,
        imageUrl: this.imageUrl,
        type: this.type,
        advertisingDisplayType: this.displayType,
        advertisementPosition: this.position,
        status: this.status,
        startAt: this.date[0],
        endAt: this.date[1],
      }
      this.loading = true
      const res = await editAdvertisement(this.id, req)
      this.loading = false
      if (res.success === true) {
        this.$message({
          message: 'Product updated successfully.',
          type: 'success',
        })
        this.$router.push('/advertisements/list')
      } else {
        this.$message.error('Oops! Something was wrong!')
      }
    },
  },
}
</script>
