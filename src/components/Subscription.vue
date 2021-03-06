<template>
  <el-card class="form">
    <form-schema ref="formSchema" :schema="schema" v-model="model">
      <el-button type="primary" @click="submit">Subscribe</el-button>
      <el-button type="reset">Reset</el-button>
    </form-schema>
  </el-card>
</template>

<script>
  import FormSchema from 'vue-json-schema'
  import { Option } from 'element-ui'


  FormSchema.setComponent('form', 'el-form', ({ vm }) => {
    // vm is the FormSchema VM

    const labelWidth = '120px'
    const model = vm.data
    const rules = {}

    vm.fields.forEach((field) => {
      const type = field.schemaType === 'array' && field.type === 'radio'
        ? 'string'
        : field.schemaType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type)
        ? 'change' : 'blur'

      // http://element.eleme.io/#/en-US/component/form#validation
      rules[field.name] = { type, required, message, trigger }
    })

    // returning the form props
    return { labelWidth, rules, model }
  })

  // http://element.eleme.io/#/en-US/component/form#validation
  FormSchema.setComponent('label', 'el-form-item', ({ field }) => ({
    prop: field.name
  }))

  FormSchema.setComponent('email', 'el-input')
  FormSchema.setComponent('text', 'el-input')
  FormSchema.setComponent('textarea', 'el-input')
  FormSchema.setComponent('checkbox', 'el-checkbox')
  FormSchema.setComponent('switch', 'el-switch')
  FormSchema.setComponent('radio', 'el-radio')
  FormSchema.setComponent('select', 'el-select')
  FormSchema.setComponent('pikaday','el-pikaday')

  // You can also use the component object
  FormSchema.setComponent('option', Option)

  // By default `<h1/>` is used to render the form title.
  // To override this, use the `title` type:
  FormSchema.setComponent('title', 'h2')

  // By default `<p/>` is used to render the form title.
  // To override this, use the `description` type:
  FormSchema.setComponent('description', 'small')

  // By default `<div/>` is used to render the message error.
  // To override this, use the `error` type:
  FormSchema.setComponent('error', 'el-alert', ({ vm }) => ({
    type: 'error',
    title: vm.error
  }))

  export default {
    data: () => ({
      schema: require('@/schema/kyc'),
      model: {}
    }),
    methods: {
      submit (e) {
        // this.$refs.formSchema.form() returns the ElementUI's form instance

        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            // this.model contains the valid data according your JSON Schema.
            // You can submit your model to the server here
            console.log(JSON.stringify(this.model))
            this.$refs.formSchema.clearErrorMessage()
          } else {
            this.$refs.formSchema.setErrorMessage('Please fill out the required fields')
            return false
          }
        })
      }
    },
    components: { FormSchema }
  }
</script>

<style>
  .form {
    text-align: left;
    width: 600px;
    margin: auto;
  }

  h2 {
    font-size: 1.7em;
    text-align: center;
    margin-top: 0;
    margin-bottom: .2em
  }

  h2 + small {
    display: block;
    text-align: center;
    margin-bottom: 1.2em
  }

  small {
    line-height: 20px;
    display: block;
  }

  .el-alert {
    margin-bottom: 15px
  }
</style>
