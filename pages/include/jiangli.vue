<template>
	<view class="jiangli">
		<u-mask :show="showCurrency" @click="showCurrency = false">
			<view class="popCurrency" >
				<view class="content">
					<image :src="imgUrl + '/shopping/jl.png'"  @tap.stop  class="ava" mode=""></image>
					<view class="qb qb1" @tap.stop> <b>+{{CurrencyMoney}}</b> 牛盾币</view>
					<view class="qb qb2" @tap.stop> <b>+{{CurrencyJifen}}</b> 积分</view>
					<u-button class="btn" :custom-style="popCurrencyBtn" shape="circle" @click="showCurrency = false">领取</u-button>
				</view>
				<u-icon name="close" color="#ffffff" size="50" @click="showShare = false" class="close"></u-icon>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		props: ['CurrencyMoney','CurrencyJifen'],
		data() {
			return {
				showCurrency: false,
				// 弹出层-牛盾币 按钮样式
				popCurrencyBtn:{
					width:'450rpx',
					height: '100rpx',
					border: '0',
					color: '#711804',
					fontWeight: '700',
					fontSize: '46rpx',
					zIndex: '3',
					background: 'rgba(255,255,255,0)',
				},
				imgUrl: this.$store.state.imgUrl,
			}
		},
		created() {},
		onLoad() {

		},
		methods: {
			showCurrencyClick:function(a,b){
				this.showCurrency = true
			}
		}
	}
</script>

<style lang="less">
	/* 弹出层牛盾币 */
	.popCurrency{
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		.content{
			width: 100%;
			position: absolute;
			top: 20%;
			left: 0;
			.ava{
				display: block;
				width: 750rpx;
				height:848rpx;
				margin: auto;
				position: relative;
				z-index: 2;
			}
			.qb{
				position: absolute;
				width: 440rpx;
				left:165rpx;
				font-size: 25rpx;
				color: #e96332;
				font-weight: 700;
				text-align: center;
				z-index: 12;
				display: flex;
				justify-content: center;
				align-items: baseline;
				b{
					font-size: 50rpx;
					margin-right: 10rpx;
					color: #e96332;
					z-index: 99999;
					margin-left: -45rpx;
				}
			}
			.qb1{
				top:475rpx;
			}
			.qb2{
				top:558rpx;
			}
			.btn{
				width: 450rpx;
				height: 100rpx;
				border: 0;
				position: absolute;
				bottom:20rpx;
				left: 50%;
				margin-left: -220rpx;
				color: #711804;
				font-weight: 700;
				font-size: 46rpx;
				z-index: 3;
				background: rgba(255,255,255,0);
			}
			
		}
		
		.close {
			position: absolute;
			left: 50%;
			margin-left:-25rpx ;
			top: 1200rpx;
			border: 2px #FFFFFF solid;
			border-radius: 50%;
			text-align: center;
			line-height: 50rpx;
		}
	}
</style>
