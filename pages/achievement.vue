<template>
	<view class="achievement">
		<view class="list" style="display: flex;align-items: center;">
			我的积分：<span>{{userInfo.jifen}}</span>分
		</view>
		<view class="list" style="display: flex;align-items: center;">
			<img :src="imgUrl + '/money_1.png'" style="width: 30px;height: 30px;margin-right: 5px;" alt="">牛盾币：<span>{{money1}}</span>
		</view>
		<!-- <view class="list" style="display: flex;align-items: center;">
			<img :src="imgUrl + '/money_3.png'" style="width: 30px;height: 30px;margin-right: 5px;" alt="">银盾币：<span>{{userInfo.umoney/100}}</span>
		</view> -->
		<view class="list" style="display: flex;align-items: center;">
			<img :src="imgUrl + '/money_2.png'" style="width: 30px;height: 30px;margin-right: 5px;" alt="">金盾币：<span>{{money3}}</span>
		</view>
		<!-- <view class="list">
			鲜花碎片：<span>3</span>片
		</view>
		<view class="title">
			我的礼物
		</view>
		<view class="list">
			<view class="gift"><img :src="imgUrl + '/liwu1.png'" alt=""><br>火箭5个</view>
			<view class="gift"><img :src="imgUrl + '/liwu1.png'" alt=""><br>火箭5个</view>
			<view class="gift"><img :src="imgUrl + '/liwu1.png'" alt=""><br>火箭5个</view>
			<view class="gift"><img :src="imgUrl + '/liwu1.png'" alt=""><br>火箭5个</view>
			<view class="gift"><img :src="imgUrl + '/liwu1.png'" alt=""><br>火箭5个</view>
		</view> -->
		<!-- <view class="list money">
			金币：<span>10</span>个
			银币：<span>10</span>个
			铜币：<span>10</span>个
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				userInfo:this.$store.state.userInfo,
				money1:this.$store.state.money1,
				money3:this.$store.state.money3,
			}
		},
		created() {
			console.log(this.userInfo)
			this.RefreshToken()
		},
		onLoad() {},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			RefreshToken:function(){
				let that = this
				let data = {
					token:this.$store.state.token
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Login/RefreshToken', data, header).then(
						res => {
							// 获得数据
							if(res.success){
								let userInfo = JSON.parse(res.response)
								that.$store.commit('pushLoginIs', true)
								that.$store.commit('pushMoney1', userInfo.umoney)
								that.$store.commit('pushMoney3', userInfo.unum)
								that.$store.commit('pushIsVip', userInfo.isvip)
								that.$store.commit('pushToken', userInfo.token)
								that.$store.commit('pushUserInfo', userInfo)
								this.userInfo = userInfo
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
				return{
					title:'邀请码分享',
					path:'/pages/tabs/index?shareCode=JBQ' + this.userInfo.uID,
					type:0,
				}
			},
			onShareTimeline(){},
		}
	}
</script>

<style lang="less">
	@import url("@/static/css/achievement.less");
</style>
