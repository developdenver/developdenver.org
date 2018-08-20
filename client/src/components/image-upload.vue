<template>
    <form
        method="POST"
        class="image-upload"
        enctype="multipart/form-data"
        @submit.prevent="uploadFile"
    >
        <label for="profile-photo-upload">Profile Photo</label>
        <slot />
        <input
            ref="imageUpload"
            @change="$refs.submit.click()"
            :disabled="isSaving"
            accept="image/*"
            type="file"
            id="profile-photo-upload"
            name="file"
        />
        <p v-if="isSaving" class="progress">
            File is uploading
            <span class="one">.</span>
            <span class="two">.</span>
            <span class="three">.</span>
        </p>
        <p v-if="isError" class="error">There was an error uploading your image.</p>
        <input type="submit" ref="submit" />
    </form>
</template>

<script>
export default {
	data() {
		return {
			isSaving: false,
			isError: false,
		};
	},
	props: {
		uploadUrl: String,
	},
	methods: {
		async uploadFile(event) {
			this.$store.dispatch("services/loading/pushLoading");
			this.isSaving = true;
			const image = await fetch(this.uploadUrl, {
				method: "POST",
				body: new FormData(event.target),
			}).then(response => response.json())
				.then(response => {
					this.isError = false;
					return response.imageUrl;
				}).catch(error => {
					console.error(error.message);
					this.isError = true;
				});
			this.$el.reset();
			this.isSaving = false;
			this.$store.dispatch("services/loading/popLoading");

			this.$emit("imageUrl", image);
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

.image-upload {
    .progress {
        .one, .two, .three {
            opacity: 0;
            animation: ellipses 1.3s infinite;
        }
        .one {
            animation-delay: 0.0s;
        }
        .two {
            animation-delay: 0.2s;
        }
        .three {
            animation-delay: 0.3s;
        }
    }
    .error {
        color: $warning;
    }
    [type=submit] {
        display: none;
    }
}
@keyframes ellipses {
    0% {opacity: 0;}
    50% {opacity: 0;}
    100% {opacity: 1;}
}
</style>
