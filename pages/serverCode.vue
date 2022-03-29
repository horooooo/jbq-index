<template>
	<view class="serverCode">
		<h1>微信客服</h1>
		<div style="text-align: center;">
			<img :src="imgUrl + '/serverCode.jpg'" alt="">
		</div>
		<br>
		<div style="text-align: center;">
			手机号码：19922460538
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				userInfo:this.$store.state.userInfo,
			}
		},
		created() {},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		onLoad() {
		},
		methods: {
			onShareAppMessage(){
			},
			onShareTimeline(){},
		}
	}
</script>

<style lang="less" scoped>
	.serverCode{
		h1{
			margin: 10px 0;
			text-align: center;
		}
	}
</style>
