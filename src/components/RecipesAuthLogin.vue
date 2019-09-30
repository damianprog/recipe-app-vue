<template>
    <v-card class="elevation-12">
        <v-toolbar
                color="primary"
                dark
                flat
        >
            <v-toolbar-title>Login</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                            v-on="on"
                            @click="createAccount"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
                <span>Create Account</span>
            </v-tooltip>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        label="Email"
                        type="text"
                        v-model="email"
                        @keyup.enter="login"
                ></v-text-field>

                <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        @keyup.enter="login"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="login" @keypress.enter.native="login" color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    const firebase = require('firebase/app');
    require('firebase/auth');

    export default {
        name: "RecipesAuthLogin",

        data() {
            return {
                email: "",
                password: "",
                repeatPassword: ""
            }
        },

        methods: {
            createAccount() {
                this.$emit("createAccount");
            },
            login(e) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(response => {
                        this.$router.replace('home');
                    })
                    .catch(err => {
                        alert(err.message);
                    })
            },
        }
    }
</script>

<style scoped>

</style>