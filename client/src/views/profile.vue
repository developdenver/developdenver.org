<template>
    <section class="profile">
		<pre>{{talks}}</pre>
        <h2>Edit Profile</h2>
        <edit-profile
			buttonLabel="Update Profile"
			:isNewProfile="false"
			:profile="profile"
			@updateProfile="updateProfile"
         />
		<router-link class="reset-password" :to="{name: 'reset-password'}">
			Reset password
		</router-link>
    </section>
</template>

<script>
import EditProfile from "@/components/edit-profile.vue";

export default {
	components: {
		EditProfile,
	},
	computed: {
		profile() {
			return this.$store.getters["services/user/currentProfile"];
		},
		talks() {
			console.log(this.profile)
			return this.$store.getters["services/talk/getTalksByUserId"](this.profile.id);
		}
	},
	methods: {
		async updateProfile(profile) {
			await this.$store.dispatch("services/user/setProfile", profile);
			this.$router.push({ name: "news" });
		},
	},
	mounted() {
		this.$store.dispatch("services/talk/fetchTalks");
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
