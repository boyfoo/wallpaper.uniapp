<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="i in 2">
				<image @click="maskChange" src="/static/images/wallpaper/preview2.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-show="maskState">
			<view class="goBack"></view>
			<view class="count">3/9</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">5分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="24"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const maskState = ref(true)
const maskChange = () => {
	maskState.value = !maskState.value
}
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}

		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content; // 内容宽度为元素宽度
			}

			.goBack {}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				display: flex;
				color: #000;
				align-items: center;
				justify-content: space-around;
				text-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);
				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx; // 大一点好点击
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
	}
</style>