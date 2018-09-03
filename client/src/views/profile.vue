<template>
    <section class="profile">
		<section v-if="talks.length">
			<h2>My Submitted Talks</h2>
			<div v-for="talk in talks" :key="talk.id">
				<p>
					<router-link class="button" :to="{name: 'edit-talk', params: {id: talk.id}}">
						{{talk.properties.title}}, {{talk.properties.type}}
					</router-link>
				</p>
			</div>
		</section>
		<section>
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
			return this.$store.getters["talks/getTalksByUserId"](this.profile.id);
		}
	},
	methods: {
		async updateProfile(profile) {
			await this.$store.dispatch("services/user/setProfile", profile);
			this.$router.push({ name: "news" });
		},
	},
	mounted() {
		this.$store.dispatch("talks/fetchTalks");
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";

.profile {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
	margin-bottom: $large;
	> section {
		margin-bottom: $large;
		h2 {
			@include tertiary-header-font;
			margin-bottom: $baseline;
		}
	}
	.reset-password {
		margin-top: $large;
	}
}
</style>
