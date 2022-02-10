<template>
	<view class="gift">
		<!-- 打赏popup -->
		<u-popup class="gift-popup" v-model="giftShow" mode="bottom" border-radius="14" height="330px">
			<!-- <view class="close" @tap="giftShow = false"><img src="/icon/down.png" alt=""></view> -->
			<view class="module">
				<view @tap="giftIndex = index" :class="{'active': index == giftIndex}"
					v-for="(item, index) in giftList" :key="index"><img :src="item" alt=""></view>
			</view>
			<view class="btn"><button @tap="sendGift()">打赏</button></view>
		</u-popup>
		<!-- 打赏动画popup -->
		<view class="gift-animation" v-if="giftAnimationShow">
			<view class="head-img">
				<img :src="headUrl" alt="">
			</view>
			<view class="gift-font">
				<span>赠送玫瑰一个</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftShow:false,
				giftAnimationShow:false,
				giftList: [this.$store.state.imgUrl + '/liwu1.png', this.$store.state.imgUrl + '/liwu1.png', this.$store.state.imgUrl + '/liwu1.png',
					this.$store.state.imgUrl + '/liwu1.png', this.$store.state.imgUrl + '/liwu1.png', this.$store.state.imgUrl + '/liwu1.png',
					this.$store.state.imgUrl + '/liwu1.png'
				],
				giftIndex: 0,
			}
		},
		created(){	
		},
		onLoad() {
			
		},
		methods: { 
			sendGift: function() {
				this.giftShow = false
				this.giftAnimationShow = true
				let that = this
				setTimeout(function() {
					that.giftAnimationShow = false
				}, 3000);
			},
		}
	}
</script>

<style lang='less'>
	.gift{
		.gift-popup{
			position: fixed;
			width: 100%;
			height: 330px;
			border-top-right-radius: 15px;
			border-top-left-radius: 15px;
			border:1px solid #e9e9e9;
			background: #FFFFFF;
			left: 0;
			bottom: -330px;
			padding-top: 10px;
			.module{
				width: 90%;
				margin-left: 5%;
				float: left;
				text-align: center;
				height: 240px;
				view{
					width: 23%;
					height: 60px;
					float: left;
					border: 3px solid #FFFFFF;
					margin-top: 15px;
					display: flex;
					justify-content: center;
					align-items: center;
					img{
						height: 50px;
						width: 50px;
					}
				}
				.active{
					border: 3px solid #54c1fc!important;
				}
			}
			.btn{
				width: 100%;
				float: left;
				text-align: center;
				button{
					width: 171px;
					height: 33px;
					border:none;
					border-radius: 8px;
					background: #54c1fc;
					line-height: 33px;
					text-align: center;
					color: #FFFFFF;
					font-size: 14px;
				}
			}
			.close{
				width: 100%;
				float: left;
				position: relative;
				height: 40px;
				img{
					position: absolute;
					right: 20px;
					top: 8px;
					width: 30px;
					height: 30px;
				}
			}
		}
		.gift-animation{
			position: fixed;
			min-width: 142px;
			height: 40px;
			background: #fa004b;
			left: 30px;
			bottom: 50px;
			border-top-right-radius: 50px;
			border-top-left-radius: 50px;
			border-bottom-right-radius: 50px;
			border-bottom-left-radius: 50px;
			.head-img{
				float: left;
				img{
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
			}
			.gift-font{
				float: left;
				color: #FFFFFF;
				font-size: 12px;
				line-height: 40px;
				margin-left: 10px;
			}
		}
	}
</style>
