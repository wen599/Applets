<template>
	
	<Search></Search>
	<view class="scroll-view-container" >
		<scroll-view scroll-y="true"  class="scroll-left" :style="{height: windowHeight+'px'}" >
			<template v-for="item,index in cateList" :key="item.cat_id">
			<view :class="['left-scroll-item',item.cat_id===active?'active':'']"  @click="activeChanged(item)">
				{{item.cat_name}}
			</view>
			</template>
		</scroll-view>
		<scroll-view scroll-y="true"  class="scroll-right" :scroll-top="scrollTop" :style="{height: windowHeight+'px'}">
			<template v-for="item in cateLevel2" :key="item.cat_id">
				<view class="right-scroll-item">
					<view class="right-scroll-item-title">
						{{item.cat_name}}
					</view>
					<view class="right-scroll-item-goods">
						<view v-for="item2 in item.children" :key="item2.cat_id" class="right-scroll-item-goods-item" @click="gotoGoodsList(item2)">
							<view class="right-scroll-item-goods-img">
								<image src="https://api-ugo-web.itheima.net/full/2fb113b32f7a2b161f5ee4096c319afedc3fd5a1.jpg"></image>
							</view>
							<view class="right-scroll-item-goods-name">
								{{item2.cat_name}}
							</view>
						</view>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
	
</template>

<script>
	import cartMixin from '@/mixins/cartMixin.js'
	
	export default {
		mixins:[cartMixin],
		data() {
			return {
				cateList:[],
				cateLevel2:[],
				active:0,
				scrollTop:0,
				windowHeight:0
			}
		},
		methods: {
			async getCateList(){
				this.cateList= await uni._request.get('api/public/v1/categories')
				this.active=this.cateList[0].cat_id
				this.cateLevel2=this.cateList[0].children
			},
			activeChanged(item){
				this.active=item.cat_id
				this.cateLevel2=item.children
				this.scrollTop= this.scrollTop===0? 1:0
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			}
			
		},
		onLoad() {
			let windowHeight=0
			uni.getSystemInfo({
				success(res) {
					windowHeight=res.windowHeight-47
				}
			})
			this.windowHeight=windowHeight
			this.getCateList()
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view-container{
		display: flex;
		.scroll-left{
			height: 100vh;
			width: 240rpx;
			.left-scroll-item{
				background-color: #f7f7f7;
				line-height:120rpx;
				text-align:center;
				font-size:24rpx;
				&.active{
					background-color: #fff;
					position: relative;
					&:before{
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						background-color: #f00000;
					}
				}
			}
		}
		.scroll-right{
			height: 100vh;
			background-color: #fff;
			.right-scroll-item{
				
				.right-scroll-item-title{
					text-align: center;
					margin: 10rpx;
				}
				.right-scroll-item-goods{
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;	
					grid-template-areas: 
					"right-scroll-item-goods-item right-scroll-item-goods-item right-scroll-item-goods-item "
					;
					.right-scroll-item-goods-item{
						
						.right-scroll-item-goods-img{
							image{
								display: block;
								margin: 0 auto;
								width: 120rpx;
								height: 120rpx;
							}
						}
						.right-scroll-item-goods-name{
								font-size: 24rpx;
								text-align: center;
						}
					}
					
				}
			}
			
		}
	}
</style>
