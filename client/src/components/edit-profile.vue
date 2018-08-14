<template>
    <form enctype="multipart/form-data" class="edit-profile" @submit.prevent="updateProfile">
        <fieldset class="required">
            <h3>Your Profile</h3>
            <label for="first-name">First Name</label>
            <input type="text" required id="first-name" v-model.trim="profile.firstName" />
            <label for="last-name">Last Name</label>
            <input type="text" required id="last-name" v-model.trim="profile.lastName" />
            <label for="email">Email</label>
            <input type="email" required id="email" name="email" v-model.trim="profile.email" />
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
                <figure v-if="profile.profilePhotoUrl" class="profile-photo">
                    <img :src="profile.profilePhotoUrl" alt="Profile Photo" />
                </figure>
            </image-upload>
            <label for="bio">Bio</label>
            <textarea id="bio" v-model.trim="profile.bio">{{profile.bio}}</textarea>
            <label for="employer">Employer</label>
            <input type="text" id="employer" v-model.trim="profile.employer" />
            <label for="position">Position</label>
            <input type="text" id="position" v-model.trim="profile.position" />
            <label for="website">Website</label>
            <input type="url" id="website" v-model.trim="profile.website" />
            <label for="github-username">Github Username</label>
            <input type="text" id="github-username" v-model.trim="profile.githubUsername" />
            <label for="twitter-username">Twitter Username</label>
            <input type="text" id="twitter-username" v-model.trim="profile.twitterUsername" />
            <label for="linkedin-username">LinkedIn Username</label>
            <input type="text" id="linkedin-username" v-model.trim="profile.linkedinUsername" />
        </fieldset>
        <button>{{buttonLabel}}</button>
    </form>
</template>

<script>
import Vue from "vue";
import camelCase from "camelcase";
import ImageUpload from "@/components/image-upload.vue";
import SetPassword from "@/components/set-password.vue";

export default {
    components: {
        ImageUpload,
        SetPassword,
    },
    data(){
        return {
            imageUploadUrl: `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_IMAGE_UPLOAD_ENDPOINT}`
        }
    },
    props: {
        profile: {
            type: Object,
            default: () => ({}),
        },
        buttonLabel: String,
    },
    methods: {
        updateProfile(){
            console.log('pro', this.profile.email)
            return this.$emit("updateProfile", this.profile);
        },
        setImageUrl(url){
            Vue.set(this.profile, "profilePhotoUrl", url);
        },
        updatePassword(hashedPassword){
            console.log('hash', hashedPassword)
            this.profile.hashedPassword = hashedPassword;
        },
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
    }
}
</style>
