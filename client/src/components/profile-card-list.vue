<template>
	<ul class="profile-card-list">
		<li v-for="(profile, index) in profiles" :key="index">
			<profile-card :profile="profile" />
		</li>
	</ul>
</template>

<script>
import ProfileCard from '@/components/profile-card.vue';

export default {
	components: {
		ProfileCard,
	},
	props: {
		profiles: Array,
	},
};
</script>

<style lang="scss">
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
.profile-card-list {
	@include grid-heading;
	@include flexbox;
	@include flex-flow(row wrap);
	@include justify-content(flex-start);
	@media (max-width: $small-breakpoint) {
		@include justify-content(center);
	}
	li {
		@include flex(1);
		padding: $baseline;
		// @media (min-width: $small-breakpoint) {
		// 	margin-bottom: $baseline * 5;
		// 	&:nth-child(3n + 1) {
		// 		margin-top: $baseline * -8;
		// 	}
		// 	&:nth-child(3n + 2) {
		// 		margin-top: $baseline * -1;
		// 	}
		// 	&:nth-child(3n + 3) {
		// 		margin-top: $baseline * -10;
		// 	}
		// }
	}
}
</style>
