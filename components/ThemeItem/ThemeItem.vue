<template>
	<view class="theme-item">
		<navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab">3天前更新</view>
		</navigator>
		<navigator open-type="reLaunch" url="/pages/classify/classify" class="box more" v-else> 
			<image class="pic" src="/static/images/wallpaper/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="28" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	defineProps({
		isMore: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default() {
				return {
					name: "默认",
					picurl: "/static/images/wallpaper/classify1.jpg",
					updateTime: Date.now() - 1000 * 60 * 60 * 5
				}
			}
		}
	})
</script>

<style lang="scss">
	.box {
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;

		.pic {
			width: 100%;
			height: 100%;
		}

		.mask {
			position: absolute;
			width: 100%;
			height: 70rpx;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(15rpx);
			border-radius: 10rpx;
			font-weight: 600;
		}

		.tab {
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(250, 129, 90, 0.7);
			backdrop-filter: blur(15rpx);
			color: #fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 10rpx 0;

		}
	}

	.box.more {
		.mask {
			flex-direction: column;
			width: 100%;
			height: 100%;
		}

		.text {
			font-size: 28rpx;
		}
	}
</style>