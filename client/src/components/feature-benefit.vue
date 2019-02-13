<template>
  <section class="feature">
    <div class="video" v-html="video"/>
    <div class="benefit">
      <div>
        <h2>{{heading}}</h2>
      </div>
      <div v-html="parsedCopy"></div>
      <slot/>
    </div>
  </section>
</template>

<script>
import Showdown from 'showdown';

const showdown = new Showdown.Converter();

export default {
    props: {
        video: String,
        heading: String,
        copy: String,
    },
    computed: {
        parsedCopy() {
            return showdown.makeHtml(this.copy);
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';

$clip-amount: 0px;

.feature {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: $clip-amount * -1;
    margin-bottom: calc($clip-amount * -1) + $large;
    padding: $large $xxl;
    .video {
        display: flex;
        clip-path: inset($clip-amount 0);
        iframe {
            margin: 0 auto;
        }
    }
    .benefit {
        background-color: $pure-white;
        padding: $large;
        z-index: 10;
        > div {
            display: flex;
            align-items: center;
            flex-flow: column nowrap;
        }
        p {
            @include stylized-body-font;
        }
        h2 {
            @include section-header-font;
        }
    }
    @media (max-width: $large-breakpoint) {
        & {
            margin-top: 0;
            margin-bottom: $large;
            padding-left: 0;
            padding-right: 0;
            .video {
                width: 100%;
                clip-path: none;
            }
            .benefit {
                padding: $baseline 0 0 0;
            }
        }
    }
}
</style>
