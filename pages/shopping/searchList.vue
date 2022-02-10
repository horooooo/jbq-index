<!-- 商城搜索 -->
<template>
	<view class="searchList">
		<!-- 搜索 -->
		<view class="search">
			<u-search shape="square" :clearabled="true" :show-action="true" placeholder="搜索" v-model="search"
				@custom="gotoNew">
			</u-search>
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="content">
				<u-waterfall v-model="flowList">
					<template v-slot:left="{leftList}">
						<view class="boxlist" v-for="(item, index) in 6" :key="index">
							<img src="http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg" class="img" alt="">
							<view class="txt">
								<h2>书本收纳盒</h2>
								<h3>亚克力材质 | 透明</h3>
								<view class="rmb">￥ <span>15</span>牛盾</view>
								<p>89人评价很好用</p>
								<view class="pay">900人付款</view>
							</view>
		
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="boxlist" v-for="(item, index) in 6" :key="index">
							<img src="http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg" class="img" alt="">
							<view class="txt">
								<h2>书本收纳盒</h2>
								<h3>亚克力材质 | 透明</h3>
								<view class="rmb">￥ <span>15</span>牛盾</view>
								<p>89人评价很好用</p>
								<view class="pay">900人付款</view>
							</view>
		
						</view>
					</template>
				</u-waterfall>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				// 搜索
				search: '',
				flowList:[]
			}
		},
		created() {

		},
		onLoad() {


		},
		methods: {
			// 点击搜索
			gotoNew() {
				

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

	.searchList {
		padding: 20px;

		.seach {}

		// 列表页
		.recommend {
			padding: 0;
		
			.content {
				margin: 20px 0 0;
		
				.boxlist {
					width: 92%;
					position: relative;
					border-radius: 5px;
					padding: 0 0 10px;
					box-shadow: 0 0 5px #dddddd;
					transition: .5s;
					margin:  0 auto 15px;
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
