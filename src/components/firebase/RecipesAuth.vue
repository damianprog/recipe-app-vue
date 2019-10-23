<template>
    <v-content class="main-container">
        <v-container
                class="fill-height"
                fluid
        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col
                        cols="12"
                        sm="8"
                        md="4"
                >
                    <recipes-auth-create
                            v-if="create"
                            @login="create = false"
                    >
                    </recipes-auth-create>
                    <recipes-auth-login
                            v-if="!create"
                            @createAccount="create = true"
                    ></recipes-auth-login>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import RecipesAuthLogin from "@/components/firebase/RecipesAuthLogin";
    import RecipesAuthCreate from "@/components/firebase/RecipesAuthCreate";

    export default {
        name: 'RecipesAuth',

        components: {
            RecipesAuthLogin,
            RecipesAuthCreate
        },

        data() {
            return {
                create: false,
            }
        }
    };
</script>

<style scoped>
    .main-container {
        background-color: #29b6f6;
        margin: 0;
        min-height: 100vh;
    }
</style>