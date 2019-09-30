<template>
    <v-content>
        <v-app-bar
                color="#1e88e5"
                dark
                app
                height="70px"
        >
            <v-row justify="space-around">
                <v-col xs="auto" sm="8">
                    <v-toolbar-title>Recipe Vue App</v-toolbar-title>
                </v-col>
                <v-col cols="auto">
                    <v-btn
                            color="#6a1b9a"
                            @click="recipeEditorDialog = true"
                    >Create Recipe
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row justify="center">
            <v-col cols="11">
                <recipes-panel-cards
                        :recipes="recipes"
                >
                </recipes-panel-cards>
            </v-col>
        </v-row>
        <v-footer
                color="#1e88e5"
                dark
                app
                height="70px"
        >
            <v-row justify="center">
                <v-col cols="10">
                    <v-menu offset-x>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    icon
                                    large
                                    v-on="on"
                            >
                                <v-icon>power_settings_new</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                    @click="logout"
                            >
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-footer>
        <v-dialog
                v-model="recipeEditorDialog"
                max-width="1000"
                scrollable
                persistent
        >
            <recipe-editor
                    @close="closeEditor"
                    @save="onSave"
            >
            </recipe-editor>
        </v-dialog>
    </v-content>
</template>

<script>
    import db from './firebase/firebaseInit';
    import RecipeEditor from "@/components/RecipeEditor";
    import RecipesPanelCards from "@/components/RecipesPanelCards";

    const firebase = require('firebase/app');
    require('firebase/auth');

    export default {
        name: "Recipes",
        components: {
            RecipeEditor,
            RecipesPanelCards
        },

        data() {
            return {
                recipeEditorDialog: false,
                recipes: []
            }
        },

        methods: {
            closeEditor() {
                this.recipeEditorDialog = false;
            },
            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login');
                })
            },
            onSave() {
              this.closeEditor();
              this.fetchRecipes();
            },
            fetchRecipes() {
                db.collection('recipes').get().then(
                    querySnapshot => {
                        querySnapshot.forEach(doc => {
                            const data = {
                                'id': doc.id,
                                ...doc.data()
                            };
                            this.recipes.push(data);
                        })
                    });
            }
        },

        created() {
            this.fetchRecipes();
        }
    }
</script>

<style scoped>

</style>