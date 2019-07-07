<template>
    <div class="profile-card">
		<router-link :to="{name: 'profile', params: {id: profile.id || 0}}" :class="{disabled: !profile.id}">
            <div class="frame"></div>
			<div class="image-wrapper">
				<img :src="profile.properties.profilePhotoUrl" alt="Profile photo" />
			</div>
            <div class="name-plate">
                <p class="name">{{profile.properties.firstName}} {{profile.properties.lastName}}</p>
                <p v-if="profile.properties.employer" class="job">{{profile.properties.employer}}</p>
				<p v-else-if="profile.properties.position" class="job">{{profile.properties.position}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
	props: {
		profile: {
			type: Object,
			required: true,
		},
	},
	data(){
		return {
			profile: {
				id: 1,
				properties: {
					firstName: "Kyle",
					lastName: "Coberly",
					position: "Teacher",
					employer: "Flatiron School",
					profilePhotoUrl: "https://pbs.twimg.com/profile_images/1079062407685693440/pbYecn7U.jpg",
				}
			}
		}
	}
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .profile-card {
		img {
			max-width: 100%;
			filter: grayscale(100%);
		}
		.name-plate {
			@include talk-title-font;
			padding-top: $baseline;
			p {
				border-bottom: 1px solid $white;
			}
		}
    }
</style>
