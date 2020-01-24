<template>
	<div class="yellow-background">
		<section id="locations">
			<HeaderBar
				title="Locations"
				v-bind:imageUrl="require('@/assets/icons/happy_black.svg')"
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
