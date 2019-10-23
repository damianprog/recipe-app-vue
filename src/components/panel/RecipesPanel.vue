<template>
    <v-content>
        <v-app-bar
                color="#1e88e5"
                dark
                app
                height="70px"
        >
            <v-row align="center" justify="space-around">
                <v-col class="pa-0 ma-0" cols="4">
                    <v-col cols="auto">
                        <v-toolbar-title>Recipe Vue App</v-toolbar-title>
                    </v-col>
                </v-col>
                <v-col class="d-none d-md-flex" cols="auto">
                    <filters-menu
                            @filterInput="currentFilter = {...$event}"
                    ></filters-menu>
                    <v-btn
                            color="success"
                            @click="searchDialog = true"
                            class="ml-4 mr-4"
                    >Search In Web
                    </v-btn>
                    <v-btn
                            color="#6a1b9a"
                            @click="recipeCreatorDialog = true"
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
                                    @click="recipeCreatorDialog = true"
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
                        :recipes="filteredSortedRecipes"
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
                v-model="recipeCreatorDialog"
                max-width="1000"
                scrollable
                persistent
        >
            <recipe-creator
                    @close="closeCreator"
                    @save="onSave"
            >
            </recipe-creator>
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
    import db from '../firebase/firebaseInit';
    import RecipeCreator from "@/components/RecipeCreator";
    import RecipesPanelCards from "@/components/panel/RecipesPanelCards";
    import FiltersMenu from "@/components/FiltersMenu";
    import SearchBox from "@/components/SearchApiMenu";
    import {MEAL_TYPES} from "@/constants";

    const firebase = require('firebase/app');
    require('firebase/auth');

    export default {
        name: "Recipes",
        components: {
            RecipeCreator,
            RecipesPanelCards,
            FiltersMenu,
            SearchBox
        },

        data() {
            return {
                recipeCreatorDialog: false,
                searchDialog: false,
                recipes: [],
                currentFilter: {title: "", mealTypes: MEAL_TYPES}
            }
        },

        computed: {
            filteredSortedRecipes() {
                const filteredRecipes = this.recipes.filter(r => r.title.toLowerCase().includes(this.currentFilter.title)
                    && r.mealTypes.some(mt => this.currentFilter.mealTypes.includes(mt)));

                return filteredRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        },

        methods: {
            closeCreator() {
                this.recipeCreatorDialog = false;
            },
            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login');
                })
            },
            onSave() {
                this.closeCreator();
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
                        });
                    });
            },
        },

        created() {
            this.fetchRecipes();
        }
    }
</script>

<style scoped>

</style>