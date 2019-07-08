<template>
    <section class="user-talk">
		<countdown />
		<h2>Edit Talk</h2>
        <edit-talk
			buttonLabel="Update Talk"
			:talk="talk"
			@updateTalk="updateTalk"
            componentTitle="Edit Talk"
         />
    </section>
</template>

<script>
import EditTalk from "@/components/edit-talk.vue";
import Countdown from '../components/count-down.vue';

export default {
	name: 'UserTalk',
	hagridActions: ['talks/fetchTalks'],
	components: {
		EditTalk,
		Countdown,
	},
	computed: {
		talk() {
			return this.$store.getters["talks/getTalkById"](this.$route.params.id);
		}
	},
	methods: {
		async updateTalk(talk) {
			const success = await this.$store.dispatch("talks/updateTalk", talk);
			if (success) {
				this.$router.push({ name: "talk", params: { id: talk.properties.id } });
			} else {
				this.error = "There was an error updating your talk. Please try again.";
			}
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.user-talk {
	@include grid;
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
