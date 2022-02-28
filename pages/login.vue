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
				<button class='bottom' type="primary" open-type="getPhoneNumber"
					@getphonenumber="decryptPhoneNumber">手机号一键登录</button>
				<!-- <button @tap="getUserProfile()">授权头像昵称</button> -->
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
			uni.login({
				provider: 'weixin',
				success: (res) => {
					if (res.errMsg == "login:ok") {
						this.code = res.code;
						this.getJscode2session(res.code)
						// uni.request({
						// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
						// 	method: 'GET',
						// 	data: {
						// 		appid: 'wx6e9ca026d2282c04', //你的小程序的APPID
						// 		secret: 'fb1cb15fb14308a2b42f481bea2d5ab0', //你的小程序秘钥secret,  
						// 		js_code: this.code, //wx.login 登录成功后的code
						// 	},
						// 	success: (res) => {
						// 		// console.log('获取信息', res); // 换取成功后 暂存这些数据 留作后续操作
						// 		this.openid = res.data.openid //openid 用户唯一标识
						// 		this.unionid = res.data.unionid //openid 用户唯一标识
						// 		this.session_key = res.data.session_key //session_key  会话密钥
						// 	}
						// });
					} else {
						uni.showToast({
							title: '系统异常，请联系管理员!'
						})
					}
				}
			})
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
										uni.switchTab({
											url: '/pages/tabs/index',
										});
									}
								})
							.catch(res => {
								console.log(res);
							});
					}
				})
			},
			//获取用户的当前设置
			getSetting() {
				return new Promise(function(resolve, reject) {
					uni.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								// console.log('存在');
								resolve(true);
							} else {
								// console.log('不存在');
								resolve(false);
							}
						}
					})
				}).catch((e) => {
					console.log(e)
				});;
			},
			decryptPhoneNumber(e) {
				var WXBizDataCrypt = require('@/static/js/WXBizDataCrypt')
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					// console.log("用户点击了接受")
					let encryptedData = e.detail.encryptedData
					let errMsg = e.detail.errMsg
					let iv = e.detail.iv
					let pc = new WXBizDataCrypt('wx6e9ca026d2282c04', this.session_key);
					let data = pc.decryptData(encryptedData, iv);
					this.login(data)
				} else {
					this.getUserProfile()
					console.log("用户点击了拒绝")
				}
			},
			login(e) {
				let that = this
				let data = {
					openid: that.openid,
					unionid: that.unionid,
					mobile: e.phoneNumber,
					uFid: 0
				};
				that.$req.doRequest('GET', '/Login/jwttokencode', data).then(
						res => {
							// 获得数据
							if (res.success) {
								that.$refs.uToast.show({
									title: '登录成功',
									type: 'success',
								})

								let userInfo = JSON.parse(res.response)
								console.log(userInfo)
								userInfo.enddt = this.FormatToDate(userInfo.enddt)
								that.$store.commit('pushLoginIs', true)
								that.$store.commit('pushMoney1', userInfo.umoney)
								that.$store.commit('pushMoney3', userInfo.unum)
								that.$store.commit('pushIsVip', userInfo.isvip)
								that.$store.commit('pushToken', userInfo.token)
								that.$store.commit('pushUserInfo', userInfo)
								if (!userInfo.name || !userInfo.upic) {
									uni.reLaunch({
										url: '/pages/userProfile',
									});
								} else {
									uni.switchTab({
										url: '/pages/tabs/index',
									});
								}
							} else {
								uni.showToast({
									title: '授权登录失败！',
									mask: true,
									icon: 'none'
								})
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getJscode2session: function(code) {
				let that = this
				let data = {
					code: code,
				};
				that.$req.doRequest('GET', '/Login/GetWeiXin', data).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.openid = res.response.openid //openid 用户唯一标识
								this.unionid = res.response.unionid //openid 用户唯一标识
								this.session_key = res.response.session_key //session_key  会话密钥
								that.$store.commit('pushOpenid', res.response.openid)
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			FormatToDate: function(val) {
				if (val != null) {
				    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
				    //月份为0-11，所以+1，月份小于10时补个0
				    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				    return date.getFullYear() + "-" + month + "-" + currentDate;
				}
				return "";
			},
			onShareAppMessage(){
			},
			onShareTimeline(){},
		}
	}
</script>

<style lang="less">
	@import url('@/static/css/login.less');
</style>
