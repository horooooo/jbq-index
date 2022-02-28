<template>
	<view class="link_web">
		<web-view src="https://www.baidu.com/"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				userInfo:this.$store.state.userInfo,
				url:'',
			}
		},
		created() {
		},
		onLoad(option) {
			this.url = option.url
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			onShareAppMessage(){
			},
			onShareTimeline(){},
		}
	}
</script>

<style>
</style>
