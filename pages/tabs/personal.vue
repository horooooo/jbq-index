<template>
	<view class="personal">
		<view class="header">
			<view class="top">
				<view class="left">
					<img class="vip-img" :src="imgUrl + '/icon/vip.png'" alt="" v-if="isvip">
					<img :src="userInfo.upic" alt="">
				</view>
				<view class="center">
					<view class="line" style="line-height: 30px;">
						<b style="font-size: 16px;">{{userInfo.name}}</b>
					</view>
					<view class="line" style="line-height: 25px;">
						<span>帐号：{{userInfo.uLoginName}}</span>
					</view>
					<view class="line" style="line-height: 15px;">
						<navigator url="/pages/integral">
							 <span>等级：LV{{Math.ceil(userInfo.jifen/100)}}</span> <span>积分：{{userInfo.jifen}}/{{Math.ceil(userInfo.jifen/100)*100}}</span>
						</navigator>
					</view>
				</view>
				<view class="right">
					<navigator url="/pages/sign">
						<button>签到</button>
					</navigator>
					<br>
					<button @tap="intoUrl('vip')" style="margin-top: 5px;">立即充值</button>
				</view>
			</view>
			<view class="bottom">
				<view class="block">
					<view class="info"><span>{{userInfo.uday}}</span>天</view>
					<view class="tip">已登录</view>
				</view>
				<view class="block">
					<view class="info"><span>{{userInfo.udate/10}}</span></view>
					<view class="tip">学习力</view>
				</view>
				<view class="block">
					<view class="info"><span>{{userInfo.udate}}</span>分钟</view>
					<view class="tip">学习时长</view>
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="list">
				<view class="option"><img :src="imgUrl + '/icon/person-icon-1.png'" alt="" @tap="memberTips = true"><br>会员福利</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-2.png'" alt="" @tap="intoUrl('shopping/sign')"><br>商城</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-3.png'" alt="" @tap="intoUrl('achievement')"><br>成就</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-4.png'" alt="" @tap="intoUrl('friendRequest')"><br>好友</view>
			</view>
			<!-- <view class="list">
				<view class="option"><img :src="imgUrl + '/icon/person-icon-5.png'" alt=""><br>代付款</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-6.png'" alt=""><br>待发货</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-7.png'" alt=""><br>待收货</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-8.png'" alt=""><br>评价</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-9.png'" alt=""><br>售后</view>
			</view> -->
			<view class="list">
				<view class="option"><img :src="imgUrl + '/icon/person-icon-10.png'" alt=""><br>客服</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-11.png'" alt="" @tap="intoUrl('personalData')"><br>设置</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-12.png'" alt="" @tap="intoUrl('addFamilyTwo')"><br>家人</view>
				<view class="option"><img :src="imgUrl + '/icon/person-icon-13.png'" alt="" @tap="intoUrl('inviteCode')"><br>邀请码</view>
				<!-- <view class="option"><img :src="imgUrl + '/test/test2.png'" alt=""><br>消息</view> -->
			</view>
		</view>
		<u-popup v-model="memberTips" mode="bottom" height="80%">
			<view class="member-tip">
				<view class="title">会员福利</view>
				<view class="tips">
					<p>1.1人充值成为会员，可以添加全家成员成为会员（全家成员指的是父亲母亲和儿女）</p>
					<p>2.科学的将学习方法融入程序，让孩子在使用软件的过程中潜移默化的掌握学习方法</p>
					<p>3.孩子在使用软件时，不孤单，家长可关注，让孩子情感正向发展</p>
					<p>4.家长对孩子的作业，分享内容进行点赞、评价，正向积极鼓励孩子</p>
					<p>5.会员可以使用系统所有功能，家长可以获得积分，孩子可以获得积分和奖励</p>
					<p>6.会员可参加公司后续组织举行的各种竞赛</p>
					<p>7.平台获得的红包奖励等，均可以在商城或支付会员费用，1元人民币=1金盾币</p>
					<p>8.会员在分享小程序到朋友圈，有5人注册并支付成为会员，可返还当月会员费用</p>
					<p>9.会员可以在平台评价、分享、打赏他人的作品和平台的内容</p>
					<p>10.会员可上传分享自己的作品，比如视频、文章、狼人杀剧本、音乐、朗诵等</p>
					<p>11.会员获得的红包和奖励可兑现</p>
					<p>12.会员商城购物有优惠；选中商品后，完成支付（假如价格为300元），在分享给朋友后，有5人成功购买后，返还全部金额300金盾币到个人账户</p>
					<p>13.会员充值享受充500元赠100元，1000元赠200元活动，并享受商城各种优惠活动</p>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	export default {
		data() {
			return {
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				imgUrl: this.$store.state.imgUrl,
				memberTips:false,
				userInfo:this.$store.state.userInfo,
				isvip:this.$store.state.isvip,
			}
		},
		created() {
			this.isLogin()
			console.log(this.$store.state.isvip)
		},
		onLoad() {},
		methods: {
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
			intoUrl: function(url) {
				uni.navigateTo({
					url: '/pages/'+ url,
				});
			},
			onShareAppMessage(res){
				console.log(this.userInfo.uID)
				if(res.from == 'button'){
					return{
						title:'邀请码分享',
						path:'/pages/tabs/index?shareCode=JBQ' + this.userInfo.uID,
						type:0,
					}
				}
			},
		}
	}
</script>
<style lang='less'>
	@import url('@/static/css/tabs/personal.less');
</style>
