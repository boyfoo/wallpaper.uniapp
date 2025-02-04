<template>
	<view class="homeLayout pageBg">
		<CustomNavBar title="推荐"></CustomNavBar>
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
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
		<view class="select">
			<CommonTitle>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>日
						</view>
					</view>
				</template>
			</CommonTitle>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="i in 6" @click="goPreview">
						<image src="/static/images/wallpaper/preview_small.webp" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<CommonTitle>
				<template #name>专题精选</template>\
				<template #custom>
					<navigator class="more" url="">More+</navigator>
				</template>
			</CommonTitle>
			<view class="content">
				<ThemeItem v-for="i in 8"></ThemeItem>
				<ThemeItem :isMore="true"></ThemeItem>
			</view>
		</view>
	</view>
</template>

<script setup>
	const banners = [{
			path: "/static/images/wallpaper/banner1.jpg"
		},
		{
			path: "/static/images/wallpaper/banner2.jpg"
		},
		{
			path: "/static/images/wallpaper/banner3.jpg"
		}
	]
	function goPreview(){
		uni.navigateTo({
			url:"/pages/preview/preview"
		})
	}
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

	.select {
		.date {
			display: flex;
			color: #28b389;
			align-items: center;

			.text {
				margin-left: 5rpx;
			}
		}

		padding-top: 50rpx;

		.content {
			// width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}

	}

	.theme {
		padding: 50rpx 0;

		.more {
			color: #888;
			font-size: 32rpx;

		}

		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>