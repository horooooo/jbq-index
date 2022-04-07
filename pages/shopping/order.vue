<template>
	<view class="order">
		<view class="order-module" v-if="order.length >= 1">
			<view class="order-list" v-for="(item,index) in order" :key="index">
				<view class="list" v-for="(item2,index2) in item.oritems" :key="index2">
					<view class="left"><img :src="item2.addon" alt=""></view>
					<view class="center">{{item2.name}}</view>
					<view class="right"><span>金盾</span><br>*{{item2.nums}}</view>
				</view>
				<view class="list date">
					下单时间：{{item.createtime}}
				</view>
				<view class="list money">
					实付款：<span>￥{{item.final_amount}}金盾币</span>
				</view>
			</view>
		</view>
		<view class="order-module" v-else>
			<h1>暂无订单记录</h1>
		</view>
	</view>
</template>

<script>
	export default {
		name:'order',
		data() {
			return {
				order:'',
			}
		},
		created() {
			this.getOrder()
		},
		onLoad() {},
		methods: {
			getOrder: function() {
				let header = {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				this.$req.doRequest('GET', '/Sp_orders/Get', {}, header).then(
						res => {
							let list = []
							for(let index in res.response.data){
								list.unshift(res.response.data[index])
							}
							this.order = res.response.data
							for(let index in list){
								let date = new Date(list[index].createtime)
								let dateTime
								let yy = date.getYear() + 1900
								let mm = date.getMonth() + 1
								let dd = date.getDate()
								let hh = date.getHours()
								let mf = date.getMinutes() < 10 ? '0' + date.getMinutes() :
									date.getMinutes()
								let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() :
									date.getSeconds()
								dateTime = yy + '-' +mm + '-' + dd + ' ' + hh + ':' + mf
								list[index].createtime = dateTime
							}
							this.order = list
						})
					.catch(res => {
						console.log(res);
					});
			},
		},
	}
</script>

<style lang='less'>
	@import url('@/static/css/order.less');
</style>