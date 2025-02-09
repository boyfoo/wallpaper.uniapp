<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image
				v-if="currentIndex == index || currentIndex == index+1 || currentIndex == index -1"
				 @click="maskChange" 
				 :src="item.picurl" 
				 mode="aspectFill"
				 ></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-show="maskState">
			<view class="goBack" @click="goBack" :style="{top: getStatusBarHeight() + 'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">
				<view class="box">{{currentIndex+1}} </view>
			/ 
				<view class="box">{{classList.length}}</view>
			</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{currnetInfo.score}}分</view>
				</view>
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="24"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID:</view>
							<text selectable class="value">{{currnetInfo._id}}</text>
						</view>
			<!-- 			<view class="row">
							<view class="label">分类:</view>
							<view class="value class">明星美女</view>
						</view> -->
						<view class="row">
							<view class="label">发布者:</view>
							<view class="value">{{currnetInfo.nickname}}</view>
						</view>
						<view class="row">
							<view class="label">评分:</view>
							<view selectable class="value roteBox">
								<uni-rate readonly touchable :value="currnetInfo.score" size="16"></uni-rate>
								<text class="score">{{currnetInfo.score}}</text>
							</view>
						</view>
						<view class="row">
							<view class="label">摘要:</view>
							<view class="value">{{currnetInfo.description}}</view>
						</view>
						<view class="row">
							<view class="label">标签:</view>
							<view class="value tabs">
								<view class="tab" v-for="item in currnetInfo.tabs">{{item}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allowHalf></uni-rate>
					<text class="text">{{userScore}}分</text>
				</view>
				<view class="footer">
					<button @click="submitScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>	
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app"
import {getStatusBarHeight} from "@/utils/system.js"
const userScore = ref(5)
const maskState = ref(true)
const maskChange = () => {
	maskState.value = !maskState.value
}
const infoPopup = ref(null)
const scorePopup = ref(null)
const classList = ref([])
const currentId = ref(null)
const currentIndex = ref(0)
const currnetInfo = ref(null)

const storgClassList = uni.getStorageSync("storgClassList") || []
classList.value = storgClassList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")
	}
})

const swiperChange = (e) => {
	currentIndex.value = e.detail.current;
	currnetInfo.value = classList.value[currentIndex.value]
}

const clickInfo = () => {
	infoPopup.value.open();
}
const clickInfoClose = () => {
	infoPopup.value.close();
}
const clickScoreClose = () => {
	scorePopup.value.close();
}
const clickScore = () => {
	scorePopup.value.open();
}
const goBack = () => {
	uni.navigateBack()
}
const submitScore = () => {
	
}
const clickDownload = () => {
	// #ifdef H5
		uni.showModal({
			content:"请长按保存图像"
		})
	// #endif
	
	// #ifndef H5
	uni.showLoading({
		title:"下载中...",
		mask: true
	})
	uni.getImageInfo({
		src:currnetInfo.value.picurl,
		success: res => {
			uni.saveImageToPhotosAlbum({
				filePath:res.path,
				success: res => {
					console.log(res);
				},
				fail:err =>{
					if (err.errMsg != "saveImageToPhotosAlbum:fail auth deny") {
						uni.showToast({
							title:"保存失败，请重新下载",
							icon: "none"
						})
						return
					}
					uni.showModal({
						title:"提示",
						content:"需要授权保存相册",
						success: res => {
							if (res.confirm) {
								uni.openSetting({
									success: (setting) => {
										if (setting.authSetting['scope.writePhotosAlbum']) {
											uni.showToast({
												title:"获取授权成功",
												icon: "none"
											})
										}
									}
								})
							}
						}
					})
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		}
	})
	
	
	// #endif
}

onLoad((e) => {
	currentId.value = e.id;
	currentIndex.value = classList.value.findIndex(item => {
		return item._id == currentId.value
	})
	currnetInfo.value = classList.value[currentIndex.value]
	
});
onShareAppMessage((e) => {
	console.log(e);
})
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

			.goBack {
				width: 70rpx;
				height: 70rpx;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				top: 0;
				margin-left: 0;
				border-radius: 50%;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 16rpx;
				backdrop-filter: blur(10rpx);
				display: flex;
				align-items: center;
				justify-content: center;
				.box {
					width: 50rpx;
					display: flex;
					justify-content: center;
				}
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
					cursor: pointer;
					padding: 2rpx 12rpx; // 大一点好点击
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
		.infoPopup {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			scroll-view {
				max-height: 60vh;
				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;
						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}
						.value {
							flex:1;
							width: 0;
							
						}
						.roteBox {
							display: flex;
							align-items: center;
							.score {
								padding-left: 10rpx;
								color: $text-font-color-2;
								font-size: 28rpx;
							}
						}
						.tabs {
							display: flex;
							align-items: center;
							flex-wrap:wrap;
							.tab {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 5rpx;
								
							}
						}
						.class {
							color: $brand-theme-color;
							
						}
					}
				}
			}
		}
		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				color: $text-font-color-2;
				font-size: 28rpx;
			}
			.close {
				padding: 4rpx;
				cursor: pointer;
			}
		}
		.scorePopup {
			background-color: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;
			
			.content {
				margin-top: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					text-align: right;
				}
			}
			
			.footer {
				padding-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
	
		}
 	}
</style>