<template>
    <div class="schedule-card">
		<div class="category-bar" :class="{[event.properties.category || event.properties.type]: true}"></div>
		<figure>
			<router-link
				:to="{
					name: 'profile',
					params: {id: event.properties.authorId}
				}"
				:class="{disabled: !event.properties.authorId}"
			>
				<img :src="photoUrl" :alt="authorName" />
			</router-link>
		</figure>
		<div class="details">
			<h4>
				<router-link
					:to="{
						name: 'schedule-listing',
						params: {id: event.properties.id}
					}"
					:class="{disabled: !event.id}"
				>
					{{event.properties.title}}
				</router-link>
			</h4>
			<p class="author-name">
				<router-link
					:to="{
						name: 'profile',
						params: {id: event.properties.authorId}
					}"
					:class="{disabled: !event.properties.authorId}"
				>
					{{authorName}}
				</router-link>
			</p>
			<p class="description">{{category}}. {{event.properties.venue}}, {{event.properties.day}} {{time}}</p>
		</div>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
	data() {
		return {
			categories: {
				devops: "DevOps",
				careers: "Careers",
				development: "Development",
				product: "Product",
				workshop: "Workshop",
				event: "Event",
				performance: "Performance",
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
			return this.categories[this.event.properties.category || this.event.properties.type];
		},
		time() {
			const startTime = dayjs("2018-10-18").add(this.event.properties.startTime, "hours").format("h:mm A");
			const endTime = dayjs("2018-10-18").add(Number(this.event.properties.startTime) + Number(this.event.properties.duration), "hours").format("h:mm A");
			return `${startTime} - ${endTime}`;
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
	.workshop {
		background-color: #ddd;
	}
	.event {
		background-color: #999;
	}

    .schedule-card {
		.category-bar {
			width: 100%;
			height: 10px;
			margin-top: 0;
			position: absolute;
			@media (max-width: $small-breakpoint) {
				position: static;
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
				display: none;
				max-width: initial;
				padding: $baseline;
			}
			img {
				width: 100%;
			}
		}
		.details {
			padding: $baseline;
			flex: 1;
			h4 > a {
				@include tertiary-header-font;
			}
			.description {
				@include italic-body-font;
			}
		}
		.disabled {
			pointer-events: none;
		}
    }
</style>
