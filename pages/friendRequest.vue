<template>
	<view class="friend-request">
		<view class="list">
			<u-search placeholder="请输入好友的手机号码" v-model="friendNumber" @search="search()" @custom="search()"></u-search>
		</view>
		<view class="list" v-for="(item, index) in firendList">
			<view class="top">
				<view class="left">
					<img :src="item.User.upic" alt="">
				</view>
				<view class="center">
					<view class="line">
						<b style="font-size: 16px;">{{item.User.name}}</b>
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
					<button @tap="addFriend()">添加好友</button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>	

<script>
	export default {
		data() {
			return {
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				imgUrl: this.$store.state.imgUrl,
				memberTips:false,
				friendNumber:'',
				friendData:'',
				friendShow:false,
				firendList:'',
			}
		},
		created() {
		},
		onLoad() {
			this.getFriend()
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
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
			addFriend:function(){
				let that = this
				let data = {
					uID:that.friendData.uID,
					friend_id:that.$store.state.userInfo.uID
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Friend/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.$refs.uToast.show({
									title: '添加成功',
								})
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getFriend:function(){
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Friend/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.firendList = res.response.data
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
			},
			onShareTimeline(){},
		}
	}
</script>

<style lang="less">
	@import url('@/static/css/friendRequest.less');
</style>
