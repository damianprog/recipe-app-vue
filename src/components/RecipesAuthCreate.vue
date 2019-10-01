<template>
    <v-card class="elevation-12">
        <v-toolbar
                color="primary"
                dark
                flat
        >
            <v-toolbar-title>Create Account</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                            v-on="on"
                            @click="login"
                    >
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </template>
                <span>Login Page</span>
            </v-tooltip>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        label="Email"
                        type="text"
                        v-model="email"
                ></v-text-field>

                <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                ></v-text-field>
                <v-text-field
                        label="Repeat Password"
                        type="password"
                        v-model="repeatPassword"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="register" color="primary">Create</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    const firebase = require('firebase/app');
    require('firebase/auth');

    export default {
        name: "RecipesAuthCreate",

        data() {
            return {
                email: "",
                password: "",
                repeatPassword: ""
            }
        },

        computed: {
            arePasswordsEqual() {
                return this.password === this.repeatPassword;
            }
        },

        methods: {
            login() {
                this.$emit("login");
            },
            register(e) {
                if (this.arePasswordsEqual) {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(response => {
                                this.$router.replace("home");
                            },
                            err => {
                                alert(err.message);
                            });
                } else {
                    alert("Provided passwords are not matching");
                }

                e.preventDefault();
            }
        },
    }
</script>

<style scoped>

</style>