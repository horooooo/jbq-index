<template>
	<view class="index">
		<view class="header">
			<span>全国第一个孩子和父母共同学习的平台</span>
			<view class="feedback">
				<navigator url="/pages/complain">
					<img :src="imgUrl + '/icon/fankui.png'" alt="">
				</navigator>
			</view>
		</view>
		<view class="header-img" style="height: 170px;" v-show="VideoSwitch != 'hide'">
			<video :autoplay="false" :show-fullscreen-btn="false" play-btn-position="center" :controls="true"
				:src="rootUrl + '/wx-app/mp3/index_advertisement_1.mp4'" style="width: 90%;height: 170px;"></video>
		</view>
		<view class="header-img" @click="student()">
			<img :src="imgUrl + '/index_banner.png'" alt="">
		</view>
		<view class="banner-1">
			<img :src="imgUrl + '/banner-1.jpg'" alt="">
		</view>
		<view class="banner-tips">
			<p>助力家长成为教育专家</p>
			<p>助力孩子成功，未来幸福生活</p>
			<p>助力您的家庭和谐美好</p>
		</view>
		<view class="banner-2">
			<img :src="imgUrl + '/banner-2.jpg'" alt="">
		</view>
		<!-- <view class="select">
			<u-button type="primary" size="default" @click="intoUrl('linkWeb?url=https://ykt.eduyun.cn/ykt/sjykt/index.html/')">国家中小学网络云平台</u-button>
			<u-button type="primary" size="default" @click="intoUrl('linkWeb?url=https://www.eduyun.cn/')">国家教育资源公共服务平台</u-button>
		</view> -->
		<view class="background-plate"></view>
		<!-- 弹出层-会员 -->
		<!-- <u-button type="primary" size="medium" @click="showVip = true" style="margin: 20px 0 0 20px;">弹出会员</u-button> -->
		<!-- 弹出层-会员-->
		<u-mask :show="showVip" @click="showVip = false">
			<view class="popUpVip" >
				<view class="content" @tap.stop>
					<img :src="imgUrl + '/41.gif'" class="img" alt="">
					<view class="txt">
						<image :src="userInfo.upic" class="ava" mode=""></image>
						<h2>昵称：{{userInfo.name}}</h2>
						<h2>等级：VIP</h2>
						<h2>称号：新手小白</h2>
						<h2>积分：{{CurrencyJifen}}分</h2>
						<h2>牛盾币：{{CurrencyMoney}}</h2>
						<!-- <view class="btn">
							<u-button   type="warning" size="medium" class="btn" shape="circle">点击查看</u-button>
						</view> -->
						<p>恭喜您成为我们的会员</p>
						<h2>获得新手大礼包一份</h2>
					</view>
					<u-icon name="close" color="#ffffff" size="50" @click="showVip = false" class="close"></u-icon>
				</view>
			</view>
		</u-mask>

		<!-- 弹出层-分享 -->
		<!-- <u-button type="primary" size="medium" @click="showShare = true" style="margin: 20px 0 0 20px;">弹出分享</u-button> -->
		<!-- 弹出层-分享 -->
		<u-mask :show="showShare"  @click="showShare = false">
			<view class="popUpShare" >
				<view class="content">
					<image :src="imgUrl + '/shopping/ava1.png'"  @tap.stop class="ava" mode=""></image>
					<view class="text"  @tap.stop>
						<h2>姓名：{{userInfo.name}}</h2>
						<h2>会员状态：VIP</h2>
						<h2>会员称呼：新手小白</h2>
						<h2>积分：{{userInfo.jifen}}分</h2>
						<h2>会员推荐码：001</h2>
						<view class="link"></view>
						<p>
							系统提示每人有50个推荐名额，分享2人以上并有2人注册成功，则双方获得金盾币3~10个（金币可购物，可交会员费）
						</p>
						<!-- <view class="btn">
							<u-button   type="primary" size="medium" class="btn" shape="circle">点击分享</u-button>
						</view> -->
					</view>
					<u-icon name="close" color="#ffffff" size="50" @click="showShare = false" class="close"></u-icon>
				</view>
			</view>
		</u-mask>
		<!-- 弹出层-牛盾币 -->
		<!-- <u-button type="primary" size="medium" @click="showCurrency = true" style="margin: 20px 0 0 20px;">弹出牛顿币</u-button> -->
		<!-- 弹出层-牛盾币-->
		<!-- <u-mask :show="showCurrency" @click="showCurrency = false">
			<view class="popCurrency" >
				<view class="content">
					<image :src="imgUrl + '/shopping/jl.png'"  @tap.stop  class="ava" mode=""></image>
					<view class="qb qb1" @tap.stop> <b>+30000</b> 牛盾币</view>
					<view class="qb qb2" @tap.stop> <b>+30</b> 积分</view>
					<u-button class="btn" :custom-style="popCurrencyBtn" shape="circle" @click="showCurrency = false">领取</u-button>
				</view>
				<u-icon name="close" color="#ffffff" size="50" @click="showShare = false" class="close"></u-icon>
			</view>
		</u-mask> -->
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				// 弹出层-会员
				showVip: false,
				// 弹出层-分享
				showShare: false,
				// 弹出层-牛盾币
				showCurrency: false,
				// 弹出层-牛盾币 按钮样式
				// popCurrencyBtn:{
				// 	width:'450rpx',
				// 	height: '100rpx',
				// 	border: '0',
				// 	color: '#711804',
				// 	fontWeight: '700',
				// 	fontSize: '46rpx',
				// 	zIndex: '3',
				// 	background: 'rgba(255,255,255,0)',
				// },
				userInfo:this.$store.state.userInfo,
				rootUrl:this.$store.state.rootUrl,
				CurrencyMoney:0,
				CurrencyJifen:0,
				VideoSwitch:'hide',
			}
		},
		components: {
			jiangli,
		},
		created() {
			// console.log(this.$store.state.userInfo)
			this.getMediaSwith()
		},
		onLoad(option) {
	
			if(option.shareCode){
				this.$store.commit('pushShareCode',option.shareCode)
			}
			this.isLogin()
			if(this.$store.state.shareCode){
				this.getActivityCode(this.$store.state.shareCode)
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
			onShareAppMessage(){},
			onShareTimeline(){
			},
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			isLogin: function() {
				if (this.$store.state.loginIs) {
					global.countMin()
					this.getActivityIs(1)
				}
			},
			getMediaSwith:function(){
				let that = this
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Advertisement/Isshow', {}, header).then(
						res => {
							// 获得数据
							that.$store.commit('pushSwitch', res.response)
							this.VideoSwitch = res.response
						})
					.catch(res => {
						console.log(res);
					});
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
			student: function() {
				uni.switchTab({
				url: '/pages/tabs/student'
				});
			},
			getActivityIs:function(id){
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/CZConfig/isget/'+id, data, header).then(
						res => {
							// 获得数据
							if(res.msg != '已参与'){
								this.getActivity(id)
							}
							console.log(res)
						})
					.catch(res => {
						console.log(res);
					});
			},
			intoUrl: function(url) {
				uni.navigateTo({
					url: '/pages/'+ url,
				});
			},
			getActivity:function(id){
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/CZConfig/get/'+id, data, header).then(
						res => {
							// 获得数据
							this.CurrencyMoney = data.jinbi
							this.CurrencyJifen = data.jifen
							this.showVip = true
						})
					.catch(res => {
						console.log(res);
					});
			},
		}
	}
