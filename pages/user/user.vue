<template>
	<view class="userLayout">
		<view class="avatar">
			<image src="/static/images/head/unnamed.jpg" mode="aspectFill"></image>
		</view>
		<view class="ip">100.100.100.100</view>
		<view class="address">来自：山东</view>
	</view>
	<view class="section">
		<view class="list">
			<view class="row" v-for="item in 2">
				<view class="left">
					<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">我的下载</view>
				</view>
				<view class="right">
					<view class="text">33</view>
					<uni-icons type="right" size="16" color="#aaa"></uni-icons>
				</view>
			</view>
			<view class="row">
				<view class="left">
					<uni-icons type="chatboxes-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">联系客服</view>
				</view>
				<view class="right">
					<view class="text"></view>
					<uni-icons type="right" size="16" color="#aaa"></uni-icons>
				</view>
				<!-- #ifdef MP -->
				<button open-type="contact">联系客服</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<button @click="clickContact">拨打电话</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
	<view class="section">
		<view class="list">
			<view class="row" v-for="item in 2">
				<view class="left">
					<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">我的下载</view>
				</view>
				<view class="right">
					<view class="text">33</view>
					<uni-icons type="right" size="16" color="#aaa"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: "10086"
	})
}
</script>

<style lang="scss">
	.userLayout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50rpx 0;

		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;

			image {

				width: 100%;
				height: 100%;
			}
		}

		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}

		.address {
			font-size: 28rpx;
			color: #aaa;
		}

	}

	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

		.list {
			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;

				&:last-child {
					border-bottom: 0
				}

				.left {
					display: flex;
					align-items: center;
					gap: 10rpx;
					.text {
						color: #666;
					}
				}

				.right {
					display: flex;
					align-items: center;
					.text {
						font-size: 28rpx;
						color: #aaa;
					}
				}
				button {
					position: absolute;
					top: 0;
					left: 0 ;
					height: 100rpx;
					width: 100%;
					opacity: 0;
				}
			}
		}
	}
</style>