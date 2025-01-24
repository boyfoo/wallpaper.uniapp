<template>
	<view class="class-layout">
		<view class=classify>
			<ThemeItem v-for="item in 15"></ThemeItem>
		</view>
	</view>
</template>

<script setup>

</script>

<style>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>