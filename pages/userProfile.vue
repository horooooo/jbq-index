<template>
	<view class="login">
		<view>
			<view>
				<view class='header'>
					<image :src="imgUrl + '/icon/wx_login.png'"></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button @tap="getUserProfile()">授权头像昵称</button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				code: '',
				openid: '',
				unionid: '',
				session_key: '',
			}
		},
		created() {},
		onLoad() {
			
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			getUserProfile: function() {
				let userInfo = ''
				let that = this
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				uni.getUserProfile({
					desc: "获取个人信息",
					success: (res) => {
						userInfo = res.userInfo
						let data = {
							name: userInfo.nickName,
							upic: userInfo.avatarUrl,
							uID: that.$store.state.userInfo.uID
						}
						that.$req.doRequest('Put', '/user/Put', data, header).then(
								res => {
									// 获得数据
									if (res.status == 200) {
										uni.showToast({
											title: '请重新登录初始化用户信息',
											icon: "none"
										});
										uni.reLaunch({
											url: '/pages/login',
										});
									}
								})
							.catch(res => {
								console.log(res);
							});
					}
				})
			},
			onShareAppMessage(){
			},
		}
	}
</script>

<style lang="less">
	@import url('@/static/css/login.less');
</style>
