<template>
	<fragment>
		<section id="contact-landing" class="full landing-screen">
			<countdown />
			<h1>Questions? Comments. Codeblocks.</h1>
		</section>
		<section class="contact">
			<div class="details">
				<h2>Contact</h2>
				<a href="mailto:hello@developdenver.org"
					>hello@developdenver.org</a
				>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import Countdown from '@/components/count-down.vue';
export default {
	components: {
		Countdown,
	},
};
</script>
<style lang="scss"></style>
