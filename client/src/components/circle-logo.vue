<template>
	<div id="container" class="circle-logo">
		<img
			src="../assets/icons/DD_smiley-yellow-red.gif"
			alt="Spinning logo"
		/>
	</div>
</template>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
.circle-logo {
	border-bottom: $thin-border-width solid $black;
	img {
		width: 100%;
	}
}
</style>
