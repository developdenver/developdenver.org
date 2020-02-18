<template>
	<fragment>
		<section id="edit-talk" class="full landing-screen">
			<countdown />
			<div class="plus-grid"></div>
		</section>
		<section class="user-talk">
			<HeaderBar
				title="Edit Talk"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<edit-talk
				buttonLabel="Update Talk"
				:talk="talk"
				@updateTalk="updateTalk"
				componentTitle="Edit Talk"
			/>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';
import EditTalk from '@/components/edit-talk.vue';

export default {
	name: 'UserTalk',
	hagridActions: ['talks/fetchTalks'],
	components: {
		Countdown,
		EditTalk,
		HeaderBar,
	},
	computed: {
		talk() {
			return this.$store.getters['talks/getTalkById'](
				this.$route.params.id,
			);
		},
	},
	methods: {
		async updateTalk(talk) {
			const success = await this.$store.dispatch(
				'talks/updateTalk',
				talk,
			);
			console.log('updateTalk returned', success);
			if (success) {
				this.$router.push({
					name: 'talk',
					params: { id: talk.properties.id },
				});
			} else {
				this.error =
					'There was an error updating your talk. Please try again.';
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';
#edit-talk {
	@include grid-full-width;
	position: relative;
	.plus-grid {
		@include plus-grid;
		grid-column: 1 / span 4;
		height: 35vh;
		margin-top: 0vh;
		position: absolute !important;
		width: 100vw;
		right: 0;
		z-index: 1;
		@media (max-width: $small-breakpoint) {
			height: 20vh;
		}
	}
	.countdown {
		z-index: 2;
	}
}
.user-talk {
	@include grid;
}
</style>
