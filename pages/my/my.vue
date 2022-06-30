<template>
	<view class="userinfo-container">
			<view class="none-login">
				 <view class="none-login-img">
				 	<image src="@/static/未登录头象.png"  class="none-login-image"></image>
				 </view>
				 <button type="default" class="none-login-button" @click="login">一键登录</button>
				 <view class="none-login-text">
				 	登录后尽享更多权益
				 </view>
			</view>
	</view>
</template>

<script>
	import cartMixin from '@/mixins/cartMixin.js'
	export default {
		mixins:[cartMixin],
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				uni.login({
					success(res) {
						console.log(res);
					}
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
.userinfo-container{
	.none-login{
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		.none-login-img{
			margin-bottom: 20rpx;
			.none-login-image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.none-login-button{
			background-color: #be0000;
			color: #fff;
			width: 80%;
			border-radius: 50rpx;
			margin-bottom: 20rpx;
		}
		.none-login-text{
			font-size: 24rpx;
			color: #acacac;
		}
	}
}
</style>
