<template>
    <section class="tickets">
        <h2>Tickets</h2>
        <form @submit="submit">
            <div>
                <input type="radio" id="ticket-level" name="ticket-level" value="early-bird" v-model="ticketLevel" />
                <label for="ticket-level">$140 - Early Bird</label>
                <p>Gets you tickets to the conference, a goody bag, and more!</p>
            </div>
            <input type="submit" value="Buy" />
        </form>
    </section>
</template>

<script>
export default {
    data(){
        return {
            ticketLevel: "",
        };
    },
    methods: {
        submit(){
            console.log(this.ticketLevel);
        },
    },
};
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";
    @import "@/styles/_general.scss";

    .tickets {
        h2 {
            @include secondary-header-font;
        }
        input, label {
            display: inline-block;
        }
        [type="submit"] {
            @include call-to-action-button;
            display: block;
            width: 100%;
        }
    }
</style>
