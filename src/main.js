import Vue from 'vue'
import router from './router'
import App from './App.vue'
import flexible from './assets/libs/flexible.js'

//funs 在resource中已引入
// import './utils/funs'

import './utils/filter'
import './utils/resource'
import './assets/css/reset.css'
import './assets/css/style.css'

// Vue.config.errorHandler = function (err, vm) {
// 	console.log(JSON.stringify(err));
// }

// window.addEventListener('error', function (e) {
//   alert(`${e.filename}\n${e.lineno}\n${e.message}`);
// }, false);  

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


