<template>
  <section class="talk">
		<div class="image-icon">
		  <img :src="talk.properties.icon" alt="Icon" />
		</div>
		<div class="talk-details">
		  <h3>{{talk.properties.title}}</h3>
		  <div class="description">
			<p class="author">
			  <router-link
				:to="{
								name: 'profile',
								params: {
									id: talk.properties.authorId,
								},
							}"
			  >{{talk.properties.firstName}} {{talk.properties.lastName}}</router-link>
			</p>
			<div class="description-html" v-html="descriptionHtml"></div>
		  </div>
		</div>
  </section>
</template>

<script>
import Showdown from 'showdown';
const showdown = new Showdown.Converter();

export default {
    data() {
        return {
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
                {
                    label: 'Workshop',
                    value: 'workshop',
                },
                {
                    label: 'Event',
                    value: 'event',
                },
                {
                    label: 'Performance',
                    value: 'performance',
                },
            ],
        };
    },
    props: {
        talk: {
            type: Object,
            required: true,
        },
    },
    computed: {
        descriptionHtml() {
            return this.talk.properties.description
                ? showdown.makeHtml(this.talk.properties.description)
                : '';
        },
        talkLabel() {
            return this.talk.properties.type
                ? this.talkTypes.find(
                      type => type.value === this.talk.properties.type,
                  ).label
                : '';
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.talk {
	@include grid;
	grid-template: auto / repeat(8, 1fr);
	margin-bottom: $baseline * 2;
	.image-icon {
		grid-row: 1;
		grid-column: 1 / span 1;
		img {
			width: 50%;
		}
	}
	.talk-details {
		grid-row: 1;
		grid-column: 3 / span 5;
		column-width: 300px;
		a {
			text-decoration: underline;
		}
		.description-html {
			margin-top: $baseline;
			display: grid;
			grid-gap: $baseline;
			grid-template: auto / repeat(8, 1fr);
		}
	}
}
</style>
