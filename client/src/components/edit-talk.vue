<template>
    <form enctype="multipart/form-data" class="edit-talk" @submit.prevent="updateTalk">
        <fieldset class="required">
            <h3>Submit a Talk</h3>
            <label for="first-name">Talk Title</label>
            <input
                required
                type="text"
                id="talk-title"
                placeholder="Super Awesome Title Here"
                v-model.trim="talk.properties.title"
              />
            <label for="talk-type"> Type </label>
            <div id="custom-select">
              <select 
                id="select-box"
                v-model="talk.properties.type">
                  <option value="talk">Talk</option>
                  <option value="Lightning">Lightning Talk</option>
                  <option value="Panel">Panel</option>
              </select>
            </div>
            <image-upload
                title="Talk Photo"
                :uploadUrl="imageUploadUrl"
                @imageUrl="setImageUrl">
                <figure v-if="talk.properties.photoUrl" class="talk-photo">
                    <img :src="talk.properties.photoUrl" alt="Talk Photo" />
                </figure>
            </image-upload>
            <label for="bio">Description</label>
            <textarea
              id="description"
              placeholder="Describe your awesome talk here..."
              v-model.trim="talk.properties.description">
            </textarea>
      </fieldset>
        <button :disabled="isLoading">{{buttonLabel}}</button>
    </form>
</template>

<script>
import Vue from "vue";
import ImageUpload from "@/components/image-upload.vue";

const imageUploadUrl = process.env.VUE_APP_IMAGE_UPLOAD_URL;

export default {
	components: {
		ImageUpload,
	},
	data() {
		return {
      imageUploadUrl,
		};
	},
	props: {
		talk: {
			type: Object,
			required: true,
		},
		buttonLabel: String,
	},
	computed: {
		isLoading() {
			return this.$store.getters["services/loading/isLoading"];
		},
	},
	methods: {
		async updateTalk() {
      // validate everything is there?
			return this.$emit("updateTalk", this.talk);
		},
		setImageUrl(url) {
			Vue.set(this.talk.properties, "photoUrl", url);
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_general.scss";
@import "@/styles/_typography.scss";

.edit-talk {
  margin-bottom: $large;
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
      select {
        margin-top: $baseline;
        margin-bottom: $large;
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
