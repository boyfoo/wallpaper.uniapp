<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator class="item" 
			:url="`/pages/preview/preview?id=${item._id}`" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore': 'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template> 

<script setup>
import { ref } from 'vue';
import {apiGetClassList} from "@/api/apis.js"
import {onLoad, onReachBottom} from "@dcloudio/uni-app"

const classList = ref([])
const noData = ref(false)
const getClassList = async () => {
	let res = await apiGetClassList(queryParams);
	if (queryParams.pageSize > res.data.length) {
		noData.value = true
	} else {
		classList.value = [...classList.value,...res.data]
		uni.setStorageSync("storgClassList", classList.value)
	}
}

const queryParams = {
	pageNum: 1,
	pageSize: 12
}
onLoad((e) => {
	let {id=null,name=null} = e;
	queryParams.classid = id;
	uni.setNavigationBarTitle({
		title:name
	});
	getClassList()
})
onReachBottom(() => {
	console.log(noData.value);
	if (noData.value) return
	queryParams.pageNum++;
	getClassList()
})
</script>

<style lang="scss">
	.classlist {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;

				}

			}
		}
	}
</style>