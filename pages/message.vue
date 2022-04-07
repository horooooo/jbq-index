<template>
	<view class="message">
		<view class="list">
			<view class="left"><span></span></view>
			<view class="center">新消息通知</view>
			<view class="right"><button>操作</button></view>
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
			onShareTimeline(){},
		}
	}
</script>

<style lang="less" scoped>
	.message{
		.list{
			height: 42px;
			border-bottom: 1px solid #e7e7e7;
			.left, .center, .right{
				display: inline-block;
				height: 100%;
				line-height: 42px;
				font-size: 12px;
			}
			.left{
				width: 15%;
				span{
					display: inline-block;
					width: 11px;
					height: 11px;
					border-radius: 50%;
					background: #f1e3b9;
					margin: 0 1.5rem;
				}
			}
			.center{
				width: 60%;
			}
			.right{
				width: 25%;
			}
		}
	}
</style>
