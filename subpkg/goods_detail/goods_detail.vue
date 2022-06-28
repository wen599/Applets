<template>
	<view class="goods-detail-container">
		<swiper :indicator-dots="true"  :circular="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
			<swiper-item class="swiper-item" v-for="item in goodsInfo.pics" :key="item.pics_id" >
				<image :src="item.pics_mid" class="swiper-item-image"></image>
			</swiper-item>
		</swiper>
		<view class="goods-details-discription">
			<view class="goods-details-leftbox">
				<view class="goods-details-name">
					{{goodsInfo.goods_name}}
				</view>
				<view class="goods-details-price">
					{{'¥'+Number(goodsInfo.goods_price).toFixed(2)}}
				</view>
			</view>
			<view class="goods-detail-rightbox">
				<uni-icons type="star" size="20"></uni-icons>
				<view class="goods-detail-enshrine">
					收藏
				</view>
			</view>
		</view>

		<rich-text :nodes="formatIntroduce(goodsInfo.goods_introduce)" class="goods-content"></rich-text>
		<view class="goods-carts">
					<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
						@buttonClick="buttonClick" />
				</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo:{},
				options: [ {
							icon: 'shop',
							text: '店铺',
							info: 0,
							infoBackgroundColor: '#007aff',
							infoColor: "#f5f5f5"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
				buttonGroup: [{
										text: '加入购物车',
										backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
										color: '#fff'
									},
									{
										text: '立即购买',
										backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
										color: '#fff'
									}
								],
			}
		},
		methods:{
		 async getGoodsInfo(goods_id){
			 	this.goodsInfo= await uni._request.get('api/public/v1/goods/detail',{'goods_id':goods_id})
			},
			formatIntroduce(introduce){
				if(introduce) return	introduce.replace(/<img/g,'<img style="display:block;"').replace(/.webp/g,'.jpg')
			},
			onClick(e) {
					uni.showToast({
						title: `点击${e.content.text}`,
						icon: 'none'
					})
				},
			buttonClick(e) {
					console.log(e)
					this.options[2].info++
				}
			},
		onLoad(option) {
			this.getGoodsInfo(option.goods_id)
			}
	}
</script>

<style lang="scss" scoped>
.goods-detail-container{
	padding-bottom: 50px;
	.swiper{
		width: 100vw;
		height: 100vw;
		.swiper-item{
			.swiper-item-image{
				height: 100%;
				width: 100%;
			}
		}
		
	}
	.goods-carts{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		
	}
	.goods-content{
	}
	.goods-details-discription{
		display: flex;
		.goods-details-leftbox{
			max-width: 80%;
			padding: 0 20rpx;
			.goods-details-name{
				font-size: 24rpx;
			}
			.goods-details-price{
				margin-top: 20rpx;
				color: #d00000;
			}
		}
		.goods-detail-rightbox{
			flex: 1;
			border-left: 1px solid #d8d8d8;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			.goods-detail-enshrine{
				font-size: 24rpx;
			}
		}
	}
}
</style>
