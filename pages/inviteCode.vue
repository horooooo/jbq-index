<template>
	<view class="invite-code">
		<view class="header">
			<img :src="userInfo.upic" alt="">
		</view>
		<view class="content">
			<view class="module">
				<view class="show-code">
					邀请码：JBQ{{userInfo.uID}}
				</view>
				<view class="input-code" v-if="userInfo.ufid == 0">
					<u-input v-model="code" placeholder="请输入他人邀请码" border="surround" @change="change"></u-input>
				</view>
				<view class="input-code" v-else>
					<u-input v-model="code" border="surround" @change="change"></u-input>
				</view>
				<u-button type="primary" text="确定" @click="getActivity()">绑定</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				userInfo: this.$store.state.userInfo,
				code:'JBQ',
			}
		},
		created() {
			if(this.userInfo.ufid){
				this.code += this.userInfo.ufid
			}
		},
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
			getActivity:function(){
				let that = this
				let data = {
					code:this.code
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/user/BangUfid', data, header).then(
						res => {
							// 获得数据
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
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

<style lang='less'>
	@import url('@/static/css/inviteCode.less');
</style>