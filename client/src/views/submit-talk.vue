<template>
    <section class="submit-talk">
		<countdown />
		<p class="error" v-if="error">{{error}}</p>
		<h2>Submit A Talk</h2>
        <edit-talk
			buttonLabel="Submit"
			:talk="talk"
			@updateTalk="createTalk"
        />
    </section>
</template>

<script>
import EditTalk from "@/components/edit-talk";
import Talk from "@/models/talk";
import Countdown from "@/components/count-down";

export default {
	data() {
		return {
			error: "",
			talk: new Talk({
				title: "",
				type: null,
				talkPhotoUrl: "",
				description: "",
			})
		};
	},
	components: {
		EditTalk,
		Countdown,
	},
	methods: {
		async createTalk(talk) {
			const success = await this.$store.dispatch("talks/createTalk", talk);
			if (success) {
				this.$router.push({ name: "talk", params: {id: talk.properties.id} });
			} else {
				this.error = "There was an error submitting the talk. Please try again.";
			}
		},
	},
	watch: {
		"talk.properties": {
			deep: true,
			handler() {
				const talk = {
					...this.talk.properties
				};
				delete talk.id;
				localStorage.submitTalk = JSON.stringify(this.talk.properties);
			},
		},
	},
};
</script>
<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.submit-talk {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.error, form {
		@include grid-form;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}

</style>
