<template>
    <section class="user-talk">
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
	name: 'UserTalk',
	hagridActions: ['talks/fetchTalks'],
	components: {
		EditTalk,
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

.user-talk {
	padding-left: 100px;
	padding-top: 100px;
}
</style>
