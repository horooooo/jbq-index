<template>
	<view class="sign">
		<view class="card">
			<view class="list one">已累计签到</view>
			<view class="list two"><text>{{uday}}</text>天</view>
			<view class="list three">人的影响短暂而微弱，书的影响广泛而深远</view>
			<view class="list four">———— 普希金</view>
		</view>
		<view class="sign-list">
			<!-- <ul>
				<li>第1天</li>
				<li>第2天</li>
				<li>第3天</li>
				<li>第4天</li>
				<li>第5天</li>
				<li>第6天</li>
				<li>第7天</li>
			</ul> -->
			<!-- <ul>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
				<li><img :src="imgUrl + '/test-3.png'" alt=""></li>
			</ul>
			<ul>
				<li>+10</li>
				<li>+10</li>
				<li>+10</li>
				<li>+10</li>
				<li>+10</li>
				<li>+10</li>
				<li>+10</li>
			</ul> -->
		</view>
		<view class="button">
			<button v-if="!signIs" @tap="sign()"  style="background: #ff5658;color: #FFFFFF;">连续签到{{uday}}天</button>
			<button v-else>今日已签到</button>
		</view>
		<view class="tips" @tap="signTips = true">
			签到规则
		</view>
		<u-popup v-model="signTips" mode="bottom" height="80%">
			<view class="sign-tip">
				<view class="title">签到规则</view>
				<view class="tips">
					<p>1.签到获得1个积分</p>
					<p>2.7天连续签到积分从1分到7分</p>
				</view>
			</view>
		</u-popup>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				headUrl: this.$store.state.imgUrl + '/header.jpg',
				imgUrl: this.$store.state.imgUrl,
				signTips:false,
				signIs:false,
				uday:this.$store.state.userInfo.uday,
				day:new Date().getDay(),
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		components: {
			jiangli,
		},
		created() {
		},
		onLoad() {
			if(this.day === this.$store.state.signDate){
				this.signIs = true
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
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			sign: function() {
				let that = this
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/User/addday', data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								let date = new Date().getDay();
								that.$store.commit('pushSignDate', date)
								that.$refs.uToast.show({
									title: '签到成功',
									type: 'success',
								})
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
								that.uday++
								that.signIs = true
							}
						})
					.catch(res => {
						console.log(res);
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
							if(res.msg == '获取成功'){
								let data = JSON.parse(res.response)
								this.CurrencyMoney = data.jinbi
								this.CurrencyJifen = data.jifen
								this.showCurrencyClick()
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

<style lang="less">
	@import url('@/static/css/sign.less');
</style>
