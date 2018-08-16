import { hashPassword } from "../utilities/auth";

export default {
    namespaced: true,
    state: {
        currentProfile: null,
    },
    getters: {
        isLoggedIn(state){
            return !!state.currentProfile;
        },
        token(){
            return localStorage.getItem("token");
        },
    },
    mutations: {
        logout(state){
            state.currentProfile = null;
            localStorage.removeItem("token");
            return true;
        },
        setToken(state, token){
            localStorage.setItem("token", token);
            return true;
        },
        setProfile(state, profile){
            state.currentProfile = profile
            return true;
        }
    },
    actions: {
        async login({commit}, {email, password}){
            const loginUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_LOGIN_PATH}`;
            const hashedPassword = await hashPassword(password);
            const { user, jwt } = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: hashedPassword,
                }),
            }).then(response => response.json());
            commit("setToken", jwt);
            commit("setProfile", user);
        },
        logout({commit}){
            return commit("logout");
        },
        setToken({commit}, token){
            return commit("setToken", token);
        },
        setProfile({commit}, profile){
            return commit("setProfile", profile);
        },
    },
};
