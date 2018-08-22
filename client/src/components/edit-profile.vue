<template>
    <form enctype="multipart/form-data" class="edit-profile" @submit.prevent="updateProfile">
        <fieldset class="required">
            <h3>Your Profile</h3>
            <label for="first-name">First Name</label>
            <input
				required
				type="text"
				id="first-name"
				placeholder="Drew"
				v-model.trim="profile.properties.firstName"
			/>
            <label for="last-name">Last Name</label>
            <input
				required
				type="text"
				id="last-name"
				placeholder="Dahlman"
				v-model.trim="profile.properties.lastName"
			/>
            <label for="email">Email</label>
            <input
				required
				type="email"
				id="email"
				placeholder="hello@developdenver.org"
				ref="email"
				v-model.trim="profile.properties.email"
				@change="verifyUniqueEmail"
			/>
            <SetPassword
				v-if="isNewProfile"
                @updatePassword="updatePassword"
            />
        </fieldset>
        <fieldset class="optional">
            <h3>Optional (but encouraged)</h3>
            <image-upload
                :uploadUrl="imageUploadUrl"
                @imageUrl="setImageUrl"
            >
                <figure v-if="profile.properties.profilePhotoUrl" class="profile-photo">
                    <img :src="profile.properties.profilePhotoUrl" alt="Profile Photo" />
                </figure>
            </image-upload>
            <label for="bio">Bio</label>
            <textarea
				id="bio"
				placeholder="Specializing in design, development, and strategy."
				v-model.trim="profile.properties.bio"
			></textarea>
            <label for="position">Position</label>
            <input
				type="text"
				id="position"
				placeholder="Developer"
				v-model.trim="profile.properties.position"
			/>
            <label for="employer">Employer</label>
            <input
				type="text"
				id="employer"
				placeholder="Develop Denver"
				v-model.trim="profile.properties.employer"
			/>
            <label for="website">Website</label>
            <input
				type="url"
				id="website"
				placeholder="https://developdenver.org"
				v-model.trim="profile.properties.website"
			/>
            <label for="github-username">Github Username</label>
            <input
				type="text"
				id="github-username"
				placeholder="meuspartum"
				v-model.trim="profile.properties.githubUsername"
			/>
            <label for="twitter-username">Twitter Username</label>
            <input
				type="text"
				id="twitter-username"
				placeholder="meuspartum"
				v-model.trim="profile.properties.twitterUsername"
			/>
            <label for="linkedin-username">LinkedIn Username</label>
            <input
				type="text"
				id="linkedin-username"
				placeholder="meuspartum"
				v-model.trim="profile.properties.linkedinUsername"
			/>
        </fieldset>
        <button :disabled="isLoading">{{buttonLabel}}</button>
    </form>
</template>

<script>
import Vue from "vue";
import ImageUpload from "@/components/image-upload.vue";
import SetPassword from "@/components/set-password.vue";

import { hashPassword } from "../utilities/auth";

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
			this.profile.properties.hashedPassword = await hashPassword(this.password);
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
        img {
            width: 100%;
        }
    }
    button {
        @include call-to-action-button;
		&[disabled] {
			background-color: $medium-light-grey;
		}
    }
}
</style>
