<template>
    <section>
        <h2>Register</h2>
        <edit-profile
            buttonLabel="Register"
            @updateProfile="updateProfile"
        />
    </section>
</template>

<script>
    import EditProfile from "../components/edit-profile";
    import Profile from "../models/profile";

    export default {
        components: {
            EditProfile
        },
        methods: {
            updateProfile(profile){
                this.$store.dispatch("createProfile", new Profile(profile));
            },
        },
    };
</script>

<style>
</style>
