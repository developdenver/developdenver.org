<template>
    <section class="submit-talk">
        <edit-talk
            buttonLabel="Submit"
			      :talk="talk"
            @updateTalk="updateTalk"
        />
    </section>
</template>

<script>
import EditTalk from "../components/edit-talk";

export default {
	data() {
		return {
      talk: {
        properties: {
          title: 'Cheese Fondue',
          type: 'Lightning',
          photoUrl: 'https://www.fillmurray.com/460/300',
          description: 'I\'ll tell them you went down prying the wedding ring off his cold, dead finger. What are their names? Man, I\'m sore all over. I feel like I just went ten rounds with mighty Thor. I was all of history\'s great robot actors - Acting Unit 0.8; Thespomat; David Duchovny!'
        }
      }
		};
	},
	components: {
		EditTalk,
	},
	methods: {
		async updateTalk(talk) {
			await this.$store.dispatch("services/talk/setTalk", talk);
      // this.$router.push({ name: "tickets" });
      // go to all talks when that exists.
		},
	},
};
</script>
