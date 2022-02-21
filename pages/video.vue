<template>
	<view class="video">
		<video autoplay="true" :show-fullscreen-btn="false" play-btn-position="center" :controls="true"
			:src="videoContent.Videourl"></video>
		<view>
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger"></uni-fab>
		</view>
		<view class="font" v-html="videoContent.Memo"></view>
		<u-popup v-model="commentListShow" mode="bottom" border-radius="14" height="400px">
			<view class="video-comment">
				<view class="comment-list" v-for="(item, index) in commentList">
					<view class="img">
						<img :src="item.Logo" alt="">
					</view>
					<view class="font">
						<p>{{item.User}}</p>
						<p>{{item.content}}</p>
					</view>
					<!-- <view class="operate">
						<img :src="imgUrl + '/icon/dianzan.png'" alt="">
					</view> -->
				</view>
				<view class="open-comment">
					<button @tap="commentDisplay(true)">留下你的精彩评论</button>
				</view>
			</view>
		</u-popup>

		<comment ref="comment" v-on:sendComment="sendComment" style="position: absolute;z-index: 99999;"></comment>
		<gift ref="gift" style="position: absolute;z-index: 99999;"></gift>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import comment from '@/pages/include/comment.vue';
	import gift from '@/pages/include/gift.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#ffffff',
					selectedColor: '#7A7E83',
					buttonColor: '#ffe93b'
				},
				content: [{
						iconPath: this.$store.state.imgUrl + '/icon/lihe.png',
						selectedIconPath: this.$store.state.imgUrl + '/icon/lihe.png',
						text: '礼物',
						active: false
					},
					{
						iconPath: this.$store.state.imgUrl + '/icon/praise-3.png',
						selectedIconPath: this.$store.state.imgUrl + '/icon/praise-2.png',
						text: '点赞',
						active: false
					},
					{
						iconPath: this.$store.state.imgUrl + '/icon/pinglun-3.png',
						selectedIconPath: this.$store.state.imgUrl + '/icon/pinglun-3.png',
						text: '评论',
						active: false
					},
					// {
					// 	iconPath: this.$store.state.imgUrl + '/icon/fenxiang.png',
					// 	selectedIconPath: this.$store.state.imgUrl + '/icon/fenxiang.png',
					// 	text: '转发',
					// 	active: false
					// }
				],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				commentListShow: false,
				videoContent: '',
				giveUpIndex: false,
				giveUpId: false,
				commentList: '',
			}
		},
		components: {
			gift,
			comment
		},
		created() {},
		onLoad(option) {
			this.getContent(option.id)
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			trigger: function(e) {
				console.log(e);
				// 找到当前内容数组中的索引
				this.content[e.index].active = !e.item.active;
				if (e.index == 0) {
					// 礼物
					// this.giftDisplay(true)
					this.$refs.uToast.show({
						title: '打赏功能暂未开通哦',
					})
				} else if (e.index == 1) {
					this.praiseMe()
				} else if (e.index == 2) {
					this.commentListShow = true
				} else if (e.index == 3) {
					// this.commentDisplay(true)
				}
			},
			giftDisplay: function(is) {
				this.$refs.gift.giftShow = is
			},
			sendComment: function(text) {
				if(!text){
					this.$refs.uToast.show({
						title: '请输入要评论的内容',
					})
					return false;
				}
				this.$refs.comment.commentShow = false
				this.comment(text)
			},
			commentDisplay: function(is) {
				this.$refs.comment.commentShow = is
			},
			getContent: function(id) {
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Lmvalue/Get/' + id, data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								this.videoContent = res.response
								this.getComment()
								this.giveUpIndex = res.response.Isindex
								this.giveUpId = res.response.Id
								if (res.response.Isindex) {
									this.content[1].text = '已点赞'
									
									
								} else {
									this.content[1].text = '点赞'
									this.content[1].selectedIconPath = this.imgUrl + '/icon/praise-3.png'
									this.content[1].iconPath = this.imgUrl + '/icon/praise-3.png'
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			praiseMe: function() {
				let that = this
				if (!that.giveUpIndex) {
					let data = {
						uid: that.$store.state.userInfo.uID, // 用户id
						cls: 2, //类别id  1文章 2视频 3课后作业
						cid: that.giveUpId, // 文章、视频id
						num: 1
					}
					let header = {
						'content-type': 'application/json-patch+json',
						'Authorization': 'Bearer ' + this.$store.state.token
					}
					this.$req.doRequest('Post', '/giveup/Post', data, header).then(
							res => {
								// 获得数据
								that.content[1].text = '已点赞'
								that.giveUpIndex = true
								that.content[1].selectedIconPath = this.imgUrl + '/icon/praise-2.png'
								that.content[1].iconPath = this.imgUrl + '/icon/praise-2.png'
							})
						.catch(res => {
							console.log(res);
						});

				} else {
					this.$refs.uToast.show({
						title: '您已经点过赞了',
					})
				}

			},
			comment: function(content) {
				let that = this
				let data = {
					uid: that.$store.state.userInfo.uID, // 用户id
					cls: 2, //类别id  1文章 2视频 3课后作业
					cid: that.videoContent.Id, // 文章、视频id
					content: content, //评论内容
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('Post', '/comment/Post', data, header).then(
						res => {
							// 获得数据
							console.log(res);
							this.getComment()
						})
					.catch(res => {
						console.log(res);
					});
			},
			getComment: function() {
				let that = this
				let data = {
					cls: 2, //类别id  1文章 2视频 3课后作业
					cid: that.videoContent.Id, // 文章、视频id
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/comment/Get', data, header).then(
						res => {
							// 获得数据
							that.commentList = res.response.data
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
			},
		},
	}
</script>

<style lang="less">
	@import url('../static/css/video.less');
</style>