</script>
<style lang='less'>
	@import url('@/static/css/tabs/index.less');
	/* 弹出层会员 */
	.popUpVip {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;

		.content {
			width: 100%;
			position: absolute;
			top: 20%;
			left: 0;

			.img{
				width: 100%;
				height: 850rpx;
			}

			.txt {
				width: 100%;
				position: absolute;
				left: 0;
				top: 320rpx;

				.ava {
					display: block;
					width: 100rpx;
					height: 100rpx;
					margin: 0 auto;
					border-radius: 50%;
				}

				h2 {
					color: #ffffff;
					font-size: 28rpx;
					text-align: center;
					margin: 8rpx 0 0;
				}

				.btn {
					width: 264rpx;
					margin: 40rpx auto 0;
						
				}

				p {
					color: #FFFFFF;
					font-size: 36rpx;
					text-align: center;
					margin: 50rpx 0 0;
				}

			}

			.close {
				position: absolute;
				right: 40rpx;
				top: 20rpx;
				border: 2px #FFFFFF solid;
				border-radius: 50%;
				text-align: center;
				line-height: 50rpx;
			}
		}

	}
    /* 弹出层分享 */
	.popUpShare {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;

		.content{
			width: 100%;
			position: absolute;
			top: 20%;
			left: 0;
			
			.ava{
				display: block;
				width: 240rpx;
				height: 240rpx;
				margin: auto;
				position: relative;
				z-index: 2;
				border-radius: 50%;
			}
			
			.text{
				
				position: relative;
				top:-140rpx;
				z-index: 1;
				border-radius: 30rpx;
				width: 90%;
				margin: auto;
				padding:180rpx 40rpx 40rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				h2{
					font-weight: 700;
					font-size: 32rpx;
					color: #333333;
					padding: 0 40rpx;
					margin-top: 8rpx;
				}
				.link{
					width: 100%;
					height: 4rpx;
					background: #aae0fe;
					margin: 30rpx 0 0;
				}
				p{
					font-weight: 500;
					font-size: 32rpx;
					color: #333333;
					padding: 0;
					margin-top: 30rpx;
					line-height: 50rpx;
				}
				.btn {
					width: 264rpx;
					margin: 70rpx auto 0;
				}
				
			}
			
			.close {
				position: absolute;
				right: 40rpx;
				top: 20rpx;
				border: 2px #FFFFFF solid;
				border-radius: 50%;
				text-align: center;
				line-height: 50rpx;
			}
		}
	}
	/* 弹出层牛盾币 */
	/* .popCurrency{
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		.content{
			width: 100%;
			position: absolute;
			top: 20%;
			left: 0;
			.ava{
				display: block;
				width: 750rpx;
				height:848rpx;
				margin: auto;
				position: relative;
				z-index: 2;
			}
			.qb{
				position: absolute;
				width: 440rpx;
				left:165rpx;
				font-size: 25rpx;
				color: #e96332;
				font-weight: 700;
				text-align: center;
				z-index: 12;
				display: flex;
				justify-content: center;
				align-items: baseline;
				b{
					font-size: 50rpx;
					margin-right: 10rpx;
					color: #e96332;
					z-index: 99999;
					margin-left: -45rpx;
				}
			}
			.qb1{
				top:475rpx;
			}
			.qb2{
				top:558rpx;
			}
			.btn{
				width: 450rpx;
				height: 100rpx;
				border: 0;
				position: absolute;
				bottom:20rpx;
				left: 50%;
				margin-left: -220rpx;
				color: #711804;
				font-weight: 700;
				font-size: 46rpx;
				z-index: 3;
				background: rgba(255,255,255,0);
			}
			
		}
		
		.close {
			position: absolute;
			left: 50%;
			margin-left:-25rpx ;
			top: 1200rpx;
			border: 2px #FFFFFF solid;
			border-radius: 50%;
			text-align: center;
			line-height: 50rpx;
		}
	} */

</style>
