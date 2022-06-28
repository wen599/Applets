<template>
		<navigator class="goods-item"  :url="formatURL(goodsID)">
			<view class="goods-item-imgbox">
				<image :src="goodsImgSrc" class="goods-item-img"></image>
			</view>
			<view class="goods-item-details">
				<view class="goods-item-name">
					{{goodsName}}
				</view>
				<view class="goods-item-price">
					{{'¥'+formatPrice(goodsPrice)}}
				</view>
			</view>
		</navigator>
</template>

<script>
	export default {
		name:"GoodsItem",
		props:{
			goodsImgSrc:{
				default:'',
				type:String
			},
			goodsName:{
				default:'',
				type:String
			},
			goodsPrice:{
				default:0,
				type:Number
			},
			goodsID:{
				default:NaN,
				type:Number
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
		formatURL(id){
			return '/subpkg/goods_detail/goods_detail?goods_id='+id
		},
		formatPrice(price){
			return Number(price).toFixed(2)
		}
		}
	}
</script>

<style lang="scss" scoped>
.goods-item{
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #c3c3c3;
		background-color: #fff;
		.goods-item-imgbox{
			margin-right: 10rpx;
			.goods-item-img{
				width: 200rpx;
				height: 200rpx;
				
			}
			
		}
		.goods-item-details{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-item-name{
				font-size: 24rpx;
			}
			.goods-item-price{
				color: #e30000;
			}
		}
		
	}
</style>