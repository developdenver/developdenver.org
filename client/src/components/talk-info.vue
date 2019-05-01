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
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    .talk-image {
        max-height: 100vh;
    }
    .talk-details {
        order: 1;
        margin-top: $xl * -1;
        margin-right: $xl * -1;
        background-color: $pure-white;
        padding: $large;
        z-index: 10;
        min-width: 40%;
        h2 {
            @include section-header-font;
        }
        p {
            @include stylized-body-font;
        }
        .description {
            padding: $large 0;
            border-top: 0.5px solid $medium-light-grey;
            border-bottom: 0.5px solid $medium-light-grey;
            a {
                color: $primary-color;
            }
            .talk-type {
                @include italic-body-font;
            }
            .description-html {
                line-height: 1.5;
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    @include fieldset-header-font;
                }
                ul,
                ol {
                    list-style-type: circle;
                    margin-bottom: $baseline;
                }
                strong {
                    font-weight: 700;
                }
                em {
                    font-style: italic;
                }
            }
        }
    }
    img {
        order: 2;
        clip-path: inset($clip-amount 0);
        max-width: 60%;
    }
    @media (max-width: $medium-breakpoint) {
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
            order: 1;
            width: 100%;
            clip-path: none;
        }
        .talk-details {
            width: 100%;
            margin: 0;
        }
    }
    @media (max-width: $large-breakpoint) {
        align-self: auto;
        flex-flow: column nowrap;
        align-self: flex-start;
        justify-content: center;
        width: 100%;
        margin-top: 0;
        margin-bottom: $large;
        img {
            order: 1;
            display: block;
            width: 100%;
            clip-path: none;
        }
        .talk-details {
            margin-right: 0;
        }
    }
}
</style>
