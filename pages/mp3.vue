<template>
	<view class="mp3">
		<p style="margin-top: 40px;">
			<img v-if="mp3.Orby == 4" :src="imgUrl + '/rulinwaishi.jpg'" class="img" alt="">
			<img v-if="mp3.Orby == 5" :src="imgUrl + '/zhaohuaxishi.png'" class="img" alt="">
			<img v-if="mp3.Orby == 6" :src="imgUrl + '/gtszylcd.jpg'" class="img" alt="">
			<img v-if="mp3.Orby == 7" :src="imgUrl + '/ltxz.jpg'" class="img" alt="">
			<img v-if="mp3.Orby == 8" :src="imgUrl + '/ltxz.jpg'" class="img" alt="">
		</p>
		<p style="margin-top: 40px;font-weight: 600;font-size: 16px;">{{mp3.Title}}</p>
		<p style="margin-top: 10px;color: #777777;margin-bottom: 40px;">{{mp3.FTitle}}</p>
		<x-adudio-play v-if="mp3.audiourl" :url='mp3.audiourl'></x-adudio-play>
	</view>
</template>

<script>
	import xAdudioPlay from '@/components/x-audio-play/x-audio-play.vue'
	export default {
		components: {
			xAdudioPlay
		},
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				mp3:'',
				startImg:'',//自定义播放按钮图标
				endImg:'',//自定义结束播放按钮图标
				activeColor:'',//已播放进度条背景色
				blockColor:'',//进度滑块颜色
				backgroundColor:'',//默认背景色
			}
		},
		created() {
		},
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
			getContent: function(id) {
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Lmvalue/Get/' + id, data, header).then(
						res => {
							this.mp3 = res.response
							console.log(this.mp3)
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

<style scoped lang="less">
	p{
		text-align: center;
		img{
			border-radius: 50%;
			width: 320px;
			height: 320px;
		}
	}
</style>
