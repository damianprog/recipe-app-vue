<template>
    <v-container>
        <v-row align="stretch">
            <v-col cols="12" sm="6" md="4" xl="3" v-for="recipe in recipes">
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
                @save="$emit('refetchRecipes')"
                @delete="onDeleteRecipe"
            >
            </recipes-panel-cards-recipe-view>
        </v-dialog>
    </v-container>
</template>

<script>
    import RecipesPanelCardsRecipe from "@/components/panel/RecipesPanelCardsRecipe";
    import RecipesPanelCardsRecipeView from "@/components/panel/RecipesPanelCardsRecipeView";

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
            },

            onDeleteRecipe() {
                this.onCloseRecipe();
                this.$emit("refetchRecipes");
            }
        }
    }
</script>

<style scoped>

</style>