<template>
    <ul class="profile-card-list">
        <li
			v-for="(profile, index) in profiles"
			:key="index"
		>
            <profile-card :profile="profile" />
        </li>
    </ul>
</template>

<script>
import ProfileCard from "@/components/profile-card.vue";

export default {
	components: {
		ProfileCard,
	},
	props: {
		profiles: Array,
	},
};
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";

    .profile-card-list {
        display: flex;
        flex-flow: row wrap;
        li {
            width: calc(100% * (1/4));
			@media (max-width: $large-breakpoint) {
				width: calc(100% * (1/2));
			}
			@media (max-width: $small-breakpoint) {
				width: 100%;
			}
        }
    }
</style>
