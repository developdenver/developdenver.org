<template>
  <fragment>
		<section id="talk-landing" class="full landing-screen">
			<countdown />
			<div class="plus-grid"></div>
		</section>
    <section class="letter">
      <HeaderBar
        title="Serious Business Letter"
        v-bind:imageUrl="
          require('@/assets/icons/DD_SITE_ICONS_BOMB.png')
        "
        v-bind:hoverUrl="
          require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
        "
      />
      <div class="intro">
        <p class="salutation">Dear <span class="fill-in-the-blank">{Name}</span>,</p>

        <p>I'd like to attend Develop Denver, a tech conference in RiNo taking place on August 15-16.</p>

        <p>Develop Denver is special because people from varying backgrounds, walks of life, and from all of  the furthest reaches of Colorado will gather to attend talks and workshops about web development, DevOps, design, business strategy and leadership.</p>

        <p>
          Here are some talks and workshops at this year's conference that are relevant to my work:
          <ul>
            <li class="fill-in-the-blank">{talk 1}</li>
            <li class="fill-in-the-blank">{talk 2}</li>
            <li class="fill-in-the-blank">{workshop}</li>
          </ul>
        </p>

        <p>You can learn more about the conference and view last year's talks at <a href="https://developdenver.org/">https://developdenver.org/</a></p>

        <p>Please let me know if you have any questions or concerns. I hope we can make this opportunity work.</p>

        <p>
        Thank you,
        </p>
        <p class="sign-off">
          <span class="fill-in-the-blank">{Your Name}</span>
        </p>
      </div>
    </section>
    <section class="letter">
      <HeaderBar
        title="Business Casual Letter"
        v-bind:imageUrl="
          require('@/assets/icons/DD_SITE_ICONS_BOMB.png')
        "
        v-bind:hoverUrl="
          require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
        "
      />
      <div class="intro">
        <p class="salutation">Dear <span class="fill-in-the-blank">{Your Boss}</span>,</p>

        <p>I think it is time we talk about what we are doing on August 15th and 16th. Thursday and Friday people from varying backgrounds, walks of life, and  from all the furthest reaches of Colorado will gather in RiNo and partake in the 8th annual Develop Denver Conference. The talks run the gamut from kinda nerdy to ultra nerdy. We can learn as a company about: Accessibility, UX/UI, Angular, Typescript, React, Testing, Building Inclusive Communities, Best Hiring Practices, and so much more.</p>

        <p>The reason why I am especially excited about Develop Denver is the conference is completely community driven.
        You can become a featured speaker without needing to be an evangelist, or a grizzly talk veteran. This allows for a wider range of voices to be heard and a more genuine medium through which to express them. The talks themselves are all picked by the community.</p>

        <p>AH I am getting excited just talking about it. Honestly, don't just take my word for it <a href="https://developdenver.org/">https://developdenver.org/</a>. If you want to sponsor some tickets for the office check out this link <a href="https://developdenver.org/tickets">https://developdenver.org/tickets</a>.</p>
        <p>
        Thank you,
        </p>
        <p class="sign-off">
          <span class="fill-in-the-blank">{Your Name}</span>
        </p>
      </div>
    </section>
  </fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';

export default {
  components: {
		Countdown,
    HeaderBar,
	},
  name: 'LetterToBoss',
}
</script>

<style lang="scss" scoped>
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";

</style>
