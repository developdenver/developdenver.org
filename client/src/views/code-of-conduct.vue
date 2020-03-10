<template>
	<fragment>
		<section id="coc-landing" class="full landing-screen">
			<countdown />
			<h1>The Code Behind the Code</h1>
			<div class="plus-grid red move"></div>
		</section>
		<section class="code-of-conduct">
			<HeaderBar
				title="Develop Denver Code of Conduct"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<p>
					All attendees, speakers, sponsors and volunteers at our
					conference are required to agree with the following code of
					conduct. Organisers will enforce this code throughout the
					event. We are expecting cooperation from all participants to
					help ensuring a safe environment for everybody.
				</p>
				<br/>
				<p><strong>tl;dr:</strong> Be excellent with each other.</p>
			</div>
		</section>
		<section>
			<HeaderBar
				title="Get help or report a violation"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SKULL.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<p>
					You can talk with any conference organizer in person, email
					us at
					<a href="mailto:hello@developdenverorg"
						>hello@developdenver.org</a
					>, or slack Kim Schlesinger or Kyle Coberly on the Denver
					Devs slack workspace.
				</p>
				<p>
					If you feel uncomfortable talking with a conference
					organizer, please reach out to one of the following people in person or via their contact info below:
				</p>
				<ul class="bullet-list">
					<li>
						Scott Miller : text or phone: 303-513-2124</li>
					</li>
					<li>
						Alison Lawrence Daley : on Denver Devs: <code>@Al.Is.On</code></li>
					</li>
					<li>
						Nina Baliga : email at
								<a href="mailto:nina@hirediversity.us"
									>nina@hirediversity.us</a
								>
							</li>
						</ul>
					</li>
				</ul>
      </div>
    </section>
    <section>
      <HeaderBar
				title="The Quick Version"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
      <div class="intro">
				<p>
					Our conference is dedicated to providing a harassment-free
					conference experience for everyone, regardless of gender,
					gender identity and expression, age, sexual orientation,
					disability, physical appearance, body size, race, or
					religion (or lack thereof). We do not tolerate harassment of
					conference participants in any form. Sexual language and
					imagery is not appropriate for any conference venue,
					including talks, workshops, parties, Twitter and other
					online media. Conference participants violating these rules
					may be sanctioned or expelled from the conference without a
					refund at the discretion of the conference organisers.
				</p>
      </div>
    </section>
    <section>
      <HeaderBar
				title="The Less Quick Version"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_BOMB.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
      <div class="intro">
				<p>
					Harassment includes offensive verbal comments related to
					gender, gender identity and expression, age, sexual
					orientation, disability, physical appearance, body size,
					race, religion, sexual images in public spaces, deliberate
					intimidation, stalking, following, harassing photography or
					recording, sustained disruption of talks or other events,
					inappropriate physical contact, and unwelcome sexual
					attention.
				</p>
				<p>
					Participants asked to stop any harassing behavior are
					expected to comply immediately.
				</p>
				<p>
					Sponsors are also subject to the anti-harassment policy. In
					particular, sponsors should not use sexualised images,
					activities, or other material. Booth staff (including
					volunteers) should not use sexualised
					clothing/uniforms/costumes, or otherwise create a sexualised
					environment.
				</p>
				<p>
					If a participant engages in harassing behavior, the
					conference organisers may take any action they deem
					appropriate, including warning the offender or expulsion
					from the conference with no refund.
				</p>
				<p>
					If you are being harassed, notice that someone else is being
					harassed, or have any other concerns, please contact a
					member of conference staff immediately. Conference staff can
					be identified as they'll be wearing branded t-shirts.
				</p>
				<p>
					Conference staff will be happy to help participants contact
					hotel/venue security or local law enforcement, provide
					escorts, or otherwise assist those experiencing harassment
					to feel safe for the duration of the conference. We value
					your attendance.
				</p>
				<p>
					We expect participants to follow these rules at conference
					and workshop venues and conference-related social events.
				</p>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';
import { parallaxElement, throttle } from '@/utilities/parallax';
export default {
	components: {
		Countdown,
		HeaderBar,
	},
	data() {
		return {
			rotatingElements: document.getElementsByClassName('move'),
		};
	},
	mounted() {
		this.rotatingElements = document.getElementsByClassName('move');
		this.throttle('scroll', 'handleScroll');
	},
	created() {
		this.$store.dispatch('events/fetchEvents');
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let denominator = 2;
			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(
					this.rotatingElements[i],
					scrollpos,
					denominator,
					5,
				);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';
#coc-landing {
	.plus-grid.red {
		grid-column: 3 / span 4;
		height: 40vh;
		margin-top: 20vh;
		width: 50vw
  }
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 15vh;
			margin-top: 0vh;

		}

	}
}
</style>
