<template>
    <div class="event-card">
		<div v-if="event.properties.category == 'DevOps'" class="category-bar devops"></div>
		<div v-if="event.properties.category == 'Career'" class="category-bar career"></div>
		<div v-if="event.properties.category == 'Product'" class="category-bar product"></div>
		<div v-if="event.properties.category == 'Development'" class="category-bar development"></div>
		<figure>
			<router-link :to="{name: 'profile', params: {id: event.properties.authorId}}" :class="{disabled: !event.properties.authorId}">
				<img :src="photoUrl" :alt="authorName" />
			</router-link>
		</figure>
		<div class="details">
			<h4>
				<router-link :to="{name: 'talk', params: {id: event.id}}" :class="{disabled: !event.properties.authorId}">
					{{event.properties.title}}
				</router-link>
			</h4>
			<p>{{authorName}}</p>
		</div>
    </div>
</template>

<script>
export default {
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
	computed: {
		authorName() {
			return `${this.event.properties.firstName} ${this.event.properties.lastName}`;
		},
		photoUrl() {
			const fallback = "https://pbs.twimg.com/profile_images/1033908994870374400/2nUcOGak_400x400.jpg";
			return this.event.properties.profilePhotoUrl || fallback;
		}
	},
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .event-card {
		.category-bar {
				width: 100%;
				height: 10px;
				margin-top: 0;
				position: absolute;
				.devops {
					background-color: $devops-color;
				}
				.career {
					background-color: $career-color;
				}
				.product {
					background-color: $product-color;
				}
				.development {
					background-color: $development-color;
				}
			}
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
        position: relative;
        width: 100%;
        overflow: hidden;
		background-color: $light-grey;
		z-index: 1;
		@media (max-width: $small-breakpoint) {
			flex-flow: column nowrap;
		}
		figure {
			z-index: 2;
			max-width: 200px;
			@media (max-width: $small-breakpoint) {
				max-width: initial;
				padding: $baseline;
			}
			img {
				width: 100%;
			}
		}
		.details {
			padding: $large;
			flex: 1;
			h4 > a {
				@include tertiary-header-font;
			}
		}
		.disabled {
			pointer-events: none;
		}
    }
</style>
