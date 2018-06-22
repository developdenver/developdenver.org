<template>
	<hr class="color-bar" />
</template>

<style lang="scss">
	@import "@/styles/_colors.scss";

	.color-bar {
		margin: 0;
		top: 0;
		left: 0;
		height: 3px;
		width: 100%;
		background-color: $secondary-color;
		border: none;
		z-index: 20;
		&:before, &:after {
			position: absolute;
			content: "";
			height: 100%;
			width: 33.3%;
		}
		&:before {
			background-color: $tertiary-color;
			left: 33.3%;
		}
		&:after {
			background-color: $primary-color;
			left: 66.6%;
		}
	}
</style>
