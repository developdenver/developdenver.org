<template>
    <section class="submit-talk">
        <h2>Register</h2>
        <edit-talk
            buttonLabel="Submit"
			      :talk="talk"
            @updateTalk="updateTalk"
        />
    </section>
</template>

<script>
import EditTalk from "../components/edit-talk";

export default {
	data() {
		return {
		};
	},
	components: {
		EditTalk,
	},
	methods: {
		async updateTalk(talk) {
			await this.$store.dispatch("updateTalk", talk);
      // this.$router.push({ name: "tickets" });
      // go to all talks when that exists.
		},
	},
};
</script>