<template>
	<fragment>
		<section id="submit-talk-landing" class="full landing-screen">
			<countdown />
			<h1>Talk the Talk</h1>
			<div class="plus-grid red"></div>
		</section>
		<section class="submit-talk">
			<HeaderBar
				title="Submit a Talk"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<p class="error" v-if="error">{{ error }}</p>
			<edit-talk
				buttonLabel="Submit"
				:talk="talk"
				@updateTalk="createTalk"
			/>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import EditTalk from '@/components/edit-talk';
import HeaderBar from '@/components/header-bar.vue';
import Talk from '@/models/talk';

export default {
	data() {
		return {
			error: '',
			talk: new Talk({
				title: '',
				type: null,
				talkPhotoUrl: '',
				description: '',
			}),
		};
	},
	components: {
		Countdown,
		EditTalk,
		HeaderBar,
	},
	methods: {
		async createTalk(talk) {
			const success = await this.$store.dispatch(
				'talks/createTalk',
				talk,
			);
			if (success) {
				this.$router.push({
					name: 'talk',
					params: { id: talk.properties.id },
				});
			} else {
				this.error =
					'There was an error submitting the talk. Please try again.';
			}
		},
	},
	watch: {
		'talk.properties': {
			deep: true,
			handler() {
				const talk = {
					...this.talk.properties,
				};
				delete talk.id;
				localStorage.submitTalk = JSON.stringify(this.talk.properties);
			},
		},
	},
};
</script>
<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#submit-talk-landing {
	.plus-grid.red {
		@include plus-grid;
		grid-column: 2 / span 4;
		height: 30vh;
		margin-top: 15vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
}
</style>
