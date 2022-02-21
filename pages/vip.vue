<template>
	<view class="vip">
		<view class="title">
			会员VIP
		</view>
		<view class="tip" v-if="isvip">
			尊敬的会员，您的会员到期日：{{userInfo.enddt}}
		</view>
		<view class="module">
			<view class="list" @tap="vipIndex = 1" :class="{'active':vipIndex == 1}">
				<view class="card">
					<view class="hot">限时充值</view>
					<view class="tip a">赠一个月会员</view>
					<view class="money a">￥<span>66</span></view>
					<view class="date a">一个月</view>
				</view>
			</view>
			<view class="list" @tap="vipIndex = 2" :class="{'active':vipIndex == 2}">
				<view class="card">
					<view class="hot">赠送三个月会员</view>
					<view class="tip a">赠50元代金券</view>
					<view class="money a">￥<span>199.8</span></view>
					<view class="date a">三个月</view>
				</view>
			</view>
			<view class="list" @tap="vipIndex = 3" :class="{'active':vipIndex == 3}">
				<view class="card">
					<view class="hot">赠送六个月会员</view>
					<view class="tip a">赠100元代金券</view>
					<view class="money a">￥<span>399.6</span></view>
					<view class="date a">六个月</view>
				</view>
			</view>
			<view class="list" @tap="vipIndex = 4" :class="{'active':vipIndex == 4}">
				<view class="card">
					<view class="hot">SVIP</view>
					<view class="tip a">200元代金券</view>
					<view class="money a">￥<span>666</span></view>
					<view class="date a">永久</view>
				</view>
			</view>
			<!-- <view class="list" @tap="vipIndex = 5" :class="{'active':vipIndex == 5}">
				<view class="card">
					<view class="hot">测试</view>
					<view class="tip a">200元代金券</view>
					<view class="money a">￥<span>0.01</span></view>
					<view class="date a">测试</view>
				</view>
			</view> -->
		</view>
		<view class="tips">
			会员到期前一天自动续费一个月，可随时关闭
		</view>
		<!-- <view class="tips">
			请扫码二维码付费，付费后请保存付款记录联系工作人员
		</view>
		<view class="img" style="text-align: center;">
			<image :src="imgUrl + '/payCode.jpg'"></image>
		</view>
		<view class="img" style="text-align: center;">
			<image :src="imgUrl + '/wx_code.jpg'"></image>
		</view> -->
		<view class="button">
			<button @tap="vipPay()">立即充值</button>
		</view>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				vipIndex:1,
				userInfo:this.$store.state.userInfo,
				isvip:this.$store.state.isvip,
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		created() {
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
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			vipPay: function() {
				let that = this
				let data = {
					
				}
				switch(this.vipIndex) {
				     case 1:
				        data.Body = '1个月'
						data.TotalFee = 66.00 * 100
				        break;
				     case 2:
				        data.Body = '3个月'
						data.TotalFee = 199.80 * 100
				        break;
				     case 3:
				        data.Body = '6个月'
						data.TotalFee = 399.60 * 100
				        break;
				     case 4:
				        data.Body = '永久'
						data.TotalFee = 666.00 * 100
				        break;
				     case 5:
				        data.Body = '1天测试'
						data.TotalFee = 0.01 * 100
				        break;
				}
				data.OpenId = this.$store.state.openId
				data.notify = 'https://api.jbqjykj.com'
				data.OutTradeNo = 'ddd'
				data.TradeType = 'JSAPI'
				data.NotifyUrl = 'https://api.jbqjykj.com/wechatpay/notify/unifiedorder'
				data.SpBillCreateIp = '127.0.0.1'
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/WeChatPay/PubPay', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								let e = JSON.parse(res.response)
								console.log(e)
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: e.timeStamp,
								    nonceStr: e.nonceStr,
								    package: e.package,
								    signType: e.signType,
								    paySign: e.paySign,
								    success: function (res) {
										if(res.errMsg == 'requestPayment:ok'){
											this.$refs.uToast.show({
												title: '支付成功',
											})
											that.$store.commit('pushIsVip', true)
											if(res.response){
												let data = JSON.parse(res.response)
												this.CurrencyMoney = data.jinbi
												this.CurrencyJifen = data.jifen
												this.showCurrencyClick()
											}
										}
								    },
								    fail: function (err) {
								        console.log('fail:' + JSON.stringify(err));
								    }
								});
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
	@import url('@/static/css/vip.less');
</style>
