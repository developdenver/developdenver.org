<template>
	<header class="app-header">
		<div class="app-header-content">
			<router-link to="/" class="circle-logo-link"
				><circle-logo
			/></router-link>
			<div
				class="hamburger"
				v-bind:class="{ open: isMenuOpen }"
				@click="toggleMenu"
				:isMenuOpen="isMenuOpen"
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<img class="hover" src="@/assets/icons/DD_pixel_burger.svg" />
			</div>
			<div class="title-wrap">
				<img
					src="/img/DVLP_DNVR_text.png"
					alt="DVLP DNVR"
					description="text treatment for Develop Denver logo"
				/>
				<img
					src="/img/DVLP_DNVR_text_horizontal.png"
					class="mobile-title"
					alt="DVLP DNVR"
					description="text treatment for Develop Denver logo"
				/>
			</div>
		</div>
		<slot />
	</header>
</template>

<script>
import CircleLogo from '@/components/circle-logo';
import PrimaryNavigation from '@/components/primary-navigation.vue';

export default {
	components: {
		PrimaryNavigation,
		CircleLogo,
	},
	props: {
		isMenuOpen: Boolean,
	},
	computed: {
		menuIcon() {
			return this.isMenuOpen ? 'times' : 'bars';
		},
	},
	methods: {
		toggleMenu() {
			this.$emit('toggleMenu');
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.app-header {
	.app-header-content {
		background-color: $yellow;
		border-right: $thin-border-width solid $black;
		height: 100vh;
		left: 0;
		max-width: 100px; // Chrome hack
		position: fixed;
		top: 0;
		z-index: 100;
		@media (max-width: $small-breakpoint) {
			@include flexbox;
			@include flex-flow(nowrap);
			@include align-items(center);
			@include justify-content(space-between);
			border: 0;
			border-top: $thin-border-width solid $black;
			bottom: 0;
			height: auto;
			padding: $baseline $baseline/4 $baseline $baseline;
			left: auto;
			max-width: 100%;
			top: auto;
			width: 100%;
			.circle-logo-link {
				display: none;
			}
			.hamburger-container {
				display: none;
			}
		}
		.title-wrap {
			@include flexbox;
			@include justify-content(center);
			@include align-items(center);
			border-top: $thin-border-width solid $black;
			height: 78%;
			@media (max-width: $small-breakpoint) {
				border-top: none;
			}
			.mobile-title {
				display: none;
			}
			img {
				height: 100%;
				max-height: 400px;
				width: auto;
			}
			@media (max-width: $small-breakpoint) {
				@include justify-content(flex-start);
				@include align-items(center);
				width: 70%;
				img {
					display: none;
					&.mobile-title {
						display: block;
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
	.hamburger {
		height: 30px;
		margin: $baseline/5 auto;
		order: 2;
		padding: 30px;
		position: relative;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: 0.5s ease-in-out;
		-moz-transition: 0.5s ease-in-out;
		-o-transition: 0.5s ease-in-out;
		transition: 0.5s ease-in-out;
		width: 30px;
		@media (max-width: $small-breakpoint) {
			margin: 0;
		}
		cursor: pointer;
		span {
			background: $black;
			display: block;
			height: 4px;
			position: absolute;
			opacity: 1;
			left: 15px;
			right: 15px;
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
			-webkit-transition: 0.25s ease-in-out;
			-moz-transition: 0.25s ease-in-out;
			-o-transition: 0.25s ease-in-out;
			transition: 0.25s ease-in-out;
			width: calc(100% - 30px);
			&:nth-child(1) {
				top: 15px;
			}
			&:nth-child(2),
			&:nth-child(3) {
				left: 10px;
				right: 5px;
				top: 26px;
			}
			&:nth-child(4) {
				top: 36px;
			}
		}
		.hover {
			display: none;
			height: 70%;
			left: 0;
			position: absolute;
			top: 15%;
			width: 100%;
		}
		&:hover {
			span {
				display: none;
				&:nth-child(2),
				&:nth-child(3) {
					left: 15px;
					right: 0px;
				}
			}
			.hover {
				display: block;
			}
		}
		&.open {
			.hover {
				display: none;
			}
			span {
				background: $black;
				display: block;
				&:nth-child(1) {
					top: 18px;
					width: 0%;
					left: 50%;
				}
				&:nth-child(2) {
					left: 15px;
					right: 0px;
					-webkit-transform: rotate(45deg);
					-moz-transform: rotate(45deg);
					-o-transform: rotate(45deg);
					transform: rotate(45deg);
				}
				&:nth-child(3) {
					left: 15px;
					right: 0px;
					-webkit-transform: rotate(-45deg);
					-moz-transform: rotate(-45deg);
					-o-transform: rotate(-45deg);
					transform: rotate(-45deg);
				}
				&:nth-child(4) {
					top: 18px;
					width: 0%;
					left: 50%;
				}
			}
		}
	}
}
</style>
