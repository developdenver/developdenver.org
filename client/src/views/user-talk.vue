<template>
    <section class="talk">
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

export default {
	components: {
		EditTalk,
	},
	computed: {
		talk() {
			return this.$store.getters["services/talk/getTalkById"](this.$route.params.id);
		}
	},
	methods: {
		async updateTalk(talk) {
			const success = await this.$store.dispatch("services/talk/updateTalk", talk);
			if (success) {
				this.$router.push({ name: "talk", params: {id: talk.properties.id} });
			} else {
				this.error = "There was an error updating your talk. Please try again.";
			}
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";

.profile {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
	margin-bottom: $large;
    h2 {
        display: none;
    }
	.reset-password {
		margin-top: $large;
	}
}
</style>
