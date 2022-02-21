<template>
	<view class="zaixian">

		<view class="zf_btn" @click="pay">提交</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			pay(e) {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(Date.now()),
					nonceStr: res.nonceStr,
					package: res.package,
					signType: 'MD5',
					paySign: res.paySign,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});

			},
		}
	}
</script>

<style scoped lang="scss">

</style>
