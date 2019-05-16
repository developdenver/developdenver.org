<template>
    <form enctype="multipart/form-data" class="edit-profile" @submit.prevent="updateProfile">
        <fieldset class="required">
            <input
				required
				class="first-name"
				type="text"
				id="first-name"
				placeholder="First Name"
				v-model.trim="profile.properties.firstName"
			/>
            <input
				required
				class="last-name"
				type="text"
				id="last-name"
				placeholder="Last Name"
				v-model.trim="profile.properties.lastName"
			/>
            <input
				required
				class="email"
				type="email"
				id="email"
				placeholder="Email"
				ref="email"
				v-model.trim="profile.properties.email"
				@change="verifyUniqueEmail"
			/>
            <SetPassword
				v-if="isNewProfile"
                @updatePassword="updatePassword"
            />
        </fieldset>
		<h2>Optional <span>(but encouraged)</span></h2>
        <fieldset class="optional">
            <image-upload
				class="profile-photo"
                title="Profile Photo"
                :uploadUrl="imageUploadUrl"
                @imageUrl="setImageUrl"
            >
                <figure v-if="profile.properties.profilePhotoUrl" class="profile-photo">
                    <img :src="profile.properties.profilePhotoUrl" alt="Profile Photo" />
                </figure>
            </image-upload>
            <textarea
				class="bio"
				id="bio"
				placeholder="Bio"
				v-model.trim="profile.properties.bio"
			></textarea>
            <input
				type="text"
				class="position"
				id="position"
				placeholder="Position"
				v-model.trim="profile.properties.position"
			/>
			<div class="self-employed">
				<label for="isSelfEmployed">Self-employed?</label>
				<input
					class="self-employed"
					type="checkbox"
					id="isSelfEmployed"
					v-model="profile.properties.isSelfEmployed"
				/>
			</div>
            <input
				class="employer"
				v-if="!profile.properties.isSelfEmployed"
				type="text"
				id="employer"
				placeholder="Employer"
				v-model.trim="profile.properties.employer"
			/>
            <input
				type="text"
				id="website"
				placeholder="Website"
				v-model.trim="profile.properties.website"
			/>
            <input
				type="text"
				id="github-username"
				placeholder="Github Username"
				v-model.trim="profile.properties.githubUsername"
			/>
            <input
				type="text"
				id="twitter-username"
				placeholder="Twitter Username"
				v-model.trim="profile.properties.twitterUsername"
			/>
            <input
				type="text"
				id="linkedin-username"
				placeholder="LinkedIn Username"
				v-model.trim="profile.properties.linkedinUsername"
			/>
			<button :disabled="isLoading">{{buttonLabel}}</button>
        </fieldset>
    </form>
</template>

<script>
import Vue from "vue";
import ImageUpload from "@/components/image-upload.vue";
import SetPassword from "@/components/set-password.vue";

const imageUploadUrl = process.env.VUE_APP_IMAGE_UPLOAD_URL;
const uniqueEmailUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_UNIQUE_EMAIL_ENDPOINT}`;

export default {
	components: {
		ImageUpload,
		SetPassword,
	},
	data() {
		return {
			imageUploadUrl,
			password: "",
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
			return this.$store.getters["services/loading/isLoading"];
		},
	},
	methods: {
		async updateProfile() {
			if (this.password) {
				this.profile.properties.password = this.password;
			}
			this.profile.properties.email = this.profile.properties.email.toLowerCase();
			return this.$emit("updateProfile", this.profile);
		},
		setImageUrl(url) {
			Vue.set(this.profile.properties, "profilePhotoUrl", url);
		},
		updatePassword(password) {
			this.password = password;
		},
		async verifyUniqueEmail(event) {
			this.$store.dispatch("services/loading/pushLoading");
			await fetch(uniqueEmailUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({email: event.target.value}),
			}).then(response => response.status)
				.then(status => {
					+status === 200
						? this.$refs.email.setCustomValidity("")
						: this.$refs.email.setCustomValidity("This email is already registered. Login?");
				}).catch(error => {
					console.error(error.message);
				});
			this.$store.dispatch("services/loading/popLoading");
		}
	},
};
</script>

<style lang="scss">
@import "@/styles/_general.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_typography.scss";

.edit-profile {
	@include grid-full-width;
	@include grid;
	fieldset {
		@include grid-form;
	}
	h2 {
		@include grid-heading;
		span {
			display: block;
			@include body-font;
		}
	}
	input, textarea {
		width: 100%;
	}
	button {
		@include call-to-action;
		background-color: hsla(0, 0%, 0%, 0);
		color: $white;
		cursor: pointer;
	}
	textarea {
		height: $baseline * 8;
	}
	.profile-photo {
		filter: grayscale(100%);
	}
	.self-employed {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin: $baseline / 2 0;
		input {
			width: auto;
		}
	}
}
</style>
