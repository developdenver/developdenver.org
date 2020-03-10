<template>
	<fragment>
		<section id="submit-talk-landing" class="full landing-screen">
			<countdown />
			<h1>Talk the Talk</h1>
			<div class="plus-grid red move"></div>
		</section>
		<section class="intro-image full">
			<div class="image-wrapper">
				<img
					class="moving-image"
					src="/img/2020/dd_20_submit_a_talk_b.jpg"
					alt="submit a talk photo"
				/>
			</div>
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
import { parallaxElement, throttle } from '@/utilities/parallax';

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
			rotatingElements: document.getElementsByClassName('move'),
			movingImages: document.getElementsByClassName('moving-image'),
		};
	},
	components: {
		Countdown,
		EditTalk,
		HeaderBar,
	},
	mounted() {
		this.rotatingElements = document.getElementsByClassName('move');
		this.movingImages = document.getElementsByClassName('moving-image');
		this.throttle('scroll', 'handleScroll');
	},
	created() {
		this.$store.dispatch('events/fetchEvents');
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
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
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let denominator = 2;
			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(
					this.rotatingElements[i],
					scrollpos,
					denominator,
					5,
				);
			}
			for (let i = 0; i < this.movingImages.length; i++) {
				parallaxElement(this.movingImages[i], scrollpos, 2, 3);
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
		grid-column: 2 / span 4;
		height: 50vh;
		margin-top: 15vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 15vh;
			margin-top: 0vh;
		}
	}
}
.intro-image {
	background: $yellow;
	padding-top: 0;
	padding-bottom: $baseline * 3 !important;
}
</style>
