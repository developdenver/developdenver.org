<template>
	<fulfilling-square-spinner
		class="loading-spinner"
		:animation-duration="800"
		:size="30"
		color="#d43e53"
	/>
</template>

<script>
import { FulfillingSquareSpinner } from "epic-spinners";

export default {
	components: {
		FulfillingSquareSpinner,
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";

.loading-spinner {
	position: fixed !important;
	right: $large;
	top: $large;
}
</style>
