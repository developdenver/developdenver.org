<template>
	<div class="yellow-background">
		<section id="about">
			<HeaderBar
				title="Community First"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_COMMUNITY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
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
					for our 9th year of building Denver's tech scene.
				</p>
				<router-link class="button" :to="{ name: 'about' }">
					<button>Learn More</button>
				</router-link>
			</div>
		</section>
		<section class="about-image full no-padding">
			<div class="plus-grid red"></div>
			<div class="about-image">
				<img src="/img/home1_yell.jpg" />
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
	&:last-of-type {
		margin-bottom: 0;
	}
	.full-text {
		@include grid-heading;
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
			@media (max-width: $medium-breakpoint) {
				grid-column: 4 / span 3;
			}
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
		@media (max-width: $medium-breakpoint) {
			grid-column: 3 / span 4;
		}
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red:first-child,
		.plus-grid.red:last-child,
		.about-image {
			grid-column: 1;
		}
		.plus-grid.red:first-child {
			grid-row: 2;
		}
		.about-image {
			margin-top: -$baseline * 3;
		}
		.plus-grid.red:last-child {
			display: none;
		}
	}
}
</style>
