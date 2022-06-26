<template>
	<view>
		<Search></Search>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" v-for="item in navList" :key="item.name" @click="navClick(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>	
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for="item in floorList" :key="item.floor_title.name">
					<view class="floor-title">
						<img :src="item.floor_title.image_src" class="floor-title-img">
					</view>
					<view class="product-list">
						<navigator class="product-left" :url="'/subpkg/goods_list/goods_list?'+item.product_list[0].navigator_url.split('?')[1].toString()">
							<image :src="item.product_list[0].image_src" mode="widthFix"  :style="{width:item.product_list[0].image_width+'rpx'}"></image>
						</navigator>
						<view class="product-right">
							<template v-for="(item2,index) in item.product_list" :key="item2.name">
							<navigator class="product-right-item" v-if="index!==0" :url="'/subpkg/goods_list/goods_list?'+item2.navigator_url.split('?')[1].toString()">
								<image :src="item2.image_src" mode="widthFix"  :style="{width:item2.image_width+'rpx'}" ></image>
							</navigator> 
							</template>
						</view>
					</view>
			</view>
		</view>
	</view>
	

</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		methods:{
		async getNavList(){
			this.navList=await uni._request.get('api/public/v1/home/catitems')
		},
		async getSwiperList(){
		 this.swiperList=await uni._request.get('api/public/v1/home/swiperdata')
		},
		async getFloorList(){
		 this.floorList=await uni._request.get('api/public/v1/home/floordata')
		},
		navClick(item){
			if(item.navigator_url){
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			}
		}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss" scoped>
	Search{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 2;
	}
	swiper{
		margin-top:94rpx ;
		height: 320rpx;
	}
	.swiper-item{
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
	
	.floor-list{
		
		.floor-item{
			.floor-title{
				margin-bottom: 6rpx;
			}
			.floor-title-img{
				width: 100%;
				height: 59rpx;
			}
			.product-list{
				display: flex;
				.product-left{
					image{
						display: block;
					}
				}
				.product-right{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					align-content: space-between;
					.product-right-item{
						margin-bottom: 10rpx;
					}
				}
		}
	}
	}
</style>
