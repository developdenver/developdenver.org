<template>
	<form
		enctype="multipart/form-data"
		class="edit-talk"
		@submit.prevent="updateTalk"
	>
		<div class="form-section">
			<p class="required-field">Required field</p>
			<fieldset class="required">
				<div class="form-row">
					<label for="talk-title" class="required">
						Talk Title
					</label>
					<input
						required
						type="text"
						id="talk-title"
						placeholder="Keep it short"
						v-model.trim="talk.properties.title"
						@change="setValid('title')"
					/>
					<p class="error" v-if="errors.title">Title is required.</p>
				</div>
				<div class="form-row">
					<div id="custom-select">
						<label for="select-box" class="required">
							Talk Type</label
						>
						<select
							id="select-box"
							v-model="talk.properties.type"
							@change="setValid('type')"
						>
							<option :value="null" class="disabled" disabled
								>Select Type</option
							>
							<option
								v-for="option in talkTypes"
								:value="option.value"
								:key="option.value"
								>{{ option.label }}</option
							>
						</select>
					</div>
					<p class="error" v-if="errors.type">Type is required.</p>
				</div>
				<div class="form-row">
					<label for="desription" class="required">
						Description
					</label>
					<textarea
						id="description"
						@change="setValid('description')"
						placeholder="Describe your awesome talk here, markdown valid!"
						v-model.trim="talk.properties.description"
					></textarea>
					<p class="error" v-if="errors.description">
						Description is required.
					</p>
				</div>
			</fieldset>
		</div>
		<button :disabled="isLoading">{{ buttonLabel }}</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
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
	mounted() {
		let select = document.getElementById('select-box');
		var talkType = select.options[select.selectedIndex].text;
		if (talkType !== 'Select Type') {
			document.getElementById('select-box').style.color = '#000000';
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters['services/loading/isLoading'];
		},
	},
	methods: {
		setValid(field) {
			this.$set(this.errors, field, !this.talk.properties[field].trim());
			if (field === 'type') {
				document.getElementById('select-box').style.color = '#000000';
			}
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
				const fieldValid =
					!!this.talk.properties[field] &&
					this.talk.properties[field].trim();
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
		}
	}
	input,
	textarea,
	button,
	#custom-select #select-box,
	.error {
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
		filter: grayscale(100%);
		img {
			max-width: 100%;
		}
	}
}
</style>
