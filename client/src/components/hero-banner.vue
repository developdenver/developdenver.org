<template>
  <div class="hero">
    <div class="countdown">
      <Countdown />
    </div>
  </div>
</template>

<script>
import Countdown from "@/components/count-down.vue";

export default {
	components: {
		Countdown,
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.hero {
    height: 800px;
    width: 100%;
    background: linear-gradient(rgba(0,0,0,0.7)), url("/img/gathering.jpg");
    background-size: cover;
    @media (max-width: $large-breakpoint){
        display: block;
        position: relative;
        margin: $xxl 0;
        padding: 0 $baseline;
    }
    .countdown {
        font-family: "DVLP", "Courier New", "Helvetica", "Arial";
        color: $white;
        display: block;
        margin: 0 auto;
    }
}
</style>
