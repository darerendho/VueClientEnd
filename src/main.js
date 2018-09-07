// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import pikaday from 'pikaday'
import moment from 'moment'

Vue.use(ElementUI, { locale },pikaday,moment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data() {
    return {data:null}
  },
  el: '#app',
  template: '<App/>',
  components: { App }
})
