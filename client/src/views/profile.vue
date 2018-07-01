<template>
	<section class="profile">
		<h2>Edit Profile</h2>
		<edit-profile
			:profile="profile"
		/>
		<p><router-link :to="{name: 'change-password'}">Change password</router-link></p>
	</section>
</template>

<script>
	import EditProfile from "@/components/edit-profile.vue";
	import camelCase from "camelcase";

	export default {
		components: {
			EditProfile
		},
		computed: {
			profile(){
				return this.$store.state.currentProfile;
			}
		},
		methods: {
			updateProfile(updatedProfile){
			}
		}
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

