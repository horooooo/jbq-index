<template>
	<view class="complain">
		<view class="deck">
			<textarea placeholder="请输入反馈的内容,我们会为您更好的服务" v-model="logo" />
			<br>
			<u-upload :action="action" :file-list="fileList" :header="header" @on-remove="onRemove"
				@on-success="onSuccess"  max-count="1"></u-upload>
		</view>
		<br>
		<br>
		<u-button type="primary" size="default" style="margin-top: 1rem;float: left;width: 100%;" @click="feedback()">提交</u-button>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				action: 'https://api.jbqjykj.com/images/Upload/Pic',
				fileList: [],
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				},
				imgList:[],
				logo:'',
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		components: {
			jiangli,
		},
		created() {
			this.isLogin()
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
			showCurrencyClick:function(){
				this.$refs.jiangli.showCurrencyClick();
			},
			isLogin: function() {
				if (!this.$store.state.loginIs) {
					uni.reLaunch({
						url: '/pages/login',
					});
				}
			},
			onRemove: function(index, lists) {},
			onSuccess: function(data, index, lists, name) {
				this.fileList = lists
			},
			feedback: function() {
				let that = this;
				for (let index in this.fileList) {
					that.imgList.push(that.$store.state.apiUrl + that.fileList[index].response.response)
				}
				let data = {
					uid: that.$store.state.userInfo.uID,
					logo:this.logo,
					content: JSON.stringify(that.imgList)
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				console.log(this.fileList)
				that.$req.doRequest('Post', '/feedback/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "感谢您的反馈",
									icon: "none"
								});
								if(res.response){
									let data = JSON.parse(res.response)
									this.CurrencyMoney = data.jinbi
									this.CurrencyJifen = data.jifen
									this.showCurrencyClick()
								}
								setTimeout(function(){
									uni.switchTab({
										url: '/pages/tabs/index',
									});
								},2000);
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
	@import url('@/static/css/complain.less');
</style>
