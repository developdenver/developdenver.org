<template>
	<div class="header-bar">
		<h2>{{ title }}</h2>
		<div class="icon-container">
			<img v-bind:src="imageUrl" alt="Speaker headshot" />
		</div>
	</div>
</template>

/* SCRIPT */
<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		imageUrl: String,
		hoverUrl: String,
	},
};
</script>

/* STYLES */
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
.header-bar {
	@include grid-heading;
	@include flexbox;
	@include align-items(center);
	@include justify-content(space-between);
	border-bottom: 1px solid $black;
	border-top: 1px solid $black;
	margin-bottom: $baseline * 2;
	.icon-container {
		border-left: $thin-border-width solid $black;
		border-right: $thin-border-width solid $black;
		margin-right: $baseline * 4;
		padding: $baseline;
		img {
			height: auto;
			width: 50px;
		}
	}
}
</style>
