<template>
    <section class="community">
        <h2>Community</h2>
        <ul class="profiles">
            <li v-for="profile in profiles">
                <profile-card
                    :profile="profile"
                />
            </li>
        </ul>
    </section>
</template>

<script>
    import ProfileCard from "@/components/profile-card.vue";

    export default {
        components: {
            ProfileCard
        },
        created(){
            return this.$store.dispatch("getProfiles");
        },
        computed: {
            profiles(){
                return this.$store.state.profiles;
            }
        }
    };
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";

    .community {
        width: 100%;
        h2 {
            @include section-header-font;
        }
        .profiles {
            display: flex;
            flex-flow: row wrap;
            li {
                width: calc(100% * (1/4));
            }
        }
    }
</style>
