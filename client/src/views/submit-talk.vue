<template>
    <section class="submit-talk">
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
			await this.$store.dispatch("services/talk/createTalk", talk);
			this.$router.push({ name: "talk", params: {id: talk.properties.id} });
		},
	},
};
</script>
<style lang="scss">
@import "@/styles/_sizes.scss";

.submit-talk {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
	margin-bottom: $large;
}

</style>
