<template>
	<div class="yellow-background">
		<section id="about">
			<HeaderBar
				title="Community First"
				v-bind:imageUrl="require('@/assets/icons/happy_black.svg')"
			/>
			<div class="full-text">
				<p>
					Develop Denver brings together developers, designers,
					strategists, and those looking to dive deeper into the
					technology world.
				</p>
				<p>
					Develop Denver is two days of talks and hands-on workshops
					on code, product and design. Attendees will learn from
					professionals within the greater Denver community. Join us
					for our 8th year of building Denver's tech scene.
				</p>
				<p>
					A small Blurb about the neighborhood that its in and the
					reason for that, and maybe a sentance about how handsome Tim
					Sisk is.
				</p>
			</div>
		</section>
		<section class="about-image full no-padding">
			<div class="plus-grid red"></div>
			<div class="about-image">
				<img src="/img/ballmer-peak.jpeg" />
			</div>
			<div class="plus-grid red"></div>
		</section>
	</div>
</template>

/* SCRIPT */
<script>
import HeaderBar from '@/components/header-bar.vue';
export default {
	components: {
		HeaderBar,
	},
};
</script>

/* STYLES */
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

section#about,
section.about-image {
	background: $yellow;
	.full-text {
		@include grid-heading;
		// padding: $baseline * 2 0;
	}
	.plus-grid.red {
		@include plus-grid;
		height: 300px;
		grid-row: 3;
		&:first-child {
			grid-column: 1 / span 3;
		}
		&:last-child {
			grid-column: 5 / span 2;
			grid-row: 4;
			margin-top: -$baseline * 2;
		}
	}

	.about-image {
		grid-column: 3 / span 3;
		grid-row: 3;
		margin-top: $baseline * 2;
		img {
			height: auto;
			width: 100%;
		}
	}
}
</style>
