<!-- 商城 -->
<template>
	<view class="sign">
		<!-- <view class="title">商城</view> -->
		<!-- 搜索 -->
		<!-- <view class="search">
			<u-row >
				<u-col span="10">
					<u-search shape="square" :show-action="false" placeholder="搜索" v-model="search" @search="gotoNew">
					</u-search>
				</u-col>
				<u-col span="1">
					<view class="cart" @click="shoppingCart">
						<image :src="imgUrl + '/shopping/cart.png'" class="cart_img"  mode=""></image>
						<p>12</p>
					</view>
				</u-col>
			</u-row>
		</view> -->

		<!-- 轮播图 -->
		<!-- <view class="focusMap">
			<swiper :indicator-dots='false' :loop='false' :vertical = 'false' :autoplay = 'false' :display-multiple-items='3' next-margin='150rpx' class="image_group">
			    <view  v-for="(item,index) in list" >
			      <swiper-item style="width: 105rpx;">
			        <view class='swiper_item list'>
			         <image :src="item.url" class="t_img" mode=""></image>
			         <p>{{item.name}}</p>
			        </view>
			      </swiper-item>
			    </view>
			 </swiper>
		</view> -->

		<!-- 推荐 -->
		<view class="recommend">
			<view class="title">推荐</view>
			<view class="content">
				<u-waterfall v-model="flowList">
					<template v-slot:left="{leftList}">
						<view class="boxlist" v-for="(item, index) in leftList" :key="index" @click="gotopd(item.Id)">
							<image :src="item.img_default" class="img"
								mode="widthFix"></image>
							<view class="txt">
								<h2>{{item.name}}</h2>
								<h3>{{item.spec}}</h3>
								<view class="rmb">￥ <span>{{item.price}}</span>牛盾</view>
								<!-- <p>89人评价很好用</p> -->
								<!-- <view class="pay">900人付款</view> -->
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="boxlist" v-for="(item, index) in rightList" :key="index" @click="gotopd(item.Id)">
							<image :src="item.img_default" class="img"
								mode="widthFix"></image>
							<view class="txt">
								<h2>{{item.name}}</h2>
								<h3>{{item.spec}}</h3>
								<view class="rmb">￥ <span>{{item.price}}</span>牛盾</view>
								<!-- <p>89人评价很好用</p> -->
								<!-- <view class="pay">900人付款</view> -->
							</view>
						</view>
					</template>
				</u-waterfall>

			</view>
		</view>
	</view>
</template>

<script>
	import Swiper from "swiper";
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				// 搜索
				search: '',
				// 轮播图
				list: [{
						name: '书籍',
						url: '../../static/images/shopping/shuji.png'
					},
					{
						name: '文件夹',
						url: '../../static/images/shopping/shuji.png'
					},
					{
						name: '每日计划表',
						url: '../../static/images/shopping/shuji.png'
					},
					{
						name: '第四个',
						url: '../../static/images/shopping/shuji.png'
					},
					{
						name: '第五个',
						url: '../../static/images/shopping/shuji.png'
					},
					{
						name: '第六个',
						url: '../../static/images/shopping/shuji.png'
					}
				],
				// 推荐
				flowList: [],
			}
		},
		created() {

		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			// 点击搜索( 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发)
			gotoNew() {
				this.$u.route({
					url: 'pages/shopping/mallSearch',
					params: {
						name: this.search
					}
				})
			},
			// 购物车弹窗
			shoppingCart() {

				this.$u.route({
					url: 'pages/shopping/shoppingCart',
				})

			},
			// 跳转到内页
			gotopd(id) {
				this.$u.route({
					url: 'pages/shopping/productDetails?id='+id,
				})

			},
			getGoods: function() {
				let that = this;
				let data = {}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Sp_goods/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.flowList = res.response.data
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

	.sign {
		padding: 20rpx 40rpx;

		.title {
			font-size: 36rpx;
			color: #333333;
			font-weight: 700;
		}

		// 搜索
		.search {
			margin: 20rpx 0 0;
			position: relative;

			.u-content {
				width: 100%;
				box-sizing: border-box;
			}

			.cart {
				position: relative;

				.cart_img {
					display: block;
					width: 60rpx;
					height: 60rpx;

				}

				p {
					position: absolute;
					top: 0;
					right: 0;
					font-size: 24rpx;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #ffffff;
					background: #ff0000;
					border-radius: 50%;
					text-align: center;
				}
			}

		}

		// 轮播
		.focusMap {
			padding: 15px 0;
			width: 100%;
			overflow: auto;
			border-bottom: 1px #f4f4f4 solid;


			.image_group {
				position: relative;
				margin-left: 10rpx;
				height: 150rpx;
			}

			.swiper_item {
				width: 100%;
				// height: 150rpx;
				overflow: hidden;
			}

			.list {

				.t_img {

					width: 104rpx;
					height: 104rpx;
					display: block;
					margin: auto;
				}

				p {
					font-size: 24rpx;
					color: #333333;
					text-align: center;
					margin: 5rpx 0 0;
				}

			}


		}


		// 推荐
		.recommend {
			padding: 20px 0;

			.content {
				margin: 20px 0 0;

				.boxlist {
					width: 92%;
					position: relative;
					border-radius: 5px;
					padding: 0 0 10px;
					box-shadow: 0 0 5px #dddddd;
					transition: .5s;
					margin: 0 auto 15px;

					.img {
						display: block;
						width: 100%;
						height: 380rpx;
					}

					.txt {
						h2 {
							margin: 10px 0 0;
							font-size: 14px;
							color: #333333;
							font-weight: 700;
							padding: 0 8px;
						}

						h3 {
							margin-top: 2px;
							font-size: 12px;
							color: #c9c8c8;
							font-weight: 500;
							padding: 0 8px;
						}

						.rmb {
							margin-top: 5px;
							font-size: 12px;
							color: #e8ce10;
							font-weight: 700;
							padding: 0 8px;

							span {
								font-size: 14px;
							}
						}

						p {
							margin-top: 5px;
							font-size: 12px;
							color: #ff826b;
							font-weight: 700;
							padding: 0 8px;
						}

						.pay {
							font-size: 12px;
							color: #c9c8c8;
							font-weight: 500;
							position: absolute;
							right: 8px;
							bottom: 30px;
						}



					}


				}


			}


		}

	}
</style>
