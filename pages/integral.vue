<template>
	<view class="integral">
		<view class="my-integral">
			我的积分：<span>{{userInfo.jifen}}</span>分
		</view>
		<view class="table">
			<ul>
				<li style="color: #ffb633;font-weight: 600;">
					<view>序号</view>
					<view>分数</view>
					<view>内容</view>
				</li>
				<li v-for="(item,index) in cznoteData" :key="index">
					<view>{{index+1}}</view>
					<view>{{item.endnum}}</view>
					<view>{{item.Title}}</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				userInfo:this.$store.state.userInfo,
				cznoteData:'',
			}
		},
		created() {
			this.getContent()
		},
		onLoad() {},
		methods: {
			getContent: function() {
				let data = {}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/cznote/Get', data, header).then(
						res => {
							// 获得数据
							if (res.success) {
								this.cznoteData = res.response.data
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			onShareAppMessage(){
			},
		}
	}
</script>

<style lang='less'>
	@import url('@/static/css/integral.less');
</style>
