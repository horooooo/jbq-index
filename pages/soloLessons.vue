<template>
	<view class="solo-lessons">
		<view class="list circle">
			<u-circle-progress type="primary" :percent="percent" duration="2000" bg-color="#212426" width="500">
			</u-circle-progress>
			<view class="date">
				<u-count-down :timestamp="timestamp" bg-color="#212426" color="#FFFFFF" font-size="80" @end="end()"
					separator-color="#FFFFFF"></u-count-down>
			</view>
		</view>
		<view class="list button">
			<view><button style="background: #212426;" @tap="start()">开始</button></view>
			<view><button style="background: #54c2fc;border:none;" @tap="upImgShow = true">退出</button></view>
		</view>
		<!-- <view class="music-icon" @tap="musicShow = true">
			<img :src="imgUrl + '/icon/icon-music.png'" alt="">
		</view> -->
		<u-select v-model="musicShow" :list="musicList"  @confirm="confirm"  mode="single-column"></u-select>
		<imtAudio v-if="restart" :src="musicSrc" style="margin-top: 30px;"></imtAudio>
		<view class="list" style="text-align: center;color: #FFFFFF;">
			{{lessonsData.content}}
		</view>
		<u-popup v-model="upImgShow" mode="bottom" height="70%">
			<view>
				<u-upload :action="action" :file-list="fileList" :header="header" @on-remove="onRemove"
					@on-success="onSuccess"></u-upload>
				<!-- <view class="list">
					<input type="text" v-model="content" placeholder="请输入自习总结" style="width: 100%;margin: 10px 0;padding-left: 10px;height: 30px;">
				</view> -->
				<view class="upload-button">
					<view><button @tap="roomChat()" style="background: #169AF3;color:#FFFFFF;">完成自习</button></view>
					<!-- <view><button @tap="navigateBack()" style="margin-top: 10px;">直接退出</button></view> -->
					<!-- <view><button>附件上传</button></view> -->
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import imtAudio from '@/components/imt-audio/imt-audio.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				timestamp: 0,
				percent: 0,
				percentSetInterval: {},
				musicShow: false,
				musicList: [{
						value: this.$store.state.rootUrl + '/wx-app/mp3/862272.mp3',
						label: '不知名歌曲'
					},
					{
						value: this.$store.state.rootUrl + '/wx-app/mp3/892204.mp3',
						label: '你笑起来真好看'
					},
					{
						value: this.$store.state.rootUrl + '/wx-app/mp3/1002010.mp3',
						label: '世界那么大还是遇见你'
					}
				],
				musicSrc:this.$store.state.rootUrl + '/wx-app/mp3/862272.mp3',
				restart:true,
				musicIndex:0,
				lessonsData:{
					content:'',
					num:1
				},
				upImgShow:false,
				action: 'https://api.jbqjykj.com/images/Upload/Pic',
				fileList: [],
				content:'',
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				},
				imgList:[]
			}
		},
		components: {
			imtAudio,
		},
		created() {
		},
		onLoad(option) {
			// this.getLessons(option.id)
			this.lessonsData.content = option.content
			this.lessonsData.num = option.num
			this.timestamp = option.num * 60
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			start: function() {
				this.timestamp = this.lessonsData.num * 60
				this.percentNum()
			},
			percentNum: function() {
				let that = this
				clearInterval(this.percentSetInterval)
				this.percentSetInterval = setInterval(function() {
					that.percent++
				}, this.timestamp * 10);
			},
			navigateBack: function() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; 
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			playMusic: function() {
				
			},
			confirm:function(e){
				this.restart = false
				this.musicSrc = e[0].value
				this.restart = true
			},
			prev:function(){
				this.musicIndex --
				if(this.musicIndex == 0){
					this.musicIndex = this.musicList.length - 1
				}
				this.musicSrc = this.musicList[this.musicIndex].value
			},
			next:function(){
				this.musicIndex ++
				if(this.musicIndex == (this.musicList.length - 1)){
					this.musicIndex = 0
				}
				this.musicSrc = this.musicList[this.musicIndex].value
			},
			getLessons: function(id) {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Room/Get/' + id, data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								
							}
						})
					.catch(res => {
						console.log(res);
					});
			
			},
			end:function(){
				this.upImgShow = true
				console.log('自习结束')
			},
			onRemove: function(index, lists) {},
			onSuccess: function(data, index, lists, name) {
				this.fileList = lists
			},
			roomChat: function() {
				if(this.fileList.length == 0){
					uni.showToast({
						title: "请上传自习成果",
						icon: "none"
					});
					return false
				}
				let that = this;
				for (let index in this.fileList) {
					that.imgList.push(that.$store.state.apiUrl + that.fileList[index].response.response)
				}
				let data = {
					uID: that.$store.state.userInfo.uID,
					Logo: JSON.stringify(that.imgList),
					content: that.content
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Roomchat/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "上传成功",
									icon: "none"
								});
								this.navigateBack()
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
			},
			onShareTimeline(){},
		}
	}
</script>

<style lang='less'>
	@import url('@/static/css/soloLessons.less');
</style>
