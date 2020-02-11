<template>
	<fragment>
		<section>
			<HeaderBar
				title="The Details"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="ticket-details">
				<p>When: August 15 and 16, 2019</p>
				<p>Where: RiNo Brighton Boulevard</p>
				<p>
					All badges include a custom printed 2-day conference badge,
					access to keynote, talks, workshops, and live podcasts,
					coffee, breakfast, and lunch at Zeppelin Station vendors
					both days, opening and closing parties, 8th annual Ballmer
					Peak Hackathon
				</p>
			</div>
		</section>
		<section>
			<HeaderBar
				title="For Groups"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="ticket-details">
				<p>
					Don’t worry, we’re all setup so you can purchase a group of
					conference badges. You’ll be asked to provide an email
					address for each attendee and you’re good to go. Have
					questions? Please contact us at
					<a href="mailto:hello@developdenver.org"
						>hello@developdenver.org</a
					>
					if you need help.
				</p>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import HeaderBar from '@/components/header-bar.vue';
export default {
	components: {
		HeaderBar,
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.ticket-details {
	@include grid-full-width;
}
</style>
