<!-- 拓展内页 -->
<template>
	<view class="book">
		<view v-html="book.Memo" style="padding: 10px 10px;">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				book:''
			}
		},
		created() {
		},
		onLoad(option) {
			this.getContent(option.id)
		},
		methods: {
			getContent: function(id) {
				let data = {
					intPageSize:200,
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Lmvalue/Get/' + id, data, header).then(
						res => {
							this.book = res.response
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

<style lang="less">
	.clear {
		clear: both;
		content: "";
		display: block;
	}

	.expandIn{
		padding:  20px;
		.title{
			font-size: 18px;
			font-weight: 500;
			color: #333333;
			
		}
		
		.c{
			margin: 20px 0 0;
			padding-bottom: 10px;
			position: relative;
			border-bottom: 1px #f2f2f2 solid;
			.img{
				width: 30%;
				height: 200rpx;
				display: block;
				float: left;
			}
			p{
				float: right;
				font-size: 14px;
				color: #333333;
				line-height: 21px;
				width: 65%;
				padding: 10px 0 30px;
			}
			
			.btn{
				position: absolute;
				bottom: 10px;
				right: 0;
				background: #54c1fc;
				width: 80px;
				height: 26px;
				line-height: 26px;
				color: #FFFFFF;
				border: 0;
				
			}
			&::after{
				.clear
			}
		}
		
		ul{
			padding: 0;
		
			li{
				width: 100%;
				list-style-type:none;
				height: 40px;
				line-height: 40px;
				font-size: 16px;
				color: #333333;
				border-bottom: 1px #f2f2f2 solid;
			}
			
		}
	
	
	}

</style>
