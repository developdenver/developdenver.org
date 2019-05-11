<template>
    <section class="submit-talk">
		<p class="error" v-if="error">{{error}}</p>
		<h2>Submit Talk</h2>
        <edit-talk
			buttonLabel="Submit"
			:talk="talk"
			@updateTalk="createTalk"
        />
    </section>
</template>

<script>
import EditTalk from "../components/edit-talk";
import Talk from "../models/talk";

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
@import "@/styles/_colors.scss";
@import "@/styles/_general.scss";

.submit-talk {
	@include grid;
	grid-template-columns: repeat(8, 1fr);
	grid-auto-rows: auto;
	margin: $baseline * 8 0;
	max-width: $max-width;
	h2 {
		grid-column: 2 / span 6;
	}
	.error, form {
		grid-column: 4 / span 3;
	}
}

</style>
