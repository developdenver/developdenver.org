<template>
    <section class="profile">
        <h2>Edit Profile</h2>
        <edit-profile
             :profile="profile"
             buttonLabel="Update Profile"
             @updateProfile="updateProfile"
         />
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
	},
	methods: {
		updateProfile({ profile, }) {
			return this.$store.dispatch("updateProfile", { profile, });
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
    h2 {
        display: none;
    }
}
</style>
