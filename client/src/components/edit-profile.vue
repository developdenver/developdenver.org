<template>
	<form class="edit-profile" @submit.prevent="updateProfile">
		<fieldset class="required">
			<h3>Edit Profile</h3>
			<label for="first-name">First Name</label>
			<input type="text" required id="first-name" name="first-name" :value="profile.firstName" />
			<label for="last-name">Last Name</label>
			<input type="text" required id="last-name" name="last-name" :value="profile.lastName" />
			<label for="email">Email</label>
			<input type="email" required id="email" name="email" :value="profile.email" />
		</fieldset>
		<fieldset class="optional">
			<h3>Optional (but encouraged)</h3>
			<label for="profile-photo" >Profile Photo</label>
			<figure id="profile-photo" v-if="profile.profilePhotoUrl">
				<img :src="profile.profilePhotoUrl" />
			</figure>
			<input type="file" id="profile-photo-upload" name="profile-photo-upload" />
			<label for="bio">Bio</label>
			<input type="text" id="bio" name="bio" :value="profile.bio" />
			<label for="employer">Employer</label>
			<input type="text" id="employer" name="employer" :value="profile.employer" />
			<label for="position">Position</label>
			<input type="text" id="position" name="position" :value="profile.position" />
			<label for="website">Website</label>
			<input type="url" id="website" name="website" :value="profile.website" />
			<label for="github-username">Github Username</label>
			<input type="text" id="github-username" name="github-username" :value="profile.githubUsername" />
			<label for="twitter-username">Twitter Username</label>
			<input type="text" id="twitter-username" name="twitter-username" :value="profile.twitterUsername" />
		</fieldset>
		<input type="submit" value="Update" />
	</form>
</template>

<script>
	import camelCase from "camelcase";

	export default {
		props: {
			profile: Object
		},
		methods: {
			updateProfile(event){
				const formData = [...event.target.elements]
					.filter(element => this.$props.profile[camelCase(element.name)])
					.reduce((formData, element) => {
						formData[camelCase(element.name)] = element.value;
						return formData;
					}, {});
				this.$emit("updateProfile", formData);
			}
		}
	};
</script>

<style lang="scss">
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_general.scss";
	@import "@/styles/_typography.scss";

	.edit-profile {
		fieldset {
			background-color: $light-grey;
			padding: $large $baseline;
			margin-bottom: $large;
			box-shadow: 0 0 3px $medium-light-grey;
			h3 {
				margin-bottom: $baseline;
				@include fieldset-header-font;
				color: $dark-grey;
			}
		}
		label, input {
			display: block;
			width: 100%;
		}
		label {
			color: $medium-grey;
			margin-bottom: $xxs;
		}
		input {
			margin-bottom: $baseline;
			padding: $baseline;
			border: 0.5px solid $medium-light-grey;
			&:focus {
				border-bottom: 1px solid $primary-color;
			}
		}
		[type=submit] {
			@include call-to-action-button;
		}
	}
</style>
