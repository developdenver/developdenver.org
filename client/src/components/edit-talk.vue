<template>
  <form enctype="multipart/form-data" class="edit-talk" @submit.prevent="updateTalk">
    <fieldset class="required">
      <h3>{{componentTitle}}</h3>
      <input
        required
        type="text"
        id="talk-title"
        placeholder="Talk Title"
        v-model.trim="talk.properties.title"
        @change="setValid('title')"
      >
      <p class="error" v-if="errors.title">Title is required.</p>
      <div id="custom-select">
        <select id="select-box" v-model="talk.properties.type" @change="setValid('type')">
			<option :value="null" disabled>Talk Type</option>
          <option
            v-for="option in talkTypes"
            :value="option.value"
            :key="option.value"
          >{{option.label}}</option>
        </select>
      </div>
      <p class="error" v-if="errors.type">Type is required.</p>
      <textarea
        id="description"
        @change="setValid('description')"
        placeholder="Describe your awesome talk here, markdown valid!"
        v-model.trim="talk.properties.description"
      ></textarea>
      <p class="error" v-if="errors.description">Description is required.</p>
    </fieldset>
    <button :disabled="isLoading">{{buttonLabel}}</button>
  </form>
</template>

<script>
import ImageUpload from '@/components/image-upload.vue';

const imageUploadUrl = process.env.VUE_APP_IMAGE_UPLOAD_URL;

export default {
    components: {
        ImageUpload,
    },
    data() {
        return {
            imageUploadUrl,
            errors: {},
            talkTypes: [
                {
                    label: 'Talk (30 - 45 minutes)',
                    value: 'talk',
                },
                {
                    label: 'Lightning Talk (5 - 10 minutes)',
                    value: 'lightning',
                },
                {
                    label: 'Panel (30 - 45 minutes, multiple people)',
                    value: 'panel',
                },
            ],
        };
    },
    props: {
        talk: {
            type: Object,
            required: true,
        },
        buttonLabel: String,
        componentTitle: String,
    },
    computed: {
        isLoading() {
            return this.$store.getters['services/loading/isLoading'];
        },
    },
    methods: {
        setValid(field) {
            this.$set(this.errors, field, !this.talk.properties[field].trim());
        },
        updateTalk() {
            if (this.validTalk()) {
                this.$emit('updateTalk', this.talk);
            }
        },
        validTalk() {
            let valid = true;
            const fields = ['title', 'type', 'description'];
            fields.forEach(field => {
                const fieldValid = !!this.talk.properties[field].trim();
                this.$set(this.errors, field, !fieldValid);
                if (valid) {
                    valid = fieldValid;
                }
            });
            return valid;
        },
        setImageUrl(url) {
            this.talk.properties.talkPhotoUrl = url;
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';

.edit-talk {
	input, textarea, select, button {
		width: 100%;
		margin-bottom: $baseline;
	}
	textarea {
		height: $baseline * 12;
	}
	select {
		background-color: $black;
		color: $white;
		border: 2px solid $white;
		padding: $baseline;
	}
	button {
		@include call-to-action;
		background-color: $black;
		color: $white;
		cursor: pointer;
	}
}
</style>
