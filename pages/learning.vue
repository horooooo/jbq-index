<template>
	<view class="learning">
		<!-- <header>课程预习</header> -->
		<view class="steps">
			<u-steps :list="numList" :current="current" active-color="#54c1fc"></u-steps>
		</view>
		<view class="title">
			<text>{{title}}</text> <input type="text" style="width: 200px;">
		</view>
		<div id="jsmind_container"></div>
		<view class="step-content">
			<view class="step-title" v-for="(item, index) in stepInputList" :key="index">
				<text v-if="index == current">{{index + 1}}.{{item.name}}</text>
			</view>
			<view class="input-list">
				<view class="list" v-for="(item, index) in stepInputList[current].list">
					<text>{{item.name}}</text><input type="text" v-model="item.value">
				</view>
			</view>
		</view>
		<view class="step-button">
			<u-button v-if="current != 0" @click="currentPage('subtract')">上一页</u-button>
			<u-button type="primary" v-if="current != 4" @click="currentPage('add')">下一页</u-button>
			<u-button type="primary" v-else @click="submitBusywork()">提交作业</u-button>
		</view>
		<view class="json-list" v-show="workListShow">
			<view class="list" v-for="(item, index) in stepInputList">
				<view class="title">{{item.name}}</view>
				<view class="content" v-for="(item2,index) in item.list">
					<text class="label">{{item2.name}}</text><text class="value">{{item2.value}}</text>
				</view>
			</view>
			<text style="width: 100%;float: left;text-align: center;margin: 10px auto;color: #82848A;">今日复习已完成</text>
		</view>
		<jiangli ref="jiangli" :CurrencyMoney="CurrencyMoney" :CurrencyJifen="CurrencyJifen"></jiangli>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import jiangli from '@/pages/include/jiangli.vue';
	export default {
		data() {
			return {
				numListData: [
					{title:[{name: '作者生平'}, {name: '文章结构'}, {name: '中心思想'}, {name: '课程精华'}, {name: '重点词汇'}]},
					{title:[{name: '预习主题'}, {name: '包含小节'}, {name: '小节内容'}, {name: '小节内容'}, {name: '内容汇总'}]},
					{title:[{name: '预习主题'}, {name: '新单词'}, {name: '情景分析'}, {name: '内容汇总'}]},
					{title:[{name: '预习主题'}, {name: '朝代概述'}, {name: '帝王脉络'}, {name: '文化建设'}, {name: '军事战争'}, {name: '假如穿越'}]},
					],
				numList:'',
				titleData:['文章名称','预习主题','Topic of the lesson'],
				title:'',
				current: 0,
				workListShow:false,
				stepInputListData: [
					{data:[
							{name:'作者生平',list: [{name: '原名',value:''}, {name: '字',value:''}, {name: '号',value:''}, {name: '时期',value:''}, {name: '作品',value:''}]},
							{name:'作者生平',list: [{name: '文章类别',value:''}, {name: '文章分段',value:''}, {name: '承上启下',value:''}, {name: '自然段落',value:''}, {name: '文章开头',value:''}, {name: '文章结尾',value:''}, {name: '修辞手法',value:''}]},
							{name:'中心思想',list: [{name: '中心思想',value:''}]},
							{name:'课程精华',list: [{name: '名言警句',value:''}, {name: '段落积累',value:''}, {name: '画龙点睛',value:''}]},
							{name:'重点词汇',list: [{name: '读读写写',value:''}, {name: '日积月累',value:''}, {name: '读读记记',value:''}]},
					]},
					{data:[
							{name:'包含小节',list: [{name: '小节总数',value:''}, {name: '小节1',value:''}, {name: '小节2',value:''}, {name: '小节3',value:''}, {name: '小节4',value:''}]},
							{name:'小节1',list: [{name: '概念名词',value:''}, {name: '概念定义',value:''}, {name: '公式定理',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节2',list: [{name: '公式定理',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节3',list: [{name: '概念名词',value:''}, {name: '概念定义',value:''}, {name: '公式定理',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节4',list: [{name: '概念名词',value:''}, {name: '概念定义',value:''}, {name: '公式定理',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
					]},
					{data:[
							{name:'Read  and Try to translate ',list: []},
							{name:'The new words',list: [{name: '1.',value:''}, {name: '2.',value:''}, {name: '3.',value:''}, {name: '4.',value:''}, {name: '5.',value:''}, {name: '6.',value:''}, {name: '7.',value:''}]},
							{name:'Scene analiysis(When does the scene happen?)',list: [{name: 'question 1 The answer is',value:''}, {name: 'question 2 The answer is',value:''}, {name: 'question 3 The answer is',value:''}]},
							{name:'phrase 词组',list: [{name: 'phrase 1',value:''}, {name: 'phrase 1',value:''}, {name: 'phrase 1',value:''}]},
					]},
					{data:[
							{name:'朝代概述',list: [{name: '朝代存在纪元（公元前、公元后）',value:''},{name: '建朝时间',value:''},{name: '灭亡时间',value:''},{name: '多少代皇帝',value:''},{name: '有哪些伟大发明',value:''},]},
							{name:'帝王脉络',list: [{name: '开国时间',value:''},{name: '开国皇帝',value:''},{name: '主要历史故事',value:''},{name: '采取了哪些治国措施',value:''},{name: '主要功绩',value:''},{name: '有哪些过失',value:''},{name: '拓展内容',value:''},]},
							{name:'文化建设',list: [{name: '历史意义',value:''},{name: '历史人物',value:''},{name: '文学作品',value:''},{name: '这段历史对中华民族的影响',value:''}]},
							{name:'军事战争',list: [{name: '军队概述',value:''},{name: '军事策略',value:''},{name: '定鼎之战',value:''},{name: '名将辈出',value:''},{name: '历史故事',value:''},{name: '拓展内容',value:''}]},
							{name:'假如穿越',list: [{name: '穿越做谁',value:''},{name: '为什么',value:''},{name: '穿越目标',value:''},{name: '治国策略',value:''},{name: '拓展内容',value:''}]},
					]},
					{data:[
							{name:'包含小节',list: [{name: '小节总数',value:''}, {name: '小节1',value:''}, {name: '小节2',value:''}, {name: '小节3',value:''}]},
							{name:'小节1',list: [{name: '概念定义',value:''}, {name: '中心思想',value:''}, {name: '政治人物',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节2',list: [{name: '概念定义',value:''}, {name: '政治人物',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节3',list: [{name: '概念定义',value:''}, {name: '中心思想',value:''}, {name: '政治人物',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}, {name: '拓展内容',value:''}]},
							{name:'小节3',list: [{name: '概念定义',value:''}, {name: '中心思想',value:''}, {name: '政治人物',value:''}, {name: '考点1',value:''}, {name: '考点2',value:''}, {name: '考点3',value:''}]},
					]},
				],
				stepInputList:'',
				sname:'',
				CurrencyMoney:0,
				CurrencyJifen:0,
			}
		},
		created() {},
		onLoad(option) {
			this.sname = option.item
			this.isIndex(option.item)
		},
		components: {
			jiangli,
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
			isIndex:function(sname){
				this.title = this.titleData[1]
				if(sname == '语文'){
					this.numList = this.numListData[0].title
					this.stepInputList = this.stepInputListData[0].data
					this.title = this.titleData[0]
				} else if(sname == '物理' || sname == '化学' || sname == '地理' || sname == '生物' || sname == '数学' ){
					this.numList = this.numListData[1].title
					this.stepInputList = this.stepInputListData[1].data
				} else if(sname == '英语' ){
					this.numList = this.numListData[2].title
					this.stepInputList = this.stepInputListData[2].data
					this.title = this.titleData[2]
				} else if(sname == '历史' ){
					this.numList = this.numListData[3].title
					this.stepInputList = this.stepInputListData[3].data
				} else if(sname == '政治' ){
					this.numList = this.numListData[1].title
					this.stepInputList = this.stepInputListData[4].data
				}
			},
			currentPage: function(is) {
				if (is == 'add') {
					this.current++
				} else {
					this.current--
				}
			},
			submitBusywork: function() {
				let that = this
				let data = {
					uID: that.$store.state.userInfo.uID,
					sid: 1,
					sname: that.sname,
					content: JSON.stringify(that.stepInputList)
				}
				let header = {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Preview/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								uni.showToast({
									title: "作业提交成功",
									icon: "none"
								});
								// let data = JSON.parse(res.response)
								this.CurrencyMoney = data.jinbi
								this.CurrencyJifen = data.jifen
								this.showCurrencyClick()
								this.workListShow = true
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
	@import url('@/static/css/learning.less');
</style>