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
	@import "@/styles/_general.scss";
    .profile-card-list {
		display: grid;
		column-gap: $gutter;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: auto;
		padding-top: $baseline * 10;
		@media (max-width: $small-breakpoint) {
			padding-top: 0;
			grid-template-columns: 1fr;
		}
		li {
			margin-bottom: $baseline * 2;
			@media (min-width: $small-breakpoint) {
				margin-bottom: $baseline * 5;
				&:nth-child(3n + 1){
					margin-top: $baseline * -8;
				}
				&:nth-child(3n + 2){
					margin-top: $baseline * -1;
				}
				&:nth-child(3n + 3){
					margin-top: $baseline * -10;
				}
			}
		}
    }
</style>
