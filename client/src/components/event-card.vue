<template>
    <div class="event-card">
		<div class="category-bar" :class="{[event.properties.category]: true}"></div>
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
			<p v-if="category" class="category">Category: {{category}}</p>
		</div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			categories: {
				devops: "DevOps",
				careers: "Careers",
				development: "Development",
				product: "Product",
			}
		};
	},
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
		},
		category() {
			return this.categories[this.event.properties.category];
		},
	},
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

	.devops {
		background-color: $devops-color;
	}
	.careers {
		background-color: $career-color;
	}
	.product {
		background-color: $product-color;
	}
	.development {
		background-color: $development-color;
	}

    .event-card {
		.category-bar {
				width: 100%;
				height: 10px;
				margin-top: 0;
				position: absolute;
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
			.category {
				@include italic-body-font;
			}
		}
		.disabled {
			pointer-events: none;
		}
    }
</style>
