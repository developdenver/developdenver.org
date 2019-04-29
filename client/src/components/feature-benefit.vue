<template>
  <section class="feature">
    <div class="video responsive-iframe-container">
		<iframe class="responsive-iframe" src="https://www.youtube.com/embed/ZsRunRoI8Rk?controls=0&rel=0&showInfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</div>
		<h2>Community First</h2>
    <div class="benefit">
      <p class="primary-description">Develop Denver brings together developers, designers, strategists, and those looking to dive deeper into the technology world.</p>
      <p class="secondary-description">Develop Denver is two days of talks and hands-on workshops on code, product and design. Attendees will learn from professionals within the greater denver community. Join us for our 8th year of building Denver's tech scene.</p>
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
	.benefit {
		@include grid;
		grid-template: auto auto / repeat(4, 1fr);

		.primary-description {
			grid-row: 2;
			grid-column: 2 / span 1;
		}
		.secondary-description {
			grid-row: 2;
			grid-column: 3 / span 2;
		}
	}
}
</style>
