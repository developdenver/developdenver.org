<template>
    <section class="user-profile">
        <img :src="profile.properties.profilePhotoUrl" alt="profile photo" />
        <div class="profile-details">
            <h2>{{fullName}}</h2>
            <p>{{profile.properties.position}} at {{profile.properties.employer}}</p>
            <div class="bio">
                <p>{{profile.properties.bio}}</p>
                <p v-if="profile.properties.website" class="website">
					Website: <a :href="profile.properties.website" target="_BLANK">{{profile.properties.website}}</a>
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
import FeatureBenefit from "@/components/feature-benefit.vue";

export default {
	components: {
		FeatureBenefit,
	},
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
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";

$clip-amount: 80px;

.user-profile {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
    margin-bottom: calc($clip-amount * -1) + $large;
    .profile-details {
        order: 1;
        margin-top: $xxxl * -2;
        margin-right: $xl * -1;
        background-color: $pure-white;
        padding: $large;
        z-index: 10;
        h2 {
            @include section-header-font;
        }
        p {
            @include stylized-body-font;
        }
        .bio {
            padding: $large 0;
            border-top: 0.5px solid $medium-light-grey;
            border-bottom: 0.5px solid $medium-light-grey;
            a {
                color: $primary-color;
            }
            .website {
                margin-top: $xl;
            }
        }
        .social {
            padding: $large 0;
			z-index: 30;
			li {
				display: inline-block;
				+ li {
					margin-left: $baseline;
				}
				a {
					color: $medium-grey;
					svg {
						font-size: $large;
					}
				}
			}
        }
    }
    img {
        order: 2;
        clip-path: inset($clip-amount 0);
        width: 100%;
    }
    @media (max-width: $large-breakpoint){
        align-self: auto;
        flex-flow: column nowrap;
        align-self: flex-start;
        max-width: 100%;
        img {
            order: 1;
            width: 100%;
        }
        .benefit {
            order: 2;
            width: 90%;
            margin-left: 0;
            margin-top: $xl * -1;
        }
    }
    @media (max-width: $large-breakpoint){
        & {
            margin-top: 0;
            margin-bottom: $large;
            img {
                display: block;
                width: 100%;
                clip-path: none;
            }
        }
    }
}
</style>
