<template>
    <v-card class="d-flex flex-column" height="100%">
        <img
                class="recipeImg"
                :src="recipe.imgUrl"
                @error="imgUrlAlt"
        />
        <v-card-text
                class="flex-grow-1 headline text--primary"
        >
            {{recipe.title}}
        </v-card-text>
        <v-card-actions
        >
            <v-btn
                    color="#6a1b9a"
                    dark
                    @click="openRecipe"
            >
                <v-icon>open_in_new</v-icon>
                Open Recipe
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "RecipesPanelCardsRecipe",

        props: {
            recipe: {
                type: Object,
                default: () => ({})
            }
        },

        methods: {
            openRecipe() {
                this.$emit('openRecipe', {...this.recipe});
            },
            imgUrlAlt(event) {
                event.target.src = require("@/assets/recipe-img.png");
            }
        }
    }
</script>

<style scoped>
    .recipeImg {
        object-fit: cover;
        width: 100%;
        height: 200px;
    }
</style>