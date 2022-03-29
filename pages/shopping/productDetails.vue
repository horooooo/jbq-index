<!-- 商城详情 -->
<template>
	<view class="productDetails">
		<!-- 产品轮播图 -->
		<view class="wrap">
			<u-swiper :list="list" indicator-pos="bottomCenter" mode="number" height="560"></u-swiper>
		</view>
		<h2>¥ <span>{{goodData.price}}</span>金盾</h2>
		<h3>{{goodData.name}}</h3>
		<view class="price">
			<p>购买数量</p>
			<u-number-box v-model="number" @change="valChange" class="num"></u-number-box>
		</view>
		<view class="text">
			<view class="t">图文详情</view>
		</view>
		<!-- 内容图片 -->
		<view class="pic">
			<view v-html="goodData.memo"></view>
		</view>
		<!-- 回到顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<!-- 底部按钮 -->
		<view class="bottom_">
			<u-icon name="kefu-ermai" color="#8d8d8d" size="60" class="l"></u-icon>
			<navigator url="/pages/shopping/shoppingCart" open-type="navigate">
				<u-icon name="shopping-cart" color="#8d8d8d" size="60" style="margin-left: 12px;" class="l"></u-icon>
			</navigator>
			<!-- <u-button  :custom-style="bottom_btn2"  type="warning" shape="circle" @click="buy">立即购买</u-button> -->
			<u-button :custom-style="bottom_btn1" type="error" shape="circle" @click="joinCart">加入购物车</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				// 搜索
				search: '',
				// 产品轮播图
				list: [{
					image: this.$store.state.imgUrl + '/shopping/pd.jpg',
					title: ''
				}],
				// 回到顶部
				scrollTop: 0,
				// 存储添加的数量
				number: 1,
				// 按钮样式2
				bottom_btn1: {
					color: '#FFFFFF',
					border: '0',
					height: '30px',
					lineHeight: '30px',
					padding: '0 10px',
					display: 'inline-block',
					float: 'right',
					background: '#ff7c64',
					marginRight: '10px'

				},
				// 按钮样式2
				bottom_btn2: {
					color: '#FFFFFF',
					border: '0',
					height: '30px',
					lineHeight: '30px',
					padding: '0 10px',
					display: 'inline-block',
					float: 'right',
					background: '#e8ce10'
				},
				goodData: {},
			}
		},
		created() {

		},
		onLoad(option) {
			this.getGoods(option.id)
			this.productId = option.id
		},
		methods: {
			// 点击搜索跳转
			gotoNew() {

				this.$u.route({
					url: 'pages/shopping/searchList',
					params: {
						name: 'lisa'
					}
				})

			},
			// 添加的数值
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			// 回到顶部
			onPageScroll(e) {
				this.number = e.value
			},
			// 购买
			buy() {
				console.log(this.number)

			},
			// 加入购物车
			joinCart() {
				let that = this;
				let data = {
					order_id: 0,
					product_id: this.goodData.Id,
					name: this.goodData.name,
					price: this.goodData.price,
					nums: this.number,
					product_id: this.goodData.Id,
					amount: this.goodData.price * this.number,
					point: 0,
					addon: this.goodData.img_default,
					type_id: this.$store.state.userInfo.uID
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Sp_order_items/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								that.$refs.uToast.show({
									title: '添加成功',
									type: 'success',
								})
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getGoods: function(id) {
				let that = this;
				let data = {}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Sp_goods/Get/' + id, data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.goodData = res.response
								this.list[0].image = this.goodData.img_default
							}
						})
					.catch(res => {
						console.log(res);
					});
			}
		},

	}
</script>

<style lang="less">
	.clear {
		clear: both;
		content: "";
		display: block;
	}

	.productDetails {
		padding: 20px 0 50px;

		.wrap {

			padding: 0 20px;
		}

		h2 {
			font-size: 14px;
			color: #e8ce10;
			font-weight: 700;
			margin: 12px 0 0;
			padding: 0 20px;

			span {
				font-size: 18px;
				font-weight: 700;
			}
		}

		h3 {
			font-size: 14px;
			color: #33333;
			font-weight: 700;
			margin: 10px 0 0;
			padding: 0 20px;
		}

		.price {
			margin: 10px 0 0;
			padding: 10px 20px;
			border-top: 2px #f2f2f2 solid;
			border-bottom: 2px #f2f2f2 solid;

			p {
				float: left;
				font-size: 14px;
				color: #333333;
			}

			.num {
				float: right;

			}

			&::after {
				.clear
			}

		}

		.text {
			padding: 0 20px;
			margin: 15px 0 0;

			.t {
				display: block;
				width: 70px;
				font-size: 16px;
				color: #333333;
				padding: 5px 0;
				position: relative;
				text-align: center;

				&::after {
					content: "";
					display: block;
					position: absolute;
					width: 60px;
					height: 2px;
					background: #ffc6bb;
					bottom: 0;
					left: 50%;
					margin-left: -30px;
				}
			}

		}

		.pic {
			width: 100%;
			box-sizing: border-box;
			padding: 0 20px;
			margin: 20px 0 0;

			.img {
				border-radius: 30rpx;
				width: 100%;

			}
		}

		.bottom_ {
			height: 50px;
			padding: 10px 20px;
			box-sizing: border-box;
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #FFFFFF;

			.l {
				float: left;
			}

			.btn1,
			.btn2 {
				color: #FFFFFF;
				border: 0;
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				display: inline-block;
				float: right;
			}

			.btn1 {
				background: #ff7c64;
				margin-right: 10px;
			}

			.btn2 {
				background: #e8ce10;
			}
		}

	}
</style>
