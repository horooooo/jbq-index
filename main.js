import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import Req from 'static/js/request.js'

Vue.prototype.$req = Req;
Vue.prototype.$store = store
Vue.config.productionTip = false

Vue.use(uView);

App.mpType = 'app'

global.countMin = function() {
	let time = setInterval(global.addUserDate, 60000);
}
global.addUserDate = function addUserDate() {
	let that = this
	let data = {
		uID: store.state.userInfo.uID,
		udate: 1,
	}
	let header = {
		'content-type': 'application/json',
		'Authorization': 'Bearer ' + store.state.token
	}
	uni.request({
	    method: 'Get',
	    url: 'https://api.jbqjykj.com/api/User/Adddate',
	    data: data,
	    header: header,
	    success: function(result) {
	        // resolve调用后，即可传递到调用方使用then或者async+await同步方式进行处理逻辑
	    },
	    fail: function(e) {
	        console.log('error in...')
	        // reject调用后，即可传递到调用方使用catch或者async+await同步方式进行处理逻辑
	        reject(e)
	    },
	})
}
const app = new Vue({
	...App,
	store,
})
app.$mount()
