
let SYSTEM_INFO = uni.getSystemInfoSync();
export const getStatusBarHeight = () => {
	return SYSTEM_INFO.statusBarHeight || 0
}
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		const {top,height} = uni.getMenuButtonBoundingClientRect()
		return height+ (top - getStatusBarHeight())*2
	} else {
		return 40;
	}
}
export const getNavBarHeight = () => {
	return getStatusBarHeight() + getTitleBarHeight();
}
export const getLeftIconLeft = () => {

	// #ifdef MP-TOUTIAO
	let {leftIcon: {left, width}} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width);
	// #endif
	return 0
}