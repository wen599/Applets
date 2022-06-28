<template>
	<view class="search-container">
		<view class="search-item" @click="gotoSearch">
			<uni-icons type="search" size="12"></uni-icons>
			<view class="search-item-title">
				搜索
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				
			};
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-container{
	background-color: #b40000;
	padding: 20rpx 30rpx;
	.search-item{
		background-color: #fff;
		display: flex;
		justify-content: center;
		padding:  10rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		.search-item-title{
			margin-left: 5rpx;
		}
	}
}
</style>