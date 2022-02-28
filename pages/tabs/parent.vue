<template>
	<view class="parent">
		<view class="header">
			<view class="header-img">
				<img :src="userInfo.upic" alt="">
			</view>
			<view class="header-font">
				<view class="top">{{userInfo.name}}{{userInfo.groupname || ''}}<!-- <img :src="imgUrl + '/icon/icon-1-1.png'" alt=""> --></view>
				<view class="bottom">{{userInfo.uschool || ''}}</view>
			</view>
			<!-- <view class="header-search">
				<input type="text">
				<icon type="search" size="15" color="white" />
			</view> -->
			<view class="feedback">
				<button open-type="share" type="default" style="background: none;">
					<img :src="imgUrl + '/icon/fenxiang-2.png'" alt="" style="width: 30px;height: 30px;">
				</button>
			</view>
		</view>
		<view class="tabs">
			<ul>
				<li @tap="tabsClick(index)" :class="{'active':index == tabsIndex}" v-for="(item, index) in tabs"
					:key="index">{{item}}</li>
			</ul>
		</view>
		<view class="card" v-if="tabsIndex == 0">
			<!-- <view class="progress">
				<p>
					<view class="line">
						<view class="back" style="width: 60%;"></view>
					</view>
				</p>
				<p>您的孩子坚持完成作业50天，超过全国93%的孩子</p>
			</view> -->
			<view class="assignment">
				<view class="title"><label></label><text>课后作业</text></view>
				<view class="content">
					<view class="list" @tap="swiperShow = true">
						<view v-for="(item, index) in homeWorkData.list" :key="index"><img :src="item.image" alt=""></view>
					</view>
					<view class="operate">
						<!-- <view @click="share()"><img :src="imgUrl + '/icon/fenxiang.png'" alt=""><text>分享</text></view> -->
						<view @tap="giftDisplay(true)"><img :src="imgUrl + '/icon/lihe.png'" alt=""><text>打赏</text>
						</view>
						<view @tap="praiseMe(3, homeWorkData.data.Id,homeWorkData.data.isIndex)">
							<img :src="imgUrl + '/icon/praise-1.png'" alt="" v-if="!homeWorkData.data.isIndex">
							<img :src="imgUrl + '/icon/praise-2.png'" alt="" v-if="homeWorkData.data.isIndex">
						</view>
						<view @tap="commentDisplay(true, 3, homeWorkData.data.Id)"><img :src="imgUrl + '/icon/pinglun-3.png'"
								alt=""><text>评论</text></view>
					</view>
				</view>
			</view>
			<view class="comment-list">
				<view v-for="(item, index) in commentList" :key="index"><text>{{item.User}}</text>：{{item.content}}</view>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 1">
			<view class="card-list" v-for="(item, index) in articleList">
				<navigator :url="'/pages/article?id=' + item.Id" open-type="navigate">
					<view class="img">
						<img :src="item.Logo" alt="">
					</view>
				</navigator>
				<view class="title">
					{{item.Title}}
				</view>
				<view class="operate">
					<!-- <view><img :src="imgUrl + '/icon/fenxiang.png'" alt=""><text>分享</text></view> -->
					<view @tap="giftDisplay(true)"><img :src="imgUrl + '/icon/lihe.png'" alt=""><text>打赏</text></view>
					<view @tap="praiseMe(1, item.Id,item.Isindex,index)">
						<img :src="imgUrl + '/icon/praise-1.png'" alt="" v-if="!item.Isindex">
						<img :src="imgUrl + '/icon/praise-2.png'" alt="" v-if="item.Isindex">
						<text>{{item.gvnum}}</text>
					</view>
					<view @tap="commentDisplay(true, 1, item.Id)"><img :src="imgUrl + '/icon/pinglun-3.png'"
							alt=""><text>评论</text>
					</view>
				</view>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 2">
			<view class="video-type">
				<span v-for="(item,index) in videoTypeList"  :class="{'active':index == videoTypeValue - 1}" @tap="videoTypeValue = item.value">{{item.lable}}</span>
			</view>
			<!-- <view class="video-list-left">
				<navigator :url="'/pages/video?id=' + item.Id" v-for="(item, index) in videoList" :key="index"
					v-if="index%2 == 0">
					<view class="list"><img :src="item.Logo" alt=""><view class="title">{{item.Title || ''}}</view><view class="date">{{item.Smemo || ''}}</view></view>
				</navigator>
			</view>
			<view class="video-list-right">
				<navigator :url="'/pages/video?id=' + item.Id" v-for="(item, index) in videoList" :key="index"
					v-if="index%2 != 0">
					<view class="list"><img :src="item.Logo" alt=""><view class="title">{{item.Title || ''}}</view><view class="date">{{item.Smemo || ''}}</view></view>
				</navigator>
			</view> -->
			<view class="video-list-right">
				<navigator :url="'/pages/video?id=' + item.Id" v-for="(item, index) in videoList" :key="index">
					<view class="list" v-show="item.Orby == videoTypeValue"><img :src="item.Logo" alt=""><view class="title">{{item.Title || ''}}</view><view class="date">{{item.Smemo || ''}}</view></view>
				</navigator>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 3">
			<view class="video-type">
				<span v-for="(item,index) in mp3TypeList"  :class="{'active':index == mp3TypeValue - 1}" @tap="mp3TypeValue = item.value">{{item.lable}}</span>
			</view>
			<!-- 拓展 -->
			<view class="tz" v-show="mp3TypeValue == 1">
				<view class="box" @click="gototzin(1)">
					<img :src="imgUrl + '/rulinwaishi.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>儒林外史</h2>
				</view>
				<view class="box" @click="gototzin(2)">
					<img :src="imgUrl + '/zhaohuaxishi.png'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>朝花夕拾</h2>
				</view>
				<view class="box" @click="gototzin(3)">
					<img :src="imgUrl + '/feiniaoji.png'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>飞鸟集</h2>
				</view>
				<view class="box" @click="gototzin(8)">
					<img :src="imgUrl + '/dey.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>窦娥冤</h2>
				</view>
				<view class="box" @click="gototzin(9)">
					<img :src="imgUrl + '/lbxplj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>鲁滨逊漂流记</h2>
				</view>
				<view class="box" @click="gototzin(10)">
					<img :src="imgUrl + '/whkl.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>文化苦旅</h2>
				</view>
				<view class="box" @click="gototzin(11)">
					<img :src="imgUrl + '/mrz.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>名人传</h2>
				</view>
				<view class="box" @click="gototzin(12)">
					<img :src="imgUrl + '/snwtzfn.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>少年维持的烦恼</h2>
				</view>
				<view class="box" @click="gototzin(13)">
					<img :src="imgUrl + '/xwz.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>小王子</h2>
				</view>
				<view class="box" @click="gototzin(14)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(1)</h2>
				</view>
				<view class="box" @click="gototzin(15)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(2)</h2>
				</view>
				<view class="box" @click="gototzin(16)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(3)</h2>
				</view>
				<view class="box" @click="gototzin(17)">
					<img :src="imgUrl + '/hdlwl1.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>海底两万里(1)</h2>
				</view>
				<view class="box" @click="gototzin(18)">
					<img :src="imgUrl + '/hdlwl2.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>海底两万里(2)</h2>
				</view>
			</view>
			<view class="tz" v-show="mp3TypeValue == 2">
				<view class="box" @click="gototzin(4)">
					<img :src="imgUrl + '/rulinwaishi.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>儒林外史</h2>
				</view>
				<view class="box" @click="gototzin(5)">
					<img :src="imgUrl + '/zhaohuaxishi.png'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>朝花夕拾</h2>
				</view>
				<view class="box" @click="gototzin(6)">
					<img :src="imgUrl + '/gtszylcd.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>钢铁是怎样炼成的</h2>
				</view>
				<view class="box" @click="gototzin(7)">
					<img :src="imgUrl + '/ltxz.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>骆驼祥子</h2>
				</view>
				<view class="box" @click="gototzin(19)">
					<img :src="imgUrl + '/mrz.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>名人传</h2>
				</view>
				<view class="box" @click="gototzin(20)">
					<img :src="imgUrl + '/snwtzfn.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>少年维持的烦恼</h2>
				</view>
				<view class="box" @click="gototzin(21)">
					<img :src="imgUrl + '/xwz.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>小王子</h2>
				</view>
				<view class="box" @click="gototzin(22)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(1)</h2>
				</view>
				<view class="box" @click="gototzin(23)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(2)</h2>
				</view>
				<view class="box" @click="gototzin(24)">
					<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>平凡的世界(3)</h2>
				</view>
				<view class="box" @click="gototzin(25)">
					<img :src="imgUrl + '/hdlwl1.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>海底两万里(1)</h2>
				</view>
				<view class="box" @click="gototzin(26)">
					<img :src="imgUrl + '/hdlwl2.jpg'" class="img" alt="">
					<u-line-progress active-color="#5f9fd7" :show-percent="false" :height="12" :percent="100" class="c">
					</u-line-progress>
					<h2>海底两万里(2)</h2>
				</view>
			</view>
		</view>
		<view class="swiper" v-show="swiperShow == true">
			<u-icon name="close" color="#2979ff" size="50" @tap="swiperShow = false"></u-icon>
			<u-swiper :list="homeWorkData.list" :effect3d="true"></u-swiper>
		</view>
		<comment ref="comment" v-on:sendComment="sendComment"></comment>
		<gift ref="gift"></gift>
		<u-toast ref="uToast" />
		{{acode}}
	</view>
