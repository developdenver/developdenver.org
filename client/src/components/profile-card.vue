<template>
    <div class="profile-card">
		<router-link :to="{name: 'profile', params: {id: profile.id || 0}}" :class="{disabled: !profile.id}">
            <div class="frame"></div>
			<div class="image-wrapper">
				<img :src="profile.properties.profilePhotoUrl" alt="Profile photo" />
			</div>
            <div class="name-plate">
                <p class="name">{{profile.properties.firstName}} {{profile.properties.lastName}}</p>
                <p v-if="profile.properties.position && profile.properties.employer" class="job">{{profile.properties.position}} at {{profile.properties.employer}}</p>
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
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .profile-card {
    }
</style>
