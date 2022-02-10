<!-- 商城搜索 -->
<template>
	<view class="mallSearch">
		<!-- 搜索 -->
		<view class="search">
			<u-search shape="square" :clearabled="true" :show-action="true" placeholder="搜索" v-model="search"
				@custom="gotoNew">
			</u-search>
		</view>
		<!-- 历史记录 -->
		<view class="historical">
			<h2>历史搜索</h2>
			<ul>
				<li>铅笔</li>
				<li>橡皮</li>
			</ul>
		</view>
		<!-- 热门搜索 -->
		<view class="historical">
			<h2>历史搜索</h2>
			<ul>
				<li>书包</li>
				<li>护眼台灯</li>
				<li>阅读书架</li>
			</ul>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索
				search: '',


			}
		},
		created() {

		},
		onLoad() {


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

	.mallSearch {
		padding: 20px;

		.seach {}

		.historical {
			margin: 10px 0 0;

			h2 {
				color: #c9c8c8;
				font-size: 12px;
				font-weight: 500;
			}

			ul {
				margin: 5px 0 0;
				padding: 0;

				li {
					float: left;
					background: #f2f2f2;
					padding: 5px;
					color: #c3c1c1;
					margin-right: 5px;
					list-style-type: none;
					border-radius: 5px;
				}

				&::after {
					.clear
				}
			}

		}

	}
</style>
