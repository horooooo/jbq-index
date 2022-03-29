import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { localStorage } from 'mp-storage'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		userInfo:'',
		loginIs:false,
		rootUrl:'http://www.jbqjykj.com',
		apiUrl:'https://api.jbqjykj.com/',
		imgUrl:'http://www.jbqjykj.com/wx-app/images',
		signDate:'',
		token:'',
		openId:'',
		shareCode:'',
		money1:'', // 牛盾币
		money2:'', // 银盾币
		money3:'', // 金盾币
		isvip:false,
		switch:false,
	},
	plugins: [createPersistedState({storage: localStorage})],
    mutations: {
		pushUserInfo(state,e){
		    state.userInfo = e
		},
		pushLoginIs(state,e){
		    state.loginIs = e
		},
		pushSignDate(state,e){
		    state.signDate = e
		},
		pushToken(state,e){
		    state.token = e
		},
		pushOpenid(state,e){
		    state.openId = e
		},
		pushShareCode(state,e){
		    state.shareCode = e
		},
		pushMoney1(state,e){
		    state.money1 = e
		},
		pushMoney2(state,e){
		    state.money2 = e
		},
		pushMoney3(state,e){
		    state.money3 = e
		},
		pushIsVip(state,e){
		    state.isvip = e
		},
		pushSwitch(state,e){
		    state.switch = e
		},
	},
    actions: {
		
	}
})

export default store