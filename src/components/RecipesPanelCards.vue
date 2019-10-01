<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="4" v-for="recipe in recipes">
                <recipes-panel-cards-recipe
                        :recipe="recipe"
                        @openRecipe="onOpenRecipe($event)"
                >
                </recipes-panel-cards-recipe>
            </v-col>
        </v-row>
        <v-dialog
                v-model="viewDialog"
                width="800px"
                persistent
        >
            <recipes-panel-cards-recipe-view
                :recipe="recipeToShow"
                @close="onCloseRecipe"
            >
            </recipes-panel-cards-recipe-view>
        </v-dialog>
    </v-container>
</template>

<script>
    import RecipesPanelCardsRecipe from "@/components/RecipesPanelCardsRecipe";
    import RecipesPanelCardsRecipeView from "@/components/RecipesPanelCardsRecipeView";

    export default {
        name: "RecipesPanelCards",

        components: {
            RecipesPanelCardsRecipe,
            RecipesPanelCardsRecipeView
        },

        props: {
            recipes: Array,
            default: () => ([])
        },

        data() {
            return {
                viewDialog: false,
                recipeToShow: {}
            }
        },

        methods: {
            onOpenRecipe(recipe) {
                this.recipeToShow = recipe;
                this.viewDialog = true;
            },

            onCloseRecipe() {
                this.viewDialog = false;
                this.recipeToShow = {};
            }
        }
    }
</script>

<style scoped>

</style>