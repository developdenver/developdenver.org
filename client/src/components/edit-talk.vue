<template>
  <form enctype="multipart/form-data" class="edit-talk" @submit.prevent="updateTalk">
    <fieldset class="required">
      <h3>{{componentTitle}}</h3>
      <label for="talk-title">Talk Title</label>
      <input
        required
        type="text"
        id="talk-title"
        placeholder="Super Awesome Title Here"
        v-model.trim="talk.properties.title"
        @change="setValid('title')"
      >
      <p class="error" v-if="errors.title">Title is required.</p>
      <label for="talk-type">Type</label>
      <div id="custom-select">
        <select id="select-box" v-model="talk.properties.type" @change="setValid('type')">
          <option
            v-for="option in talkTypes"
            :value="option.value"
            :key="option.value"
          >{{option.label}}</option>
        </select>
      </div>
      <p class="error" v-if="errors.type">Type is required.</p>
      <label for="bio">Description</label>
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
        .talk-photo {
            max-height: $max-line-length;
            overflow-y: scroll;
            img {
                width: 100%;
            }
        }
        select {
            margin-top: $baseline;
            margin-bottom: $large;
            padding: $small 0;
            width: 100%;
        }
    }
    button {
        @include call-to-action-button;
        &[disabled] {
            background-color: $medium-light-grey;
        }
    }
    .error {
        color: $warning;
    }
}
</style>
