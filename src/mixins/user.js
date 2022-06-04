import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['logoutApi']),
        logout() {
            this.logoutApi();
            sessionStorage.setItem("token", "");
            this.$router.push({ name: "login" });
        }
    }
} 