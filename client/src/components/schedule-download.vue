<template>
	<section class="schedule-download">
		<h2>Schedule</h2>
    <div class="description">
  		<p>Two days packed with talks, workshops, and events!</p>
    </div>
		<a class="button" href="/dd_2019_schedule_mobile.pdf">Download Schedule</a>
	</section>
</template>

<script>
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.schedule-download {
	@include grid;
	@media (max-width: $small-breakpoint) {
		grid-auto-rows: auto;
	}

	a:not(.button) {
		text-decoration: underline;
		color: $accent-color;
	}
	h2 {
		@include grid-heading;
		grid-row: 1;
	}
	.description {
		grid-row: 2;
		@include grid-text-0;
		@media (max-width: $small-breakpoint) {
		}
	}
	.button {
		grid-row: 3;
		margin-top: $baseline * 2;
		@include grid-cta;
		@include call-to-action;
		@media (max-width: $small-breakpoint) {
			grid-row: 5;
		}
	}
}
</style>
