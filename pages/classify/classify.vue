<template>
	<view class="class-layout  pageBg">
		<CustomNavBar title="分类"></CustomNavBar>
		<view class=classify>
			<ThemeItem v-for="item in classifyList" :item="item" :key="item._id"></ThemeItem>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {apiGetClassify} from "@/api/apis.js"
const classifyList = ref([])

const getClassify = async() => {
	let res = await apiGetClassify({
		pageSize: 100
	})
	classifyList.value = res.data
}
getClassify()
</script>

<style>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>