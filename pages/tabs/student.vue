<template>
	<view class="student">
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
			<!-- <view class="feedback">
				<navigator url="/pages/complain">
					<img :src="imgUrl + '/icon/pinglun.png'" alt="">
				</navigator>
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
		<view class="card" v-if="tabsIndex == 0" style="display: flex;justify-content: center;align-items: center;">
			<view class="course">
				<view class="title">
					预习课程
				</view>
				<view class="list">
					<view v-for="(item, index) in courseList" :key="index">
						<button @tap="courseIndex = index" :class="{'active': courseIndex == index}">{{item}}</button>
					</view>
				</view>
				<view class="select">
					<u-button type="primary" size="default" @click="locaUrl('/pages/learning?item=' + courseList[courseIndex])">确定</u-button>
				</view>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 1">
			<view class="preparation">
				<view class="preparation-title">
					科学的复习方法-艾宾浩斯复习曲线-康奈尔笔记法
				</view>
				<view class="upload-button">
					<view @tap="upImgShow = true"><button>上传图片</button></view>
					<!-- <view><button>附件上传</button></view> -->
				</view>
				<view class="method">
					<view class="progress" v-for="(item, index) in reviewData">
						<view class="top">
							<view class="left">
								<img :src="item.content[0]" alt="" @tap="reviewImgList(item)">
							</view>
							<view class="right">
								<view class="calendar">
									<view class="state">
										<text v-if="item.reviewplans[item.reviewplans.length - 1].iszt">本次已完成</text>
										<text v-else>待复习</text>
									</view>
									<view class="date">
										{{item.date1}}
									</view>
								</view>
							</view>
						</view>
						<view class="bottom">
							<ul>
								<li>
									<label>复习次数：</label>
									<span v-for="(item2,index) in item.reviewplans">{{index + 1}}</span>
								</li>
								<li>
									<label>复习日期：</label>
									<span v-for="(item2,index) in item.reviewplans">{{item2.Createdate}}</span>
								</li>
								<li>
									<label>完成情况：</label>
									<span v-for="(item2,index) in item.reviewplans">
										<text v-if="item2.iszt" style="color: #2084b9;">✔</text>
										<text v-else>&nbsp;</text>
									</span>
								</li>
								<li>
									<label>复习提示：</label>
									<text style="font-size: 12px;color: #82848A;"
										v-if="!item2.chaoshi">下次复习日期：{{item.date1}}</text>
									<text style="font-size: 12px;color: #007AFF;" v-else
										@click="resettingReview(item.content)">建议重置复习计划,点此重置</text>
								</li>
							</ul>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 2">
			<view class="lessons">
				<view class="lessons-tabs">
					<view class="selsect">
						<view :class="{'active': lessonsIndex == 1}" @tap="selectLessons(1)">自习室</view>
						<view :class="{'active': lessonsIndex == 2}" @tap="selectLessons(2)">学习圈</view>
					</view>
				</view>
				<view class="lessons-create" v-if="lessonsIndex == 1">
					<view><button @tap="createLessons(true)">创建单人自习室</button></view>
					<view><button style="background: #54c2fc;color: #FFFFFF;"
							@tap="createLessons(false)">创建多人自习室</button></view>
				</view>
				<view class="lessons-comment" v-if="lessonsIndex == 2">
					<view class="select" style="width: 80%;margin-left: 10%;">
						<u-button type="primary" size="default" @click="upContentShow = true">发表</u-button>
					</view>
					<view class="comment-list" v-for="(item, index) in RoomchatData">
						<view class="one">
							<view class="img">
								<img :src="imgUrl + '/header.jpg'" alt="">
							</view>
							<view class="font">
								<p>{{item.User.urealname}}</p>
								<p>{{item.Memo}}</p>
							</view>
						</view>
						<view class="two">
							<img v-for="(item2, index2) in item.Logo" @click="workImgShow(item.Logo)" :src="item2" v-if="index2 < 3" alt="">
						</view>
						<view class="three">
							<text>{{item.Createdate}}</text>
						</view>
						<view class="four">
							<!-- <view><img :src="imgUrl + '/icon/fenxiang.png'" alt=""><text>分享</text></view> -->
							<view @tap="giftDisplay(true)"><img :src="imgUrl + '/icon/lihe.png'" alt=""><text>打赏</text>
							</view>
							<view @tap="praiseMe(4, item.Id,item.Isindex,index)">
								<img :src="imgUrl + '/icon/praise-1.png'" alt="" v-if="!item.Isindex">
								<img :src="imgUrl + '/icon/praise-2.png'" alt="" v-if="item.Isindex">
								<text>{{item.gvnum}}</text></view>
							<view @tap="commentListShowFun(4, item.Id)"><img :src="imgUrl + '/icon/pinglun-3.png'"
									alt=""><text>评论</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card" v-if="tabsIndex == 3">
			<view class="method-list">
				<navigator :url="'/pages/method?id=' + item.Id" v-for="(item, index) in submethodData">
					<view class="list">
						<view class="book">
							<view class="hot">推荐</view>
							<text>{{item.Title}}</text>
							<view class="read">已有{{item.Orby}}人阅读</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<u-popup v-model="lessonsShow" mode="bottom" height="500px">
			<view class="lessons-set">
				<view class="list title">创建自习室</view>
				<view class="list title-son">学习目标</view>
				<view class="list textarea"><textarea value="" placeholder="输入您的学习计划,如写作业 背单词等" v-model="lessons.content" /></view>
				<view class="list title-son">目标学习时长</view>
				<view class="list date">在这段时间内学习 <input type="number" value="30" v-model="lessons.num">分钟</view>
				<!-- <view class="list date">需要消耗 <text>30</text>牛盾</view> -->
				<!-- <view class="list title-son">邀请学伴</view> -->
				<view class="list button">
					<u-button type="primary" size="default" @click="intoLessons()">创建</u-button>
				</view>
				<view class="list tip">创建即统一遵守<text @tap="lessonStipShow = true">《自习室条约》</text></view>
			</view>
		</u-popup>
		<u-popup v-model="lessonStipShow" mode="bottom" height="100%">
			<view class="lessons-tip">
				<view class="title">自习室条约</view>
				<view class="tips">
					<p>1.《自习室》模块功能目的是为孩子提供一个一起学习的空间，促进孩子学习热情，增加交流机会</p>
					<p>2.所有注册会员均可以创建并使用《自习室》</p>
					<p>3.《自习室》创建者自动获得主持人身份，并可以邀请想一起学习的朋友。</p>
					<p>4.《自习室》氛围的营造是每个加入人员的共同责任，自习室内，不能大声喧哗，辱骂、谩骂朋友，主持人有权将其踢出自习室。</p>
					<p>5.《自习室》设计成收费模式，收费标准如下：</p>
					<p>1）T≦60分钟，每人收10牛盾</p>
					<p>2）60分钟≦T≦90分钟，每人收10牛盾</p>
					<p>3）90分钟≦T≦120分钟，每人收20牛盾</p>
					<p>4）120分钟≦T，每人每半小时收30牛盾</p>
					<p>例：3个人一起写作业，所有人作业在60分钟内完成，每人收10牛盾，共收30牛盾；</p>
					<p>作业在80分钟完成，则3*10+3*10=60牛盾；</p>
					<p>作业在100分钟完成，则3*10+3*10+3*20=120牛盾；</p>
					<p>作业在150分钟完成，则3*10+3*10+3*20+3*30*1=210牛盾；1为超过120分钟1个30分钟；</p>
					<p>作业在170分钟完成，则3*10+3*10+3*20+3*30*2=300牛盾； 2为超过120分钟2个30分钟；</p>
					<p>6.自习室内严禁出现低俗画面，着装不暴露，不散布、不从事黄赌毒等违法犯罪信息，一经发现，平台有权报警处理，并且有权封号，取消会员资格。</p>
					<p>7.自习室内系统会不定时发布游戏奖励，鼓励积极参与，惊喜多多，奖励多多。</p>
					<p>8.自习室内有奖竞答，鼓励学生积极抢答，奖励丰厚，惊喜不断；</p>
					<p>9.自习室内行为规范符合中国国家社会主义核心价值观，提倡真善美。</p>
					<p>10.其他未经事宜，解释权@君不器教育科技（天津）有限责任公司。</p>
					<p>
						<u-button type="primary" size="default" @click="lessonStipShow = false">我已阅读</u-button>
					</p>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="upImgShow" mode="bottom" height="70%">
			<view>
				<u-upload :action="action" :file-list="fileList" :header="header" @on-remove="onRemove"
					@on-success="onSuccess"></u-upload>
				<view class="upload-button">
					<view><button @tap="review()">上传</button></view>
					<!-- <view><button>附件上传</button></view> -->
				</view>
			</view>
		</u-popup>
		<u-popup v-model="reviewImgListShow" mode="bottom" height="80%">
			<view>
				<view class="img-list" v-for="(item, index) in reviewFinishData.content">
					<img :src="item" alt="" mode='widthFix'>
				</view>
				<view class="upload-button">
					<view>
						<button style="background: #86d3fd;color: #FFFFFF;" @tap="reviewplanPut()"
							v-if="buttonStatus == 0">完成</button>
						<button v-else>复习已完成</button>
					</view>
					<!-- <view><button>附件上传</button></view> -->
				</view>
			</view>
		</u-popup>
		<u-popup v-model="upContentShow" mode="bottom" height="70%">
			<view>
				<u-upload :action="action" :file-list="fileList" :header="header" @on-remove="onRemove"
					@on-success="onSuccess"></u-upload>
				<view class="list">
					<input type="text" v-model="content" placeholder="请输入内容" style="width: 100%;margin: 10px 0;padding-left: 10px;height: 30px;">
				</view>
				<view class="upload-button">
					<view><button @tap="fabiao()" style="background: #169AF3;color:#FFFFFF;">发表</button></view>
					<view><button @tap="upContentShow = false" style="margin-top: 10px;">取消编辑</button></view>
					<!-- <view><button>附件上传</button></view> -->
				</view>
			</view>
		</u-popup>
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
		<view class="swiper" v-show="swiperShow == true">
			<u-icon name="close" color="#2979ff" size="50" @tap="swiperShow = false"></u-icon>
			<u-swiper :list="workImgList" :effect3d="true"></u-swiper>
		</view>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
		<comment ref="comment" v-on:sendComment="sendComment"></comment>
		<gift ref="gift"></gift>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import comment from '@/pages/include/comment.vue';
	import gift from '@/pages/include/gift.vue';
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				tabs: ['预习', '复习', '自习室', '学习方法'],
				tabsIndex: 0,
				praiseImg: this.$store.state.imgUrl + '/icon/praise-1.png',
				praiseNum: 10,
				praiseStatus: false,
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				courseList: ['语文', '数学', '英语', '生物', '历史', '地理', '物理', '化学', '政治', ],
				courseIndex: 0,
				imgUrl: this.$store.state.imgUrl,
				lessonsIndex: 1,
				lessonsShow: false,
				lessons:{
					content:'',
					num:30
				},
				lessonStipShow: false,
				testImg: '',
				upImgShow: false,
				action: 'https://api.jbqjykj.com/images/Upload/Pic',
				fileList: [],
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				},
				reviewData: {},
				reviewImgListShow: false,
				reviewFinishData: {},
				buttonStatus: 0,
				currentReviewDate: '',
				imgList: [],
				submethodData:[],
				RoomchatData:[],
				userInfo:this.$store.state.userInfo,
				upContentShow: false,
				commentClass: {
					cls: '',
					cid: ''
				},
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
				commentListShow:false,
				commentList:'',
				swiperShow:false,
				workImgList:[],
				showCurrency:false,
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		components: {
			gift,
			comment,
			jiangli
		},
		created() {
			this.isLogin()
			console.log(this.userInfo)
			// this.reviewPlan()
		},
		onLoad(option) {
			if(option.shareCode){
				this.$store.commit('pushShareCode',option.shareCode)
			}
			if(this.$store.state.shareCode){
				this.getActivityCode(this.$store.state.shareCode)
			}
			this.submethod()
			this.getReview()
			this.getRoomChat()
		},
		methods: {
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
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
				} else {
					// this.$refs.uToast.show({
					// 	title: '已登录',
					// })
				}
			},
			tabsClick: function(index) {
				this.tabsIndex = index
			},
			workImgShow:function(list){
				for(let index in list){
					this.workImgList.push(list[index])
				}
				this.swiperShow = true
			},
			praiseMe: function(cls, cid, is, index) {
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
						'Authorization': 'Bearer ' + this.$store.state.userInfo.token
					}
					this.$req.doRequest('Post', '/giveup/Post', data, header).then(
							res => {
								// 获得数据
								this.RoomchatData[index].Isindex = true
								this.RoomchatData[index].gvnum++
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
			commentListShowFun: function(cls, cid){
				this.getComment(cid)
				this.commentListShow = true
				this.commentClass.cls = cls
				this.commentClass.cid = cid
			},
			commentDisplay: function(is) {
				this.$refs.comment.commentShow = is
			},
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
							this.getComment(that.commentClass.cid)
							this.$refs.comment.text = ''
						})
					.catch(res => {
						console.log(res);
					});
			},
			getComment: function(id) {
				let that = this
				let data = {
					cls: 4, //类别id  1文章 2视频 3课后作业
					cid: id, // 文章、视频id
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
			locaUrl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			selectLessons: function(is) {
				this.lessonsIndex = is
			},
			createLessons: function(is) {
				if (is) {
					this.lessonsShow = true
				} else {
					this.$refs.uToast.show({
						title: '多人自习室暂未开放',
					})
				}
			},
			getDate: function() {
				let dateTime
				let yy = new Date().getFullYear()
				let mm = new Date().getMonth() + 1
				let dd = new Date().getDate()
				let hh = new Date().getHours()
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
					new Date().getMinutes()
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
					new Date().getSeconds()
				dateTime = yy + '-' + mm + '-' + dd + 'T' + hh + ':' + mf + ':' + ss + '+08:00'
				return dateTime;
			},
			intoLessons: function() {
				this.lessonsShow = false
				let that = this
				let data = {
					uid: that.$store.state.userInfo.uID,
					content:that.lessons.content,
					num:that.lessons.num
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Room/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.navigateTo({
									url: '/pages/soloLessons?id=' + res.response + '&num=' + that.lessons.num + '&content=' + that.lessons.content,
								});
							}
						})
					.catch(res => {
						console.log(res);
					});

			},
			onGetImgClick: function() {
				let that = this
				uni.chooseImage({
					count: 6, // 最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						uni.uploadFile({
							url: 'https://api.jbqjykj.com/images/Upload/Pic', //服务器地址
							header: {
								'content-type': 'application/json',
								'Authorization': 'Bearer ' + that.$store.state.userInfo.token
							},
							fileType: "image", //ZFB必填,不然报错
							filePath: res.tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
							name: 'imgFile',
							success: (uploadFileRes) => {
								if (status == 200) {
									let img = {
										url: that.$store.state.rootUrl + uploadFileRes
											.response.response
									}
									that.fileList.push(img)
								}
							}
						});
					}
				})
			},
			onRemove: function(index, lists) {},
			onSuccess: function(data, index, lists, name) {
				this.fileList = lists
			},
			review: function() {
				let that = this;
				for (let index in this.fileList) {
					that.imgList.push(that.$store.state.apiUrl + that.fileList[index].response.response)
				}
				let data = {
					uID: that.$store.state.userInfo.uID,
					content: JSON.stringify(that.imgList)
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.userInfo.token
				}
				that.$req.doRequest('Post', '/review/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								that.upImgShow = false
								that.getReview()
								uni.showToast({
									title: "复习计划添加成功",
									icon: "none"
								});
								that.imgList = []
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getReview: function() {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/review/Get', data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								let e = res.response.data
								for (let index in e) {
									let ee = e[index].reviewplans
									let is = true
									e[index].content = JSON.parse(e[index].content)
									for (let index2 in ee) {
										let date = new Date(ee[index2].Createdate)
										let date2 = new Date().getTime()
										let MM = date.getMonth() + 1;
										let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
										if (!ee[index2].iszt && is) {
											e[index].date1 = MM + '月' + DD + '日'
											e[index].iszt = true
											is = false
											let chaoshi = (date.getTime()) - 259200000
											if (chaoshi >= date2) {
												ee[index2].chaoshi = true
											} else {
												ee[index2].chaoshi = false
											}
										}
										ee[index2].Createdate = MM + '.' + DD
									}
									that.reviewData = res.response.data
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			submethod: function() {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/submethod/Get', data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								this.submethodData = res.response.data
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			reviewplanPut: function() {
				let that = this
				let dateTime = that.getDate()
				let data = {
					uID: that.$store.state.userInfo.uID,
					rid: that.reviewFinishData.reviewplans[0].rid,
					iszt: true,
					updatedate: dateTime,
					Id: that.reviewFinishData.Id
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Put', '/reviewplan/Put', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "今日复习成功",
									icon: "none"
								});
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
							}
							that.getReview()
							that.reviewImgListShow = false
						})
					.catch(res => {
						console.log(res);
					});
			},
			reviewImgList: function(item) {
				this.reviewImgListShow = true
				this.reviewFinishData = item
			},
			resettingReview: function(content) {
				this.imgList = content
				this.review()
			},
			getRoomChat: function() {
				let that = this;
				let data = {}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Homework/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								that.RoomchatData = res.response.data
								let e = that.RoomchatData
								for(let index in e){
									let date = new Date(e[index].Createdate)
									let dateTime
									let mm = date.getMonth() + 1
									let dd = date.getDate()
									let hh = date.getHours()
									let mf = date.getMinutes() < 10 ? '0' + date.getMinutes() :
										date.getMinutes()
									let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() :
										date.getSeconds()
									dateTime = mm + '-' + dd + ' ' + hh + ':' + mf
									that.RoomchatData[index].Createdate = dateTime
									e[index].Logo = JSON.parse(e[index].Logo)
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			fabiao: function() {
				let that = this;
				for (let index in this.fileList) {
					that.imgList.push(that.$store.state.apiUrl + that.fileList[index].response.response)
				}
				let data = {
					uID: that.$store.state.userInfo.uID,
					Logo: JSON.stringify(that.imgList),
					Memo: that.content
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Homework/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "发表成功，获取发表奖励中...",
									icon: "none"
								});
								this.upContentShow = false
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
								this.getRoomChat()
							} else {
								uni.showToast({
									title: "发表失败，请重试",
									icon: "none"
								});
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			// /api/review/Post
			// that.$store.state.userInfo.uID,
			// content = ['images/0816191640GAS3YBExroEA1359589216acf1e67ce55756caae1c98.png','images/0816191640GAS3YBExroEA1359589216acf1e67ce55756caae1c98.png']

			// /api/reviewplan/Put uID rid iszt updatedate(年月日时分秒)
		}
	}
</script>
<style lang='less'>
	@import url('@/static/css/tabs/student.less');
</style>