</template>

<script>
	import comment from '@/pages/include/comment.vue';
	import gift from '@/pages/include/gift.vue';
	import util from '@/util/util.js';
	export default {
		data() {
			return {
				tabs: ['作业', '文章', '拓展'],
				// tabs: ['作业', '文章', '视频'],
				tabsIndex: 0,
				praiseImg: this.$store.state.imgUrl + '/icon/praise-1.png',
				praiseNum: 10,
				praiseStatus: false,
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				imgUrl: this.$store.state.imgUrl,
				swiperShow: false,
				list: [{
						image: this.$store.state.imgUrl + '/book.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: this.$store.state.imgUrl + '/book.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: this.$store.state.imgUrl + '/book.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				articleList: [],
				videoList: [],
				commentClass: {
					cls: '',
					cid: ''
				},
				userInfo:this.$store.state.userInfo,
				homeWorkData:{
					list:[],
					data:'',
				},
				homeWorkParse:0,
				commentList:'',
				videoTypeList:[{lable:'学习方法',value:'1'},{lable:'励志',value:'2'},{lable:'哲理',value:'3'},{lable:'课外读物',value:'4'},{lable:'家长课堂',value:'5'},{lable:'诗词',value:'6'},],
				mp3TypeList:[{lable:'电子书',value:'1'},{lable:'电子音频',value:'2'},],
				videoTypeValue:1,
				mp3TypeValue:1,
				acode:'',
			}
		},
		components: {
			gift,
			comment
		},
		created() {
			this.isLogin()
			this.getHomework()
			this.getLmValue()
		},
		onLoad(option) {
			if(option.shareCode){
				this.$store.commit('pushShareCode',option.shareCode)
			}
			if(this.$store.state.shareCode){
				this.getActivityCode(this.$store.state.shareCode)
			}
			if(this.$store.state.switch != 'hide'){
				this.tabs = ['作业', '文章', '视频', '拓展']
			}
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			onShareTimeline(){
			},
			onShareAppMessage(res){
				if(res.from == 'button'){
					return{
						title:'邀请码分享',
						path:'/pages/tabs/index?shareCode=JBQ' + this.userInfo.uID,
						type:0,
					}
				}
			},
			getActivityCode:function(code){
				let that = this
				let data = {
					code:code	
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/user/BangUfid', data, header).then(
						res => {
							// 获得数据
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
							if(res.msg != '已绑定推荐人'){
								uni.showToast({
									title: res.msg,
									icon: "none"
								});
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			isLogin: function() {
				if (!this.$store.state.loginIs) {
					uni.reLaunch({
						url: '/pages/login',
					});
				}
				console.log(this.$store.state.loginIs)
			},
			tabsClick: function(index) {
				this.tabsIndex = index
			},
			praiseMe: function(cls, cid, is,index) {
				if (!is) {
					let that = this
					let data = {
						uid: that.$store.state.userInfo.uID, // 用户id
						cls: cls, //类别id  1文章 2视频 3课后作业
						cid: cid, // 文章、视频id
						num: 1
					}
					let header = {
						'content-type': 'application/json-patch+json',
						'Authorization': 'Bearer ' + this.$store.state.token
					}
					this.$req.doRequest('Post', '/giveup/Post', data, header).then(
							res => {
								// 获得数据
								this.homeWorkData.data.Isindex = true
								if(index){
									this.articleList[index].Isindex = true
								}
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
			giftDisplay: function(is) {
				this.$refs.uToast.show({
					title: '打赏功能暂未开通哦',
				})
				// this.$refs.gift.giftShow = is
			},
			sendComment: function(text) {
				if (!text) {
					this.$refs.uToast.show({
						title: '请输入要评论的内容',
					})
					return false;
				}
				this.$refs.comment.commentShow = false
				this.comment(text)
			},
			commentDisplay: function(is, cls, cid) {
				this.$refs.comment.commentShow = is
				this.commentClass.cls = cls
				this.commentClass.cid = cid
				console.log(this.commentClass)
			},
			getHomework: function() {
				let that = this
				let data = {
					page: 1
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Roomchat/get', data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								let len = res.response.data.length - 1
								let img = res.response.data[len].Logo
								that.homeWorkData.data = res.response.data[len]
								img = JSON.parse(img)
								for(let index in img){
									let params = {
										image:img[index],
										title:''
									}
									that.homeWorkData.list.push(params)
								}
								this.getComment();
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getLmValue: function() {
				let that = this
				let data = {
					page: 1,
					intPageSize:200,
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Lmvalue/Get', data, header).then(
						res => {
							// 获得数据
							let list = res.response.data
							if (res.success) {
								for (let index in list) {
									if (list[index].Lmid == 1) {
										that.articleList.push(list[index])
									} else if (list[index].Lmid == 2) {
										that.videoList.push(list[index])
									}
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			// 评论
			comment: function(content) {
				let that = this
				let data = {
					uid: that.$store.state.userInfo.uID, // 用户id
					cls: that.commentClass.cls, //类别id  1文章 2视频 3课后作业
					cid: that.commentClass.cid, // 文章、视频id
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
			// 跳转进入内页
			gototzin(id) {
				// 进入拓展的内页
				this.$u.route({
					url: 'pages/expandIn?id='+id,
				})
			},
			getComment: function() {
				let that = this
				let data = {
					cls: 3, //类别id  1文章 2视频 3课后作业
					cid: that.homeWorkData.data.Id, // 文章、视频id
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
		}
	}
</script>
<style lang='less'>
	@import url('@/static/css/tabs/parent.less');

	/* 拓展 */
	.tz {
		padding: 20px 20px 0;

		.box {
			width: 32%;
			float: left;
			margin-right: 2%;
			margin-bottom: 20px;

			.img {
				width: 100%;
				height: 298rpx;
				border-radius: 10px;
			}

			.c {}

			h2 {
				font-weight: 500;
				color: #333333;
				font-size: 15px;
				margin-top: 5px;

			}


			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		&:after {
			clear: both;
			content: "";
			display: block;
		}
	}
</style>
