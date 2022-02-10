<template>
	<view class="personal-data">
		<view class="module">
			<view class="list title">关系：</view>
			<view class="list input"><input type="text" v-model="setData.Tags"></view>
			<view class="list title">姓名：</view>
			<view class="list input"><input type="text" v-model="setData.name"></view>
			<view class="list title">性别：</view>
			<view class="list input"><input type="text" v-model="sex"></view>
			<view class="list title">年龄：</view>
			<view class="list input"><input type="text" v-model="setData.age"></view>
			<view class="list title">年级：</view>
			<u-select v-model="show" :list="selector" @confirm="confirm"></u-select>
			<view class="list input"><input type="text" v-model="setData.groupName"  @click="show = true"></view>
			<view class="list title">学校名称：</view>
			<view class="list input"><input type="text" v-model="setData.uschool"></view>
			<view class="list title">所在城市：</view>
			<view class="list input"><input type="text" v-model="setData.pname"></view>
			<view class="list title">收货地址：</view>
			<view class="list input"><input type="text" v-model="setData.addr"></view>
			<view class="list">
				<view class="button">
					<view><button>取消</button></view>
					<view><button style="background: #54c2fc;" @tap="setUserData()">确定</button></view>
				</view>
			</view>
		</view>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				setData: {
					Tags: '',
					name: '',
					sex: '',
					age: '',
					groupname: '',
					uschool: '',
					pname: '',
					addr: '',
					upic: this.$store.state.userInfo.upic,
					UID: this.$store.state.userInfo.uID
				},
				sex: '',
				show: false,
				selector: [],
				userInfo:this.$store.state.userInfo,
				gradeList:[],
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		components: {
			jiangli,
		},
		created() {},
		onLoad() {
			this.getGrade()
			console.log(this.userInfo)
		},
		methods: {
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			setUserData: function() {
				let that = this
				if (this.sex.indexOf('男') != -1) {
					this.setData.sex = 1
				} else if (this.sex.indexOf('女') != -1) {
					this.setData.sex = 2
				} else {
					uni.showToast({
						title: "请正确填写性别",
						icon: "none"
					});
					return false
				}
				let data = this.setData
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Put', '/user/Put', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "修改成功",
									icon: "none"
								});
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
								this.getUserData()
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getUserData: function() {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/user/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								let list = res.response.data
								for(let index in list){
									if(list[index].uLoginName == this.userInfo.uLoginName){
										that.$store.commit('pushUserInfo', list[index])
									}
								}
								this.setData.Tags = this.$store.state.userInfo.Tags
								this.setData.name = this.$store.state.userInfo.name
								this.setData.sex = this.$store.state.userInfo.sex
								this.setData.age = this.$store.state.userInfo.age
								this.setData.uschool = this.$store.state.userInfo.uschool
								this.setData.addr = this.$store.state.userInfo.addr
								this.setData.pname = this.$store.state.userInfo.pname
								this.setData.groupname = this.$store.state.userInfo.groupname
								this.sex = this.$store.state.userInfo.sex == 1 ? '男' : '女'
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getGrade: function() {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Grade/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								let list = res.response.data
								this.gradeList = res.response.data
								for(let index in list){
									let params = {
										label:list[index].name,
										Id:list[index].Id,
									}
									this.selector.push(params)
								}
								this.getUserData()
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			confirm:function(e){
				this.setData.groupName = e[0].label
			},
			onShareAppMessage(){
			},
		}
	}
</script>

<style lang='less'>
	@import url('@/static/css/personalData.less');
</style>
