<template>
  <section class="talk">
    <div class="talk-details">
      <h2>{{talk.properties.title}}</h2>
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
        <p class="talk-type">Type: {{talkLabel}}</p>
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

$clip-amount: 80px;

.talk {
}
</style>
