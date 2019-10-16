<template>
    <v-card>
        <v-card-title>
            <div class="d-flex flex-column flex-grow-1">
                Search for Recipe
                <v-row>
                    <v-col cols="4" class="pb-0">
                        <v-text-field
                                class="pa-0"
                                placeholder="Recipe name"
                                v-model="searchPhrase"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                                color="success"
                                @click="fetchRecipes"
                                class="mr-4"
                        >Search
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-card-title>
        <v-card-text>
            <v-list-item
                    v-for="recipe in results"
                    :key="recipe.idMeal"
                    @click="onShowRecipe(recipe)"
            >
                <v-list-item-avatar size="100">
                    <img :src="recipe.imgUrl" @error="imgUrlAlt" class="recipe-img">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="recipe.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    @click="closeSearchBox"
                    dark
                    color="#1e88e5"
                    class="mr-2"
            >
                Close
            </v-btn>
        </v-card-actions>
        <v-dialog
                v-model="showRecipeDialog"
                width="800px"
                persistent
        >
            <recipes-panel-cards-recipe-view
                    :recipe="recipeToShow"
                    @close="onCloseRecipe"
                    @update="$emit('refetchRecipes')"
                    @delete="onDeleteRecipe"
            >
            </recipes-panel-cards-recipe-view>
        </v-dialog>
    </v-card>
</template>

<script>
    import RecipesPanelCardsRecipeView from "@/components/RecipesPanelCardsRecipeView";

    export default {
        name: "SearchBox",

        components: {
            RecipesPanelCardsRecipeView
        },

        data() {
            return {
                searchPhrase: "",
                showRecipeDialog: false,
                recipeToShow: {},
                results: []
            }
        },

        methods: {
            async fetchRecipes() {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchPhrase}`);
                const foundRecipes = await response.json();

                this.results = foundRecipes.meals ? foundRecipes.meals.map(m => {
                    const recipe = {};
                    recipe.idMeal = m.idMeal;
                    recipe.title = m.strMeal;
                    recipe.instructions = m.strInstructions;
                    recipe.imgUrl = m.strMealThumb;
                    recipe.mealTypes = [];
                    recipe.people = "";
                    recipe.difficulty = "";
                    recipe.ingredients = "";
                    for (let i = 1; i <= 20; i++) {
                        if (m['strIngredient' + i] != "") {
                            recipe.ingredients += `- ${m['strMeasure' + i]} ${m['strIngredient' + i]}\n\n`
                        }
                    }
                    return recipe;
                }) : [];

            },
            onShowRecipe(recipe) {
                this.recipeToShow = recipe;
                this.showRecipeDialog = true;
            },

            onCloseRecipe() {
                this.showRecipeDialog = false;
                this.recipeToShow = {};
            },
            onDeleteRecipe() {
                this.onCloseRecipe();
                this.$emit("refetchRecipes");
            },
            closeSearchBox() {
                this.searchPhrase = "";
                this.$emit("close");
            },
            imgUrlAlt(event) {
                event.target.src = require("@/assets/recipe-img.png");
            }
        },
    }
</script>

<style scoped>
    .recipe-img {
        object-fit: contain;
    }
</style>