<template>
	<fragment>
		<section id="privacy-landing" class="full landing-screen">
			<countdown />
			<h1>Keeping Your Private Stuff Private</h1>
			<div class="plus-grid red"></div>
		</section>
		<section class="privacy-policy">
			<HeaderBar
				title="Develop Denver Privacy Policy"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<p>
					This Privacy Policy governs the manner in which Develop
					Denver collects, uses, maintains and discloses information
					collected from users (each, a "User") of the
					https://developdenver.org website ("Site").
				</p>

				<h4>Personal identification information</h4>
				<p>
					We may collect personal identification information from
					Users in a variety of ways, including, but not limited to,
					when Users visit our site, register on the site, fill out a
					form, and in connection with other activities, services,
					features or resources we make available on our Site.Users
					may be asked for, as appropriate, name, email address,
					mailing address, phone number. Users may, however, visit our
					Site anonymously. We will collect personal identification
					information from Users only if they voluntarily submit such
					information to us. Users can always refuse to supply
					personally identification information, except that it may
					prevent them from engaging in certain Site related
					activities.
				</p>

				<h4>Non-personal identification information</h4>
				<p>
					We may collect non-personal identification information about
					Users whenever they interact with our Site. Non-personal
					identification information may include the browser name, the
					type of computer and technical information about Users means
					of connection to our Site, such as the operating system and
					the Internet service providers utilized and other similar
					information.
				</p>

				<h4>Web browser cookies</h4>
				<p>
					Our Site may use "cookies" to enhance User experience.
					User's web browser places cookies on their hard drive for
					record-keeping purposes and sometimes to track information
					about them. User may choose to set their web browser to
					refuse cookies, or to alert you when cookies are being sent.
					If they do so, note that some parts of the Site may not
					function properly.
				</p>

				<h4>How we use collected information</h4>
				<p>
					Develop Denver may collect and use Users personal
					information for the following purposes:
				</p>
				<ul>
					<li>
						<p>
							<em>To run and operate our Site.</em> We may need
							your information display content on the Site
							correctly.
						</p>
					</li>
					<li>
						<p>
							<em>To send periodic emails.</em> We may use the
							email address to send User information and updates
							pertaining to their order. It may also be used to
							respond to their inquiries, questions, and/or other
							requests.
						</p>
					</li>
				</ul>

				<h4>How we protect your information</h4>
				<p>
					We adopt appropriate data collection, storage and processing
					practices and security measures to protect against
					unauthorized access, alteration, disclosure or destruction
					of your personal information, username, password,
					transaction information and data stored on our Site.
				</p>

				<h4>Sharing your personal information</h4>
				<p>
					We do not sell, trade, or rent Users personal identification
					information to others. We may share generic aggregated
					demographic information not linked to any personal
					identification information regarding visitors and users with
					our business partners, trusted affiliates and advertisers
					for the purposes outlined above.
				</p>
				<p>
					We may share or sell information with third parties for
					marketing or other purposes.
				</p>
				<p>
					This Privacy Policy governs the manner in which Develop
					Denver collects, uses, maintains and discloses information
					collected from users (each, a "User") of the
					https://developdenver.org website ("Site").
				</p>

				<h4>Personal identification information</h4>
				<p>
					We may collect personal identification information from
					Users in a variety of ways, including, but not limited to,
					when Users visit our site, register on the site, fill out a
					form, and in connection with other activities, services,
					features or resources we make available on our Site.Users
					may be asked for, as appropriate, name, email address,
					mailing address, phone number. Users may, however, visit our
					Site anonymously. We will collect personal identification
					information from Users only if they voluntarily submit such
					information to us. Users can always refuse to supply
					personally identification information, except that it may
					prevent them from engaging in certain Site related
					activities.
				</p>

				<h4>Non-personal identification information</h4>
				<p>
					We may collect non-personal identification information about
					Users whenever they interact with our Site. Non-personal
					identification information may include the browser name, the
					type of computer and technical in.
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
export default {
	components: {
		Countdown,
		HeaderBar,
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#privacy-landing {
	@include grid-full-width;
	position: relative;
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		height: 80vh;
		margin-top: 20vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
}
.privacy-policy {
	h4 {
		padding: $baseline * 2 0 $baseline/2 0;
		&:first-child {
			padding-top: 0;
		}
	}
}
</style>
