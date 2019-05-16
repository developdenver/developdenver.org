<template>
  <section class="feature">
	<h2>Community First</h2>
    <div class="benefit">
      <p class="primary-description">Develop Denver brings together developers, designers, strategists, and those looking to dive deeper into the technology world.</p>
      <p class="secondary-description">Develop Denver is two days of talks and hands-on workshops on code, product and design. Attendees will learn from professionals within the greater denver community. Join us for our 8th year of building Denver's tech scene.</p>
    </div>
	<div class="demo-reel">
		<h2>2018 Demo Reel</h2>
		<div class="video responsive-iframe-container">
			<iframe class="responsive-iframe" src="https://www.youtube.com/embed/ZsRunRoI8Rk?controls=0&rel=0&showInfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	</div>
  </section>
</template>

<script>
export default {
    props: {
        video: String,
        heading: String,
        copy: String,
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.feature {
	@include grid;
	h2 {
		@include grid-heading;
	}
	.benefit {
		@include grid;
		@include grid-full-width;
		.primary-description {
			@include grid-text-1;
		}
		.secondary-description {
			@include grid-text-2;
		}
	}
	.demo-reel {
		@include grid;
		@include grid-full-width;
		margin-top: $baseline * 8;
		@media (max-width: $small-breakpoint) {
			margin-top: $baseline * 2;
		}
		h2 {
			writing-mode: vertical-rl;
			transform: rotate(180deg);
			@include primary-header-font;
			border-bottom: 0!important;
			text-decoration: underline;
			margin-bottom: 0;
			text-align: right;
			justify-self: flex-start;
			grid-row: 1;
			grid-column: 3;
			@media (max-width: $small-breakpoint) {
				writing-mode: initial;
				transform: initial;
				grid-column: 1;
				text-decoration: none;
				border-bottom: 1px solid $white!important;
				width: 100%;
				text-align: left;
			}
		}
		.video {
			grid-column: 4 / span 6;
			grid-row: 1;
			@media (max-width: $small-breakpoint) {
				margin-top: $baseline * 2;
				grid-column: 1;
				grid-row: 2;
			}
		}
	}
}
</style>
