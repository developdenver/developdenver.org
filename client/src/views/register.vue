<template>
    <section class="register">
        <h2>Register</h2>
        <edit-profile
            buttonLabel="Register"
			:profile="profile"
            @updateProfile="updateProfile"
        />
    </section>
</template>

<script>
import EditProfile from "../components/edit-profile";
import Profile from "../models/profile";

export default {
	data() {
		return {
			profile: new Profile(),
		};
	},
	components: {
		EditProfile,
	},
	methods: {
		updateProfile(profile) {
			this.$store.dispatch("createProfile", profile);
			this.$router.push({ name: "tickets" });
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";

.register {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
	max-width: $max-line-length;
	margin-bottom: $large;
}
</style>
