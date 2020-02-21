<template>
	<form
		enctype="multipart/form-data"
		class="edit-profile"
		@submit.prevent="updateProfile"
	>
		<div class="form-section required">
			<h3 v-if="!isNewProfile">Account Info</h3>
			<p class="required-field">Required field</p>
			<div class="form-row">
				<label for="first-name" class="required">First Name </label>
				<input
					required
					class="first-name"
					type="text"
					id="first-name"
					v-model.trim="profile.properties.firstName"
				/>
			</div>
			<div class="form-row">
				<label for="last-name" class="required"> Last Name </label>
				<input
					required
					class="last-name"
					type="text"
					id="last-name"
					v-model.trim="profile.properties.lastName"
				/>
			</div>
			<div class="form-row">
				<label for="email" class="required"> Email Address </label>
				<input
					required
					class="email"
					type="email"
					id="email"
					placeholder="name@domain.com"
					ref="email"
					v-model.trim="profile.properties.email"
					@change="verifyUniqueEmail"
				/>
			</div>
		</div>
		<div v-if="isNewProfile" class="form-section">
			<SetPassword @updatePassword="updatePassword" />
		</div>

		<div class="form-section" v-if="!isNewProfile">
			<h3>Profile Info</h3>
			<div class="form-row">
				<image-upload
					class="profile-photo"
					title="Profile Photo"
					:uploadUrl="imageUploadUrl"
					@imageUrl="setImageUrl"
				>
					<figure
						v-if="profile.properties.profilePhotoUrl"
						class="profile-photo"
					>
						<img
							:src="profile.properties.profilePhotoUrl"
							alt="Profile Photo"
						/>
					</figure>
				</image-upload>
			</div>
			<div class="form-row">
				<label for="bio"> Bio </label>
				<textarea
					class="bio"
					id="bio"
					placeholder="Here's where you brag about yourself. Graciously, of course."
					v-model.trim="profile.properties.bio"
				></textarea>
			</div>
		</div>
		<div class="form-section" v-if="!isNewProfile">
			<h3>Employment Info</h3>
			<div class="form-row">
				<label for="position"> Position </label>
				<input
					type="text"
					class="position"
					id="position"
					v-model.trim="profile.properties.position"
				/>
			</div>
			<div class="self-employed form-row select-input">
				<input
					class="self-employed"
					type="checkbox"
					id="isSelfEmployed"
					v-model="profile.properties.isSelfEmployed"
				/>
				<label for="isSelfEmployed" class="overlay">
					<div class="circle"></div>
					<h4>Self-employed?</h4>
				</label>
			</div>
			<div class="form-row">
				<label for="employer"> Employer </label>
				<input
					class="employer"
					type="text"
					id="employer"
					v-model.trim="profile.properties.employer"
				/>
			</div>
		</div>
		<div class="form-section" v-if="!isNewProfile">
			<h3>Social Info</h3>
			<div class="form-row">
				<label for="employer"> Website </label>
				<input
					type="url"
					id="website"
					placeholder="https://example.com"
					pattern="https://.*"
					size="30"
					v-model.trim="profile.properties.website"
				/>
			</div>
			<div class="form-row">
				<label for="github-username"> Github Username </label>
				<input
					type="text"
					id="github-username"
					v-model.trim="profile.properties.githubUsername"
				/>
			</div>
			<div class="form-row">
				<label for="twitter-username"> Twitter Username </label>
				<input
					type="text"
					id="twitter-username"
					v-model.trim="profile.properties.twitterUsername"
				/>
			</div>
			<div class="form-row">
				<label for="linkedin-username">
					LinkedIn Username
				</label>
				<input
					type="text"
					id="linkedin-username"
					v-model.trim="profile.properties.linkedinUsername"
				/>
			</div>
		</div>

		<button class="button" :disabled="isLoading">{{ buttonLabel }}</button>
	</form>
</template>

<script>
import Vue from 'vue';
import ImageUpload from '@/components/image-upload.vue';
import SetPassword from '@/components/set-password.vue';

const imageUploadUrl = process.env.VUE_APP_IMAGE_UPLOAD_URL;
const uniqueEmailUrl = `${process.env.VUE_APP_API_URL}/${
	process.env.VUE_APP_UNIQUE_EMAIL_ENDPOINT
}`;

export default {
	components: {
		ImageUpload,
		SetPassword,
	},
	data() {
		return {
			imageUploadUrl,
			password: '',
		};
	},
	props: {
		profile: {
			type: Object,
			required: true,
		},
		buttonLabel: String,
		isNewProfile: Boolean,
	},
	computed: {
		isLoading() {
			return this.$store.getters['services/loading/isLoading'];
		},
	},
	methods: {
		async updateProfile() {
			if (this.password) {
				this.profile.properties.password = this.password;
			}
			this.profile.properties.email = this.profile.properties.email.toLowerCase();
			return this.$emit('updateProfile', this.profile);
		},
		setImageUrl(url) {
			Vue.set(this.profile.properties, 'profilePhotoUrl', url);
		},
		updatePassword(password) {
			this.password = password;
		},
		async verifyUniqueEmail(event) {
			this.$store.dispatch('services/loading/pushLoading');
			await fetch(uniqueEmailUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: event.target.value }),
			})
				.then(response => response.status)
				.then(status => {
					+status === 200
						? this.$refs.email.setCustomValidity('')
						: this.$refs.email.setCustomValidity(
								'This email is already registered. Login?',
						  );
				})
				.catch(error => {
					console.error(error.message);
				});
			this.$store.dispatch('services/loading/popLoading');
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';

.edit-profile {
	@include grid-full-width;
	max-width: 700px;
	fieldset {
		@include grid-form;
	}
	.form-row {
		label {
			cursor: pointer;
			padding: 12px $baseline * 2;
			transition: color 200ms ease-in;
			@media (max-width: $small-breakpoint) {
				padding-left: 0;
			}
		}
		&.self-employed {
			margin: $baseline * 2 0 $baseline 0;
			@media (max-width: $small-breakpoint) {
				padding-left: 0;
				label {
					padding-left: $baseline * 2;
				}
			}
		}
	}
	input,
	textarea,
	button,
	.image-upload {
		margin-left: $baseline * 2;
		width: calc(100% - 40px);
		@media (max-width: $small-breakpoint) {
			margin-left: 0;
			width: 100%;
		}
	}
	textarea {
		height: $baseline * 8;
	}

	.profile-photo {
		img {
			filter: grayscale(100%);
			max-width: 100%;
		}
	}
}
.reset-password-link {
	margin-left: $baseline * 2;
	width: calc(100% - 40px);
	@media (max-width: $small-breakpoint) {
		margin-left: 0;
	}
}
</style>
