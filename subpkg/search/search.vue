<template>
	<view class="search-container">
		<uni-search-bar  @input="input"  class="search" radius="100" cancelButton="none" :focus="true" v-model="searchValue"></uni-search-bar>
	</view>
	<view class="goods-container" >
		<view class="goods-item" v-for="item in searchList.goods" :key="item.goods_id" @click="gotoGoodsDetail(item.goods_id)">
			<view class="goods-item-title">
				{{item.goods_name}}
			</view>
			<uni-icons type="forward"></uni-icons>
		</view>
	</view>
	<view class="history-container" v-if="active" >
		<view class="history-item" v-for="item,index in historyList" :key="index" @click="selectHistory(item)">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList:[],
				pagenum:1,
				pagesize:10,
				time:'',
				historyList:[],
				active:true,
				searchValue:''
			}
		},
		watch:{
			historyList:{
				handler(newVal){
					uni.setStorageSync('serachHistory',newVal)
				},
				deep:true
			}
		},
		onLoad() {
			 this.historyList= uni.getStorageSync('serachHistory')|| []
		},
		methods:{
			selectHistory(e){
				this.searchValue=e
			}
			,
			input(e){
				if(e.trim()!==''){
					this.active=false
				   if(this.time!==''){
					   clearTimeout(this.time)
					}
					this.time=setTimeout(async()=>{
					 let url='api/public/v1/goods/search?query='+e+'&pagenum='+this.pagenum+'&pagesize='+this.pagesize
					 this.searchList = await uni._request.get(url)
					 console.log(this.searchList);
					 if(this.historyList.indexOf(e)!==-1){
						 this.historyList.splice(this.historyList.indexOf(e),1)
					 }
					  this.historyList.unshift(e)
					},1000)	  
				}else{
					this.searchList=[]
					this.active=true
				}
			},
			gotoGoodsDetail(id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped >
	.search-container{
		background-color: #b40000;
		
	}
	.goods-container{
			.goods-item{
				display: flex;
				justify-content: space-between;
				padding: 10rpx  20rpx;
				align-items: center;
				border-bottom:2rpx solid #a2a2a2;
				.goods-item-title{
					font-size: 24rpx;
					max-width: 80%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
	}
	.history-container{
		display: flex;
		padding: 10rpx;
		flex-wrap: wrap;
		.history-item{
			background-color: #e5e5e5;
			padding: 10rpx 20rpx;
			margin: 20rpx 20rpx 0 0;
			border-radius: 50rpx;
			font-size: 24rpx;
		}
	}
</style>
