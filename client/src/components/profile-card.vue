<template>
	<div class="profile-card">
		<router-link
			:to="{ name: 'profile', params: { id: profile.id || 0 } }"
			:class="{ disabled: !profile.id }"
		>
			<div class="frame"></div>
			<div class="image-wrapper">
				<img
					v-if="!this.showDefaultImage"
					:src="profile.properties.profilePhotoUrl"
					alt="Profile photo"
					@error="imageLoadError"
				/>
				<img
					v-if="this.showDefaultImage"
					src="https://i.kym-cdn.com/entries/icons/original/000/023/419/nerd_smoking.JPG"
					alt="placeholder photo"
				/>
			</div>
			<div class="name-plate">
				<p class="name">
					{{ profile.properties.firstName }}
					{{ profile.properties.lastName }}
				</p>
				<p v-if="profile.properties.employer" class="job">
					{{ profile.properties.employer }}
				</p>
				<p v-else-if="profile.properties.position" class="job">
					{{ profile.properties.position }}
				</p>
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
	data() {
		return {
			showDefaultImage: false,
		};
	},
	methods: {
		imageLoadError() {
			this.showDefaultImage = true;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_typography.scss';

.profile-card {
	.image-wrapper {
		max-height: 400px;
		min-width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		img {
			width: 100%;
			filter: grayscale(100%);
		}
	}
	.name-plate {
		@include tertiary-font;

		padding-top: $baseline;
		p {
			border-bottom: 1px solid $red;
			font-size: 14px;
		}
	}
}
</style>
