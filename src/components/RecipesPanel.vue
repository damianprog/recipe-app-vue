<template>
    <v-content>
        <v-app-bar
                color="#1e88e5"
                dark
                app
                height="70px"
        >
            <v-row align="center" justify="space-around">
                <v-col class="pa-0 ma-0" cols="6">
                    <v-col cols="auto">
                        <v-toolbar-title>Recipe Vue App</v-toolbar-title>
                    </v-col>
                </v-col>
                <v-col class="d-none d-md-flex" cols="auto">
                    <v-btn
                            color="success"
                            @click="searchDialog = true"
                            class="mr-4"
                    >Search Recipe
                    </v-btn>
                    <v-btn
                            color="#6a1b9a"
                            @click="recipeEditorDialog = true"
                    >Create Recipe
                    </v-btn>
                </v-col>
                <v-col class="d-md-none" cols="auto">
                    <v-menu>
                        <template v-slot:activator="{ on: menu }">
                            <v-btn
                                    color="#6a1b9a"
                                    dark
                                    fab
                                    small
                                    v-on="{...menu }"
                            >
                                <v-icon>menu</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                    @click="searchDialog = true"
                            >
                                <v-list-item-title>Search Recipe</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                    @click="recipeEditorDialog = true"
                            >
                                <v-list-item-title>Create Recipe</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row justify="center">
            <v-col cols="11">
                <recipes-panel-cards
                        :recipes="recipes"
                        @refetchRecipes="fetchRecipes"
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
        <v-dialog
                v-model="searchDialog"
                max-width="1000"
                persistent
                scrollable
        >
            <search-box
                    @close="searchDialog = false"
                    @refetchRecipes="fetchRecipes"
            >
            </search-box>
        </v-dialog>
    </v-content>
</template>

<script>
    import db from './firebase/firebaseInit';
    import RecipeEditor from "@/components/RecipeEditor";
    import RecipesPanelCards from "@/components/RecipesPanelCards";
    import SearchBox from "@/components/SearchBox";

    const firebase = require('firebase/app');
    require('firebase/auth');

    export default {
        name: "Recipes",
        components: {
            RecipeEditor,
            RecipesPanelCards,
            SearchBox
        },

        data() {
            return {
                recipeEditorDialog: false,
                searchDialog: false,
                recipes: [],
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
                        this.recipes = [];
                        querySnapshot.forEach(doc => {
                            const data = {
                                'id': doc.id,
                                ...doc.data()
                            };
                            this.recipes.push({...data});
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