<template>
	<view class="friend-request">
		<view class="list">
			<u-search placeholder="请输入家人的手机号码" v-model="friendNumber" @search="search()" @custom="search()"></u-search>
		</view>
		<view class="list" v-for="(item, index) in familyList">
			<view class="top">
				<view class="left">
					<img :src="item.FamUser.upic" alt="">
				</view>
				<view class="center">
					<view class="line">
						<b style="font-size: 16px;">{{item.FamUser.name}}</b>
						<br>
						<span>帐号：{{item.FamUser.uLoginName}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-show="friendShow">
			<view class="top">
				<view class="left">
					<img :src="friendData.upic" alt="">
				</view>
				<view class="center">
					<view class="line">
						<b style="font-size: 16px;">{{friendData.name}}</b>
						<br>
						<span>帐号：{{friendData.uLoginName}}</span>
					</view>
				</view>
				<view class="right">
					<button @tap="addFamily()">添加家人</button>
				</view>
			</view>
		</view>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
		<u-toast ref="uToast" />
	</view>
</template>	

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				imgUrl: this.$store.state.imgUrl,
				memberTips:false,
				friendNumber:'',
				friendData:'',
				friendShow:false,
				familyList:'',
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		components: {
			jiangli,
		},
		created() {
		},
		onLoad() {
			this.getFamily()
		},
		methods: {
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			search:function(){
				let that = this
				let data = {
					page:1,
					key:that.friendNumber,
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/user/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								that.friendData = res.response.data[0]
								if(res.response.data.length >= 1){
									that.friendShow = true
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			addFamily:function(){
				let that = this
				let data = {
					uID:that.friendData.uID,
					fuid:that.$store.state.userInfo.uID
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Family/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.$refs.uToast.show({
									title: '添加成功',
								})
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getFamily:function(){
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Family/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.familyList = res.response.data
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getActivity:function(id){
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/CZConfig/get/'+id, data, header).then(
						res => {
							// 获得数据
							if(res.msg == '获取成功'){
								let data = JSON.parse(res.response)
								this.CurrencyMoney = data.jinbi
								this.CurrencyJifen = data.jifen
								this.showCurrencyClick()
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
			},
		}
	}
</script>

<style lang="less">
	@import url('@/static/css/friendRequest.less');
</style>
