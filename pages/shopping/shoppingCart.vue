<!-- 购物车内容 -->
<template>
	<!-- 商品列表 -->
	<view class="wee-cart">
		<!-- 如果没有数据 -->
		<view class="tips" v-if="goodsList.length==0">
			<navigator url="/pages/shopping/sign" open-type="navigate">
				<u-button size="medium" type="warning" style="margin-top: 200px;">去逛逛</u-button>
			</navigator>
		</view>
		<!-- 数据列表 -->
		<view class="cart-list">
			<view class="cart-item" v-for="(item,index) in goodsList" :key="item.firmId">
				<view class="stylist">
					<u-checkbox-group>
						<u-checkbox v-model="item.selectedAll" icon-size="34" size='34' shape="circle"
							active-color="#ff0000" @change="firmSelectedAll(index)"></u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="select-list">
					<u-checkbox-group :wrap="true">
						<u-checkbox @change="selectedSole(index, i)" icon-size="34" size='34' class="select-checkbox"
							shape="circle" v-model="goods.selected" active-color="#ff0000"
							v-for="(goods, i) in item.goods" :key="goods.Id" :name="goods.name">
							<view class="select-item" @tap.stop>
								<u-image :src="goods.addon" class="img" border-radius="10" width="160" height="160">
								</u-image>
								<view class="goods-info">
									<view class="name">{{goods.name}}</view>
									<view class="data-num">
										<view class="price">￥<text>{{goods.price}}</text>
										</view>
										<view>
											<u-number-box v-model="goods.nums" :min="1" @minus="sub(index,i)"
												@plus="add(index,i)"></u-number-box>
										</view>
									</view>
								</view>
							</view>
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>

		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-checkbox-group>
						<u-checkbox v-model="isSelectedAllRow" icon-size="34" size='34' :disabled="!goodsList.length"
							shape="circle" @change="selectedAllRow"><span class="txt">全选</span></u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="item">
					<view class="goods-remove u-line-1" v-if="selectedAllRowLength" @click="removeGoodsEvent">
						<u-icon name="trash-fill" size="30" color="#ff3300" label-color="#ff3300" label="删除"></u-icon>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="total-cost u-line-1">总价格<text class="red-price">￥{{sumPrice}}</text></view>
				<view class="buy btn u-line-1" @tap="modelShow = true">立即结算<text
						v-if="selectedAllRowLength">({{selectedAllRowLength}})</text></view>
			</view>
		</view>
		<u-modal v-model="modelShow" content="是否购买选中商品" @confirm="gotoNew()" show-cancel-button></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgUrl: this.$store.state.imgUrl,
				goodsList: [{
					firmId: 101,
					firmName: '全选',
					selectedAll: false,
					goods: []
				}],
				isSelectedAllRow: false, // 全选所有商品
				selectedAllRowList: [], // 储存一个已经选择的数据
				selectedAllRowLength: 0, // 已经选择了的数据的长度
				sumPrice: '0.00', // 总价格
				modelShow: false
			}
		},
		created() {

		},
		mounted() {
			this.getCart()
		},
		methods: {
			getCart() {
				let that = this;
				let data = {
					uID: this.$store.state.userInfo.uID,
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Get', '/Sp_order_items/Get', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								this.goodsList[0].goods = res.response.data
							}
						})
					.catch(res => {
						console.log(res);
					});
			},
			/**
			 * 数字步进 减
			 * @param {Object} m 父 索引
			 * @param {Object} n 子 索引
			 */
			sub(m, n) {
				if (this.goodsList[m].goods[n].number <= 1) {
					return
				}
				this.goodsList[m].goods[n].number--
				this.sumTotalPrice()
			},

			/**
			 * 数字步进 加
			 * @param {Object} m 父 索引
			 * @param {Object} n 子 索引
			 */
			add(m, n) {
				this.goodsList[m].goods[n].number++
				this.sumTotalPrice()
			},

			/**
			 * 选择单个商品
			 * @param {Object} m 父 索引
			 * @param {Object} n 子 索引
			 */
			selectedSole(m, n) {
				this.goodsList[m].goods[n].selected = !this.goodsList[m].goods[n].selected
				// 循环设置父全选 如果全部选中  则父全选选中 否则 不选中
				for (let i = 0; i < this.goodsList[m].goods.length; i++) {
					if (this.goodsList[m].goods[i].selected) {
						this.goodsList[m].selectedAll = true
					} else {
						this.goodsList[m].selectedAll = false
						break
					}
				}
				this.computeSelectedAll()
				this.sumTotalPrice()
			},

			/**
			 * 全选 当前店铺下所有的商品
			 * @param {Object} index 索引值
			 */
			firmSelectedAll(index) {
				this.goodsList[index].selectedAll = !this.goodsList[index].selectedAll;
				for (let i = 0; i < this.goodsList[index].goods.length; i++) {
					this.goodsList[index].goods[i].selected = this.goodsList[index].selectedAll
				}
				this.computeSelectedAll()
				this.sumTotalPrice()
			},

			// 全选所有行
			selectedAllRow() {
				this.isSelectedAllRow = this.goodsList.length ? !this.isSelectedAllRow : false
				let len = this.goodsList.length
				for (let i = 0; i < len; i++) {
					this.goodsList[i].selectedAll = this.isSelectedAllRow
					for (let j = 0; j < this.goodsList[i].goods.length; j++) {
						this.goodsList[i].goods[j].selected = this.goodsList[i].selectedAll
					}
				}
				this.sumTotalPrice()
			},

			// 判断全部商品选择
			computeSelectedAll() {
				for (let i = 0; i < this.goodsList.length; i++) {
					if (this.goodsList[i].selectedAll) {
						this.isSelectedAllRow = true
					} else {
						this.isSelectedAllRow = false
						break
					}
				}
			},

			// 合计总价格
			sumTotalPrice() {
				// 获取选择信息
				this.getSelectedInfoList()
				this.sumPrice = 0
				this.selectedAllRowLength = 0
				for (let i = 0; i < this.selectedAllRowList.length; i++) {
					for (let j = 0; j < this.selectedAllRowList[i].goods.length; j++) {
						this.sumPrice += this.selectedAllRowList[i].goods[j].price * this.selectedAllRowList[i].goods[j]
							.nums
					}
					this.selectedAllRowLength += this.selectedAllRowList[i].goods.length
				}
				this.sumPrice = this.sumPrice.toFixed(2)
			},

			/* 获取选择数据 */
			getSelectedInfoList() {
				let len = this.goodsList.length
				this.selectedAllRowList = []
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selectedAll) {
						this.selectedAllRowList.push(this.goodsList[i])
					} else {
						for (let j = 0; j < this.goodsList[i].goods.length; j++) {
							if (this.goodsList[i].goods[j].selected) {
								this.selectedAllRowList.push(this.copyTowArr(i, j))
							} else {
								continue
							}
						}
					}
				}
			},

			/* 二位数组复制 */
			copyTowArr(m, n) {
				let arr = {}
				for (let key in this.goodsList[m]) {
					arr[key] = this.goodsList[m][key]
				}
				arr.goods = []
				arr.goods.push(this.goodsList[m].goods[n])
				return arr
			},
			/* 删除数据从对象中 */
			deleteDataFromObj() {
				let that = this
				if (this.selectedAllRowLength > 1) {
					that.$refs.uToast.show({
						title: '最多只能删除一个商品',
					})
					return false
				}
				let data = {}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Delete', '/Sp_order_items/Delete/' + that.selectedAllRowList[0].goods[0].Id, data,
						header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								that.$refs.uToast.show({
									title: '删除成功',
									type: 'success',
								})
							}
						})
					.catch(res => {
						console.log(res);
					});
				let itemArr = []
				for (let i = 0; i < this.goodsList.length; i++) {
					let item = []
					let len = Object.keys(JSON.stringify(this.goodsList[i].goods)).length
					for (let j = 0; j < this.selectedAllRowList.length; j++) {
						for (let k = 0; k < this.selectedAllRowList[j].goods.length; k++) {
							let addr = JSON.stringify(this.goodsList[i].goods).indexOf(JSON.stringify(this
								.selectedAllRowList[j].goods[k]))
							if (addr > 1) {
								for (let x in this.goodsList[i].goods) {
									let len1 = Object.keys(JSON.stringify(this.goodsList[i].goods[x])).length
									let num = addr - len1 - 1
									if (num < 0) {
										break
									} else {
										item.push(num)
									}
								}
							} else {
								item.push(addr - 1)
							}
						}
					}
					itemArr.push(item)
				}
				for (let i = itemArr.length - 1; i >= 0; i--) {
					let towArr = itemArr[i]
					for (let x = towArr.length; x > 0; x--) {
						console.log(towArr[x - 1])
						if (towArr[x - 1] > -1) {
							this.goodsList[i].goods.splice(towArr[x - 1], 1)
						} else {
							continue
						}
					}
					if (!this.goodsList[i].goods.length) {
						this.goodsList.splice(i, 1)
					}
				}
				this.selectedAllRowList = []
				this.isSelectedAllRow = false
				this.computeSelectedAll()
				this.sumTotalPrice()
			},
			/* 将商品移出购物出 */
			removeGoodsEvent() {
				uni.showLoading()
				// 请求接口写在此位置
				this.deleteDataFromObj()
				setTimeout(function() {
					uni.hideLoading()
				}, 800)
			},

			// 去结算
			gotoNew() {
				let that = this;
				let arr = that.selectedAllRowList[0].goods
				let idArr = ''
				for(let index in arr){
					if(index == (arr.length - 1)){
						idArr += arr[index].Id
					} else {
						idArr += arr[index].Id + ','
					}
				}
				let data = {
					final_amount: that.sumPrice,
					c1: idArr
				}
				let header = {
					'content-type': 'application/json-patch+json',
					'Authorization': 'Bearer ' + this.$store.state.token
				}
				that.$req.doRequest('Post', '/Sp_orders/Post', data, header).then(
						res => {
							// 获得数据
							if (res.status == 200) {
								// console.log(this.selectedAllRowList)  //获取已经选择的数据信息
								// console.log(this.sumPrice) //获取最后总价格
								this.$refs.uToast.show({
									title: res.msg,
								})
							}
						})
					.catch(res => {
						console.log(res);
					});
			},

		}
	}
