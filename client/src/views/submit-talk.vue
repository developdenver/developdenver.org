<template>
    <section class="submit-talk">
		<p class="error" v-if="error">{{error}}</p>
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
				type: "",
				talkPhotoUrl: "https://www.fillmurray.com/460/300",
				description: ""
			})
		};
	},
	components: {
		EditTalk,
	},
	methods: {
		async createTalk(talk) {
			const success = await this.$store.dispatch("services/talk/createTalk", talk);
			if (success) {
				this.$router.push({ name: "talk", params: {id: talk.properties.id} });
			} else {
				this.error = "There was an error submitting the talk. Please try again.";
			}
		},
	},
};
</script>
<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";

.submit-talk {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
	margin-bottom: $large;

	.error {
        color: $warning;
    }
}

</style>
