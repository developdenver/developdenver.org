<template>
    <section class="submit-talk">
		<p class="error" v-if="error">{{error}}</p>
        <edit-talk
			buttonLabel="Submit"
			componentTitle="Submit a Talk"
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
				type: "talk",
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

.submit-talk {
}

</style>
