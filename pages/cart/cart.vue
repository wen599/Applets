<template>
	<!-- 购物车没有商品时显示 -->
	<view class="empty" v-if="goods_total===0">
		<view class="text">
			~~空空如也~~
		</view>
	</view>
	<view class="cart-container" v-else>
		<!-- 收获地址区域 -->
		<view class="address-container">
			<button type='primary' size='mini' class="address-botton">请选择收货地址</button>
			
		</view>
		
		<!-- 购物车头部区域 -->
		<view class="cart-title">
			<uni-icons type="cart" size="24"></uni-icons>
			<text>
				购物车
			</text>
		</view>
		<!-- 商品列表 -->
		<uni-swipe-action>
				<uni-swipe-action-item v-for="item in cart" :key="item.goods_id"  @click="onDelete(item.goods_id)"  :right-options="options" >
					<view class="goods-item"  >
						<!-- 选择按钮 -->
						<view class="select">
							<radio class="radio" :checked="item.goods_state" color="#C00000"  @click="changeGoodsState(item.goods_id)"/>
						</view>
						<!-- 商品信息 -->
						<GoodsItem 
						:goodsImgSrc="item.goods_small_logo"
						:goodsName=item.goods_name
						:goodsPrice=item.goods_price
						:goodsID=item.goods_id
						></GoodsItem>
						<!-- 商品数量 -->
						<uni-number-box :min="1"   class="numbox" :value="item.goods_count"  @change="change($event,item.goods_id)" ></uni-number-box>
					</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
				
		<!-- 购物车结算 -->
		<view class="cart-result-box">
			<label class="left">
				<radio  color="#b90808"  :checked="getAllGoodsState" @click="changeAllGoodsState(getAllGoodsState)"  /> <text class="text">全选</text>
			</label>
			<view class="center" color="#C00000">
				合计:<text class="text">￥{{getAllGoodsPrice}}</text>
			</view>
			<view class="right">
				结算 <text>({{getAllGoodsCount}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	import cartMixin from '@/mixins/cartMixin.js'
	
	export default {
		mixins:[cartMixin],
		data() {
			return {
				options: [
							{
								text: '删除',
								style: {
									backgroundColor: '#b90000',
									width:'20rpx'
								}
							}
				]
			}
		},
		methods: {
			...mapMutations('m_cart',['changeGoodsState','changeGoodsCount','deleteGoods','changeAllGoodsState']),
			change(val,id){
				this.changeGoodsCount([id,val])
				this.setBadge()
			},
			onDelete(id){
				this.deleteGoods(id)
				this.setBadge()
			}
		},
		computed:{
		 ...mapState('m_cart',['cart']),
		 ...mapGetters('m_cart',['getAllGoodsState','getAllGoodsPrice','getAllGoodsCount'])
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.empty{
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		.text{
			padding: 20rpx;
			background-color:#b90808 ;
			color: #fff;
			border-radius: 20rpx;
		}
	}
	.cart-container{
		padding-bottom:102rpx ;
		.address-container{
			min-height: 200rpx;
			position: relative;
			background-color: #fff;
			border-bottom: 1px dashed #c3c3c3;
			.address-botton{
				position: absolute;
				left: 50%;
				top:50%;
				transform: translate(-50%,-50%);
			}
		}
		.cart-title{
			border-bottom: 1px solid #c3c3c3;
			background-color: #fff;
			font-size: 24rpx;
			display: flex;
			align-items: center;
		}
		.goods-item{
			display: flex;
			align-items: center;
			position: relative;
			.select{
				background-color: #fff;
				height: 242rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #c3c3c3;
			}
			.numbox{
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
			}
		}
		.cart-result-box{
			width: 100%;
			position: fixed;
			z-index: 1;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20rpx;
			background-color: #fff;
			.left{
				width: 200rpx;
				display: flex;
				align-items: center;
				
			}
			.center{
				width: 250rpx;
				.text{
					color:#b90808;
				}
			}
			.right{
				width: 250rpx;
				text-align: center;
				padding: 30rpx 60rpx;
				background-color: #b90808;
				color: #fff;
			}
		}
	
	}
</style>
