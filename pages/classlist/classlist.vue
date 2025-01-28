<template>
	<view class="classlist">
		<view class="content">
			<navigator class="item" url="/pages/preview/preview" v-for="item in 10">
				<image src="/static/images/wallpaper/preview2.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>

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