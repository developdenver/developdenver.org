<template>
  <section class="feature">
    <div class="video responsive-iframe-container" v-html="video"/>
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

.feature {
    margin-top: $large;
    margin-bottom: $large;
	width: 100%;
    .video {
		max-width: $max-line-length;
    }
    .benefit {
        background-color: $pure-white;
        z-index: 10;
		max-width: $max-line-length;
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
			align-self: flex-start;
        }
    }
}
</style>
