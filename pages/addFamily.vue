<template>
	<view class="add-family">
		<view class="list">
			<view class="block">
				<img :src="userInfo.upic" alt="">
				<view class="font-top">{{userInfo.name}}</view>
				<view class="font-bottom">帐号：{{userInfo.uLoginName}}</view>
			</view>
			
		</view>
		<view class="list">
			<view class="block" style="background:#b7b4b4;">
				<img :src="imgUrl + '/icon/add.png'" alt="">
				<view class="font-top2">添加家人</view>
				<view class="font-bottom2">输入账号</view>
			</view>
		</view>
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
		}
	}
</script>
<style lang='less'>
	@import url('@/static/css/addFamily.less');
</style>
