<template>
    <section class="user-profile">
        <img :src="profile.properties.profilePhotoUrl" alt="profile photo" />
        <div class="profile-details">
            <h2>{{fullName}}</h2>
			<p>{{profile.properties.position}}<span v-if="profile.properties.employer"> at {{profile.properties.employer}}</span></p>
            <div class="bio">
                <p>{{profile.properties.bio}}</p>
                <p v-if="profile.properties.website" class="website">
					Website: <a :href="websiteWithProtocol" target="_BLANK">{{profile.properties.website}}</a>
				</p>
            </div>
            <ul class="social">
                <li v-if="profile.properties.githubUsername" class="github">
                    <a :href="githubUrl" target="_BLANK">
						<font-awesome-icon :icon="['fab', 'github']" />
					</a>
                </li>
                <li v-if="profile.properties.linkedinUsername" class="linkedin">
                    <a :href="linkedinUrl" target="_BLANK">
						<font-awesome-icon :icon="['fab', 'linkedin']" />
					</a>
                </li>
                <li v-if="profile.properties.twitterUsername" class="twitter">
                    <a :href="twitterUrl" target="_BLANK">
						<font-awesome-icon :icon="['fab', 'twitter']" />
					</a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

export default {
	props: {
		profile: {
			type: Object,
			required: true,
		},
	},
	computed: {
		image() {
			return {
				url: this.profile.properties.profilePhotoUrl,
				altText: "Profile photo",
			};
		},
		fullName() {
			return `${this.profile.properties.firstName} ${this.profile.properties.lastName}`;
		},
		twitterUrl() {
			return `https://www.twitter.com/${this.profile.properties.twitterUsername}`;
		},
		githubUrl() {
			return `https://www.github.com/${this.profile.properties.githubUsername}`;
		},
		linkedinUrl() {
			return `https://www.linkedin.com/in/${this.profile.properties.linkedinUsername}`;
		},
		websiteWithProtocol() {
			return /^https?:\/\//.test(this.profile.properties.website)
				? this.profile.properties.website
				: `https://${this.profile.properties.website}`;
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_general.scss";

.user-profile {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	> img {
		grid-column: 2 / span 3;
		max-width: 100%;
		filter: grayscale(100%);
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
	.profile-details {
		grid-column: 5 / span 4;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
		display: flex;
		flex-flow: column nowrap;
	}
	.social {
		display: flex;
		flex-flow: row wrap;
		li {
			&:not(:first-child){
				margin-left: $baseline;
			}
			width: 40px;
			height: 40px;
			svg {
				width: 100%;
				height: 100%;
				&:hover {
					color: $accent-color;
				}
			}
		}
	}
}
</style>
