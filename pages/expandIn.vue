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
				<p>《鲁滨逊漂流记》是英国作家丹尼尔·笛福的一部长篇小说。该书首次出版于1719年4月25日。</p>
			</view>
		</view>
		<view v-if="bookId == 10">
			<view class="title">文化苦旅</view>
			<view class="c">
				<img :src="imgUrl + '/whkl.jpg'" class="img" alt="">
				<p>《文化苦旅》是当代学者、作家余秋雨的一部散文集。于1992年首次出版</p>
			</view>
		</view>
		<view v-if="bookId == 11">
			<view class="title">名人传</view>
			<view class="c">
				<img :src="imgUrl + '/mrz.jpg'" class="img" alt="">
				<p>《名人传》，是由19世纪末20世纪初法国著名的批判现实主义作家罗曼·罗兰创作的人物传记作品</p>
			</view>
		</view>
		<view v-if="bookId == 12">
			<view class="title">少年维持的烦恼</view>
			<view class="c">
				<img :src="imgUrl + '/snwtzfn.jpg'" class="img" alt="">
				<p>《少年维特的烦恼》是德国作家歌德创作的中篇小说。该书于1774年秋天在莱比锡书籍展览会上面世，并在那里成了畅销书</p>
			</view>
		</view>
		<view v-if="bookId == 13">
			<view class="title">小王子</view>
			<view class="c">
				<img :src="imgUrl + '/xwz.jpg'" class="img" alt="">
				<p>《小王子》是法国作家安托万·德·圣·埃克苏佩里于1942年写成的著名儿童文学短篇小说。</p>
			</view>
		</view>
		<!-- <view v-if="bookId == 14">
			<view class="title">平凡的世界(1)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 15">
			<view class="title">平凡的世界(2)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 16">
			<view class="title">平凡的世界(3)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view> -->
		<view v-if="bookId == 17">
			<view class="title">海底两万里(1)</view>
			<view class="c">
				<img :src="imgUrl + '/hdlwl1.jpg'" class="img" alt="">
				<p>《海底两万里》是法国作家儒勒·凡尔纳创作的长篇小说，是“凡尔纳三部曲”的第二部。</p>
			</view>
		</view>
		<view v-if="bookId == 18">
			<view class="title">海底两万里(2)</view>
			<view class="c">
				<img :src="imgUrl + '/hdlwl2.jpg'" class="img" alt="">
				<p>《海底两万里》是法国作家儒勒·凡尔纳创作的长篇小说，是“凡尔纳三部曲”的第二部。</p>
			</view>
		</view>
		<view v-if="bookId == 19">
			<view class="title">名人传</view>
			<view class="c">
				<img :src="imgUrl + '/mrz.jpg'" class="img" alt="">
				<p>《名人传》，是由19世纪末20世纪初法国著名的批判现实主义作家罗曼·罗兰创作的人物传记作品</p>
			</view>
		</view>
		<view v-if="bookId == 20">
			<view class="title">少年维持的烦恼</view>
			<view class="c">
				<img :src="imgUrl + '/snwtzfn.jpg'" class="img" alt="">
				<p>《少年维特的烦恼》是德国作家歌德创作的中篇小说。该书于1774年秋天在莱比锡书籍展览会上面世，并在那里成了畅销书</p>
			</view>
		</view>
		<view v-if="bookId == 21">
			<view class="title">小王子</view>
			<view class="c">
				<img :src="imgUrl + '/xwz.jpg'" class="img" alt="">
				<p>《小王子》是法国作家安托万·德·圣·埃克苏佩里于1942年写成的著名儿童文学短篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 22">
			<view class="title">平凡的世界(1)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 23">
			<view class="title">平凡的世界(2)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 24">
			<view class="title">平凡的世界(3)</view>
			<view class="c">
				<img :src="imgUrl + '/pfdsj.jpg'" class="img" alt="">
				<p>《平凡的世界》是中国作家路遥创作的一部全景式地表现中国当代城乡社会生活的百万字长篇小说。</p>
			</view>
		</view>
		<view v-if="bookId == 25">
			<view class="title">海底两万里(1)</view>
			<view class="c">
				<img :src="imgUrl + '/hdlwl1.jpg'" class="img" alt="">
				<p>《海底两万里》是法国作家儒勒·凡尔纳创作的长篇小说，是“凡尔纳三部曲”的第二部。</p>
			</view>
		</view>
		<view v-if="bookId == 26">
			<view class="title">海底两万里(2)</view>
			<view class="c">
				<img :src="imgUrl + '/hdlwl2.jpg'" class="img" alt="">
				<p>《海底两万里》是法国作家儒勒·凡尔纳创作的长篇小说，是“凡尔纳三部曲”的第二部。</p>
			</view>
		</view>
		<view v-if="bookId == 27">
			<view class="title">文化苦旅</view>
			<view class="c">
				<img :src="imgUrl + '/whkl.jpg'" class="img" alt="">
				<p>《文化苦旅》是当代学者、作家余秋雨的一部散文集。于1992年首次出版</p>
			</view>
		</view>
		<view v-if="bookId == 28">
			<view class="title">爱的教育</view>
			<view class="c">
				<img :src="imgUrl + '/dzs28.jpg'" class="img" alt="">
				<p>是意大利作家埃迪蒙托·德·亚米契斯创作的长篇日记体小说</p>
			</view>
		</view>
		<view v-if="bookId == 29">
			<view class="title">繁星春水</view>
			<view class="c">
				<img :src="imgUrl + '/dzs29.jpg'" class="img" alt="">
				<p>我国现代著名女作家冰心创作的两部诗集，二者是姊妹篇，均创作于1923年</p>
			</view>
		</view>
		<view v-if="bookId == 30">
			<view class="title">钢铁是怎样炼成的</view>
			<view class="c">
				<img :src="imgUrl + '/dzs30.jpg'" class="img" alt="">
				<p>是前苏联作家尼古拉·奥斯特洛夫斯基所著的一部长篇小说，于1933年写成</p>
			</view>
		</view>
		<view v-if="bookId == 31">
			<view class="title">假如给我三天光明</view>
			<view class="c">
				<img :src="imgUrl + '/dzs31.jpg'" class="img" alt="">
				<p>是美国当代作家海伦·凯勒的散文代表作</p>
			</view>
		</view>
		<view v-if="bookId == 32">
			<view class="title">昆虫记</view>
			<view class="c">
				<img :src="imgUrl + '/dzs32.jpg'" class="img" alt="">
				<p>是法国昆虫学家、文学家让-亨利·卡西米尔·法布尔创作的长篇生物学著作，共十卷。</p>
			</view>
		</view>
		<view v-if="bookId == 33">
			<view class="title">老人与海</view>
			<view class="c">
				<img :src="imgUrl + '/dzs33.jpg'" class="img" alt="">
				<p>是美国作家海明威于1951年在古巴写的一篇中篇小说，于1952年出版</p>
			</view>
		</view>
		<view v-if="bookId == 34">
			<view class="title">呐喊</view>
			<view class="c">
				<img :src="imgUrl + '/dzs34.jpg'" class="img" alt="">
				<p>是现代文学家鲁迅的短篇小说集，收录鲁迅于1918年至1922年所作的14篇短篇小说</p>
			</view>
		</view>
		<view v-if="bookId == 35">
			<view class="title">男生贾里</view>
			<view class="c">
				<img :src="imgUrl + '/dzs35.jpg'" class="img" alt="">
				<p>该书主要讲述一个名叫贾里的男生身边所发生的事情。</p>
			</view>
		</view>
		<view v-if="bookId == 36">
			<view class="title">女生贾梅</view>
			<view class="c">
				<img :src="imgUrl + '/dzs36.jpg'" class="img" alt="">
				<p>是2011年少年儿童出版社出版的图书，该书是秦文君的儿童文学作品</p>
			</view>
		</view>
		<view v-if="bookId == 37">
			<view class="title">威尼斯商人</view>
			<view class="c">
				<img :src="imgUrl + '/dzs37.jpg'" class="img" alt="">
				<p>是英国戏剧家威廉·莎士比亚创作的戏剧，是一部具有讽刺性的喜剧。</p>
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
					intPageSize:2000,
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
				console.log(this.bookList2)
			},
			goPage:function(id){
				if(this.bookId == 1 || this.bookId == 2 || this.bookId == 3 || this.bookId == 8 || this.bookId == 9 || this.bookId == 10 || this.bookId == 11 || this.bookId == 12
				 || this.bookId == 13 || this.bookId == 14 || this.bookId == 15 || this.bookId == 16 || this.bookId == 17 || this.bookId == 18){
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
			onShareTimeline(){},
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
