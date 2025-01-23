<template>
	<view class="homeLayout">
		<view class="banner">
			<swiper circular="" indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
				<swiper-item v-for="item of banners">
					<image :src="item.path" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item>
						撒娇手动滑稽卡山东科技啊手机卡打卡机手打户籍卡受打击卡哈刷卡机德哈卡久啊很大
					</swiper-item>
					<swiper-item>
						asdasdasd
					</swiper-item>
				</swiper>
			</view>   
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
const banners = [
	{
		path: "/common/images/wallpaper/banner1.jpg"
	},
	{
		path: "/common/images/wallpaper/banner2.jpg"
	},
	{
		path: "/common/images/wallpaper/banner3.jpg"
	}
]
</script>

<style lang="scss" scoped>
	
	.banner {
		
		width: 750rpx;
		padding: 30rpx 0;

		swiper {
			width: 750rpx;
			height: 340rpx;

			swiper-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				// 不加这个会因为padding和width100%造成图片位置错误
				box-sizing: border-box;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}

		}

	}
	
	.notice {
		width: 690rpx;
		height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		align-items: center;
		.left {
			width: 140rpx;
			display: flex;
			justify-content: center;
			.text {
				color: #28b389;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			height: 100%;
			flex: 1;
			swiper {
				height: 100%;
				swiper-item {
					// display: flex;
					// align-items: center;// 用这个文字超多时候没有...效果
					line-height: 80rpx;
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			// height: 80rpx;
			// overflow: hidden;
			// display: flex;
		}
		
		.right {
			width: 70rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>