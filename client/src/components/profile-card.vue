<template>
    <div class="profile-card">
		<router-link :to="{name: 'profile', params: {id: profile.id}}" :class="{disabled: !profile.id}">
            <div class="frame"></div>
            <img :src="profile.properties.profilePhotoUrl" alt="Profile photo" />
            <div class="name-plate">
                <p class="name">{{profile.properties.firstName}} {{profile.properties.lastName}}</p>
                <p class="job">{{profile.properties.position}} at {{profile.properties.employer}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
	props: {
		profile: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .profile-card {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        &:hover {
            .frame {
                border: 10px solid $primary-color;
            }
            img {
                transform: scale(1.2);
            }
            .name-plate {
                transform: translateY(0);
                opacity: 1;
            }
        }
		.disabled {
			pointer-events: none;
		}
        img {
            width: 100%;
            position: absolute;
            z-index: -10;
            transition: transform 3s cubic-bezier(0, 1, 1, 1);
        }
        .name-plate {
            position: absolute;
            bottom: 0;
            height: 40%;
            width: 100%;
            transition: all 0.3s cubic-bezier(0.666, 0, 0.333, 1);
            opacity: 0;
            transform: translateY(100%);
            background-color: transparentize($dark-grey, 0.1);
            color: $white;
            padding: $large;
            .name {
                @include bold-body-font;
                margin-bottom: 0;
            }
            .job {
                @include body-font;
            }
        }
        .frame {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: border 0.3s cubic-bezier(0.666, 0, 0.333, 1);
            z-index: 10;
            border: 0 solid $primary-color;
        }
    }
</style>
