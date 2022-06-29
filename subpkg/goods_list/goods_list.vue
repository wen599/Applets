<template>
	<view class="goods-container">
		<GoodsItem 
		v-for="item in goodList" 
		:key="item.goods_id" 
		:goodsImgSrc="item.goods_small_logo" 
		:goodsName="item.goods_name"
		:goodsPrice="item.goods_price"
		:goodsID="item.goods_id"
		></GoodsItem>
		<view class="bottom">
			~~我也是有底线的~~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				requestObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodList:[],
				total:0,
				isloading:false
			}
		},
		methods: {
			
		async getGoodList(){
				this.goodList = (await uni._request.get('api/public/v1/goods/search',this.requestObj)).goods
				this.total = (await uni._request.get('api/public/v1/goods/search',this.requestObj)).total
			}
		},
		onLoad(option) {
			this.requestObj.query=option.query || ''
			this.requestObj.cid=option.cid || ''
			this.getGoodList()
		},
		onPullDownRefresh() {
			this.requestObj.pagenum= this.requestObj.pagenum*this.requestObj.pagesize>=this.total? 1 : this.requestObj.pagenum+1
			this.getGoodList()
			uni.stopPullDownRefresh()
		},
	    async onReachBottom() {
				if(this.requestObj.pagenum*this.requestObj.pagesize>=this.total || this.isloading) return
				this.isloading=true
				this.requestObj.pagenum+=1
				console.log(this.requestObj);
				this.goodList = [...this.goodList,...(await uni._request.get('api/public/v1/goods/search',this.requestObj)).goods]
				this.isloading=false
		}
	}
</script>

<style lang="scss" scoped>
.goods-container{
	.bottom{
		font-size: 24rpx;
		line-height: 2;
		text-align: center;
	}
}
</style>
