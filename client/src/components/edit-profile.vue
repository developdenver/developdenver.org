<template>
    <form enctype="multipart/form-data" class="edit-profile" @submit.prevent="updateProfile">
        <fieldset class="required">
            <h3>Your Profile</h3>
            <label for="first-name">First Name</label>
            <input type="text" required id="first-name" v-model.trim="profile.properties.firstName" />
            <label for="last-name">Last Name</label>
            <input type="text" required id="last-name" v-model.trim="profile.properties.lastName" />
            <label for="email">Email</label>
            <input
				required
				type="email"
				ref="email"
				id="email"
				name="email"
				v-model.trim="profile.properties.email"
				@change="verifyUniqueEmail"
			/>
            <SetPassword
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
            <textarea id="bio" v-model.trim="profile.properties.bio"></textarea>
            <label for="employer">Employer</label>
            <input type="text" id="employer" v-model.trim="profile.properties.employer" />
            <label for="position">Position</label>
            <input type="text" id="position" v-model.trim="profile.properties.position" />
            <label for="website">Website</label>
            <input type="url" id="website" v-model.trim="profile.properties.website" />
            <label for="github-username">Github Username</label>
            <input type="text" id="github-username" v-model.trim="profile.properties.githubUsername" />
            <label for="twitter-username">Twitter Username</label>
            <input type="text" id="twitter-username" v-model.trim="profile.properties.twitterUsername" />
            <label for="linkedin-username">LinkedIn Username</label>
            <input type="text" id="linkedin-username" v-model.trim="profile.properties.linkedinUsername" />
        </fieldset>
        <button :disabled="isLoading">{{buttonLabel}}</button>
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
		};
	},
	props: {
		profile: {
			type: Object,
			required: true,
		},
		buttonLabel: String,
	},
	computed: {
		isLoading(){
			return this.$store.getters["services/loading/isLoading"];
		},
	},
	methods: {
		updateProfile() {
			return this.$emit("updateProfile", this.profile);
		},
		setImageUrl(url) {
			Vue.set(this.profile.properties, "profilePhotoUrl", url);
		},
		updatePassword(hashedPassword) {
			this.profile.properties.hashedPassword = hashedPassword;
		},
		async verifyUniqueEmail(event){
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
    label, input, textarea, button {
        display: block;
        width: 100%;
    }
    label {
        color: $medium-grey;
        margin-bottom: $xxs;
    }
    input, textarea {
        margin-bottom: $baseline;
        padding: $baseline;
        border: 0.5px solid $medium-light-grey;
        &:focus {
            border-bottom: 1px solid $primary-color;
        }
    }
    textarea {
        height: $xxl * 2;
        resize: none;
        @include system-font;
    }
    button {
        @include call-to-action-button;
		&[disabled] {
			background-color: $medium-light-grey;
		}
    }
}
</style>
