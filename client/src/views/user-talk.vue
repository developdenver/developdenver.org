<template>
    <section class="talk">
        <h2>Edit Talk</h2>
        <edit-talk
			buttonLabel="Update Talk"
			:talk="talk"
			@updateTalk="updateTalk"
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
		talks() {
			return this.$store.getters["services/talk/getCurrentTalk"](this.profile.id);
		}
	},
	methods: {
		async updateTalk(talk) {
			await this.$store.dispatch("services/user/setTalk", talk);
			this.$router.push({ name: "talks", params: {id: talk.id} });
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
