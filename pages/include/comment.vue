<template>
	<view class="comment">
		<!-- 评论popup -->
		<u-popup class="comment-pupop" v-model="commentShow" mode="bottom" border-radius="14" height="120px">
			<view class="comment-content">
				<u-row gutter="16">
					<u-col span="16">
						<view class="input">
							<input type="text" placeholder="评论" v-model="text">
							<button @tap="$emit('sendComment',text)">发送</button>
						</view>
						<!-- <view class="emoji">
							<view v-for="emoji in emojiList" @click="addEmoji(emoji)">{{emoji}}</view>
						</view> -->
					</u-col>
				</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import util from '@/util/util.js';
	export default {
		data() {
			return {
				commentShow: false,
				text: '',
				emojiList: [
					'😀', '😁', '😂', '😄', '😅', '😆', '😇', '😉', '😊', '😋', '😌', '😍', '😘', '😙', '😜', '😝',
					'😎', '😏', '😶', '😑', '😒', '😳', '😞', '😟', '😠', '😡', '😔', '😕', '😣', '😖', '😫', '😤',
					'😮', '😱', '😨', '😰'
				]
			}
		},
		created() {},
		onLoad() {

		},
		methods: {
			addEmoji:function(emoji){
				this.text += emoji
			},
			// 获取当前页面
			// getCurrentPage:function(){
			// 	let routes = getCurrentPages(); 
			// 	let curRoute = routes[routes.length - 1].route
			// 	this.currentPage = curRoute
			// },
		}
	}
</script>
<style lang='less'>
	.comment {
		.comment-pupop {
			.u-drawer__scroll-view {
				background: #f5f5f5 !important;
			}
			.comment-content {
				padding-top: 20px;
				.input {
					width: 100%;
					float: left;
					input {
						float: left;
						width: 280px;
						background: #ffffff;
						padding-left: 8px;
						height: 50px;
						color: #9e9e9e;
					}
					button {
						width: 70px;
						height: 50px;
						border: none;
						border-radius: 8px;
						background: #54c1fc;
						line-height: 50px;
						text-align: center;
						color: #FFFFFF;
						font-size: 14px;
						float: right;
						margin-left: 8px;
					}
				}
				.emoji{
					width: 100%;
					view{
						float: left;
						width: 16.5%;
						font-size: 25px;
						text-align: center;
						margin-top: 8px;
					}
				}
			}
		}
	}
</style>
