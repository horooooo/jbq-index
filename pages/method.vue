<template>
	<view class="article">
		<view class="title">
			{{methodContent.Title}}
		</view>
		<view class="content" v-html="methodContent.content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$store.state.imgUrl,
				methodContent: ''
			}
		},
		created() {},
		onLoad(option) {			this.getContent(option.id)		},		methods: {			getContent: function(id) {				let data = {}				let header = {					'content-type': 'application/x-www-form-urlencoded',					'Authorization': 'Bearer ' + this.$store.state.token				}				this.$req.doRequest('GET', '/submethod/Get/' + id, data, header).then(						res => {							// 获得数据							if (res.success) {								this.methodContent = res.response							}						})					.catch(res => {						console.log(res);					});			},
			onShareAppMessage(){
			},		}
	}
</script>

<style lang="less">
	@import url('../static/css/article.less');
</style>
