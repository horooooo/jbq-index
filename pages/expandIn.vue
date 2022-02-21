<!-- 拓展内页 -->
<template>
	<view class="expandIn">
		<view v-if="bookId == 1">
			<view class="title">儒林外史</view>
			<view class="c">
				<img :src="imgUrl + '/rulinwaishi.jpg'" class="img" alt="">
				<p>《儒林外史》代表着中国古代讽刺小说的高峰，它开创了以小说直接评价现实生活的范例。</p>
				<!-- <u-button :custom-style="expandInBtn" shape="circle" >订阅</u-button> -->
			</view>
		</view>
		<view v-if="bookId == 2">
			<view class="title">朝花夕拾</view>
			<view class="c">
				<img :src="imgUrl + '/zhaohuaxishi.png'" class="img" alt="">
				<p>此文集作为“回忆的记事”，多侧面地反映了作者鲁迅青少年时期的生活，形象地反映了他的性格和志趣的形成经过。</p>
			</view>
		</view>
		<view v-if="bookId == 3">
			<view class="title">飞鸟集</view>
			<view class="c">
				<img :src="imgUrl + '/feiniaoji.png'" class="img" alt="">
				<p>《飞鸟集》是印度诗人泰戈尔创作的诗集，它包括325首清丽的无标题小诗，首次出版于1916年。</p>
			</view>
		</view>
		<view v-if="bookId == 4">
			<view class="title">儒林外史音频</view>
			<view class="c">
				<img :src="imgUrl + '/rulinwaishi.jpg'" class="img" alt="">
				<p>《儒林外史》代表着中国古代讽刺小说的高峰，它开创了以小说直接评价现实生活的范例。</p>
			</view>
		</view>
		<view v-if="bookId == 5">
			<view class="title">朝花夕拾音频</view>
			<view class="c">
				<img :src="imgUrl + '/zhaohuaxishi.png'" class="img" alt="">
				<p>此文集作为“回忆的记事”，多侧面地反映了作者鲁迅青少年时期的生活，形象地反映了他的性格和志趣的形成经过。</p>
			</view>
		</view>
		<view v-if="bookId == 6">
			<view class="title">钢铁是怎样炼成的</view>
			<view class="c">
				<img :src="imgUrl + '/gtszylcd.jpg'" class="img" alt="">
				<p>《钢铁是怎样炼成的（青少版名著）》是奥斯特洛夫斯基(著);赵书花(译)创作的世界名著类书籍。</p>
			</view>
		</view>
		<view v-if="bookId == 7">
			<view class="title">骆驼祥子</view>
			<view class="c">
				<img :src="imgUrl + '/ltxz.jpg'" class="img" alt="">
				<p>描述了20世纪20年代军阀混战时期人力车夫的悲惨命运。祥子是旧社会劳苦大众的代表人物。</p>
			</view>
		</view>
		<view v-if="bookId == 8">
			<view class="title">窦娥冤</view>
			<view class="c">
				<img :src="imgUrl + '/dey.jpg'" class="img" alt="">
				<p>窦娥冤是元代戏曲家关汉卿创作的杂剧，反映了广大人民伸张正义、惩治邪恶的愿望</p>
			</view>
		</view>
		<view v-if="bookId == 9">
			<view class="title">鲁滨逊漂流记</view>
			<view class="c">
				<img :src="imgUrl + '/lbxplj.jpg'" class="img" alt="">
				<p>窦娥冤是元代戏曲家关汉卿创作的杂剧，反映了广大人民伸张正义、惩治邪恶的愿望</p>
			</view>
		</view>
		<view v-if="bookId == 10">
			<view class="title">文化苦旅</view>
			<view class="c">
				<img :src="imgUrl + '/whkl.jpg'" class="img" alt="">
				<p>《文化苦旅》是当代学者、作家余秋雨的一部散文集。于1992年首次出版</p>
			</view>
		</view>
		<ul>
			<li v-for="(item,index) in bookList2" :key="index" @click="goPage(item.Id)">{{item.FTitle}}</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				// 搜索
				search: '',
				// 订阅按钮样式
				expandInBtn:{
					position: 'absolute',
					bottom: '10px',
					right: '0',
					background: '#54c1fc',
					width: '80px',
					height: '26px',
					lineHeight: '26px',
					color: '#FFFFFF',
					border:' 0',
				},
				bookList:[],
				bookId:0,
				bookList2:[],
				page:1,
			}
		},
		created() {
			this.getLmValue()
		},
		onLoad(option) {
			this.bookId = option.id
		},
		onPullDownRefresh() {
		    uni.stopPullDownRefresh()
		    uni.showToast({
		    	title: "刷新成功",
		    	icon: "none"
		    });
		},
		methods: {
			getLmValue: function() {
				let that = this
				let data = {
					page: this.page,
					intPageSize:200,
				}
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Lmvalue/Get', data, header).then(
						res => {
							// 获得数据
							let list = res.response.data
							if (res.success) {
								for (let index in list) {
									if (list[index].Lmid == 3) {
										that.bookList.push(list[index])
									}
								}
								if(this.page < res.response.pageCount){
									this.getLmValue(this.page++)
								} else {
									that.getBookList()
								}
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			getBookList:function(){
				for(let index in this.bookList){
					if(this.bookList[index].Orby == this.bookId){
						this.bookList2.push(this.bookList[index])
					}
				}
				let arr = this.bookList2
				for(let i = 0; i < arr.length - 1; i++){
					for(let j = 0; j < arr.length - 1 - i; j++){
						let a = arr[j]
						let b = arr[j + 1]
						if (parseInt(a.Fileurl) > parseInt(b.Fileurl)) {
						      arr[j] = b;
						      arr[j + 1] = a;
						}
					}
				}
			},
			goPage:function(id){
				if(this.bookId == 1 || this.bookId == 2 || this.bookId == 3 || this.bookId == 8 || this.bookId == 9 || this.bookId == 10){
					this.$u.route({
						url: 'pages/book?id='+id,
					})
				} else{
					this.$u.route({
						url: 'pages/mp3?id='+id,
					})
				}
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
