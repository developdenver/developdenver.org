<template>
	<div class="yellow-background">
		<section id="locations">
			<HeaderBar
				title="Locations"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_LOCATION.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<LocationMap />
		</section>
	</div>
</template>

<script>
// Components
import HeaderBar from '@/components/header-bar.vue';
import LocationMap from '@/components/location-map.vue';

export default {
	components: {
		HeaderBar,
		LocationMap,
	},
};
</script>

<style lang="scss"></style>
