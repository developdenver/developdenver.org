<template>
	<div class="header-bar">
		<h2>{{ title }}</h2>
		<div class="icon-container">
			<img v-bind:src="imageUrl" />
			<div class="hover-icon">
				<img v-bind:src="hoverUrl" />
			</div>
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
	border-bottom: $thin-border-width solid $black;
	border-top: $thin-border-width solid $black;
	margin-bottom: $baseline * 2;
	z-index: 2;
	.icon-container {
		border-left: $thin-border-width solid $black;
		border-right: $thin-border-width solid $black;
		margin-right: $baseline * 4;
		padding: $baseline;
		position: relative;
		img {
			height: auto;
			width: 50px;
		}
		.hover-icon {
			display: none;
			left: -3vw;
			position: absolute;
			top: -3vw;
			transform: translate(-5%, -5%) skewX(40deg);
			transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
			width: 15vw;
			svg,
			img {
				animation: orbit 5s infinite;
				animation-timing-function: linear;
				width: 100%;
				height: auto;
			}
		}
	}
	@media (max-width: $small-breakpoint) {
		.icon-container {
			margin-right: $baseline;
			img {
				width: 30px;
			}
			.hover-icon {
				display: none;
			}
		}
	}
	&:hover {
		.hover-icon {
			display: block;
		}
	}
}

@keyframes orbit {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@-moz-keyframes orbit {
	from {
		-moz-transform: rotate(0deg);
	}
	to {
		-moz-transform: rotate(360deg);
	}
}
@-webkit-keyframes orbit {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
