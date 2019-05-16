<template>
    <div class="event-card">
		<div class="category-bar" :class="{[event.properties.category]: true}"></div>
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
						name: event.properties.isWorkshop ? 'workshop' : 'talk',
						params: {id: event.id}
					}"
					:class="{disabled: !event.id}"
				>
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
	}
	.careers {
	}
	.product {
	}
	.development {
	}

    .event-card {
    }
</style>