</script>
<style lang="less" scoped>
	page {
		background-color: #f2f2f2;
	}

	.wee-cart {
		position: relative;
		overflow: hidden;

		.bg {
			width: 100%;
			height: 200rpx;
			background-color: #FFE60F;
			position: absolute;
			top: 0;
		}

		.tips {
			position: relative;
			z-index: 1;
			text-align: center;

			.tips-img {
				display: block;
				margin: 250rpx auto 0;
			}
		}
	}

	.cart-list {
		padding: 20rpx;
		position: relative;
		z-index: 1;
		margin-bottom: 110rpx;

		.cart-item {
			display: block;
			background-color: #FFF;
			border-radius: 10rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFF;

			.stylist {

				.home,
				.arrow-right {
					margin-left: 15rpx;
				}
			}

			.select-list {
				.select-checkbox {
					// padding: 20rpx 0;
					border-bottom: 2rpx solid #EEE;

					.u-iconfont {
						top: -20rpx
					}

					&:last-child {
						border: none;
					}

					.select-item {
						display: flex;
						align-items: center;
						margin-top: 20rpx;

						.img {
							margin-left: 15rpx;
						}

						.goods-info {
							width: 410rpx;
							margin-left: 15rpx;

							.name {
								color: #000;
								font-size: 26rpx;
								// @include line();
							}

							.size {
								color: #484848;
								font-size: 24rpx;
								background-color: #eee;
								padding: 5rpx 10rpx;
								border-radius: 25rpx;
								width: 200rpx;
								display: flex;
								justify-content: space-around;
								margin: 10rpx 0 20rpx;

								.arrow-down {
									margin-left: 10rpx;
								}
							}

							.data-num {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.price {
									font-size: 28rpx;
									color: red;

									.num {
										font-size: 40rpx;
										font-weight: bold;
									}
								}
							}
						}
					}

				}

				&::after {
					clear: both;
					content: '';
					display: block;
				}

			}

			&::after {
				clear: both;
				content: '';
				display: block;
			}

		}
	}

	.navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx;
		position: fixed;
		bottom: 0;
		z-index: 1;
		width: 100%;
		box-sizing: border-box;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 10rpx 0 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.txt {
					font-size: 14px;
					line-height: 30px;
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.total-cost {
				margin-right: 30rpx;

				.red-price {
					color: red
				}
			}

			.buy {
				background-color: #ff7c64;
			}
		}
	}
</style>
