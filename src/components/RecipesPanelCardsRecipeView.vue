<template>
    <v-card>
        <v-card-title>
            {{recipe.title}}
        </v-card-title>
        <v-card-text class="text--primary">
            <v-row>
                <v-col xs="12" sm="6">
                    <h3 class="mb-4">Ingredients</h3>
                    {{recipe.ingredients}}
                </v-col>
                <v-col xs="12" sm="6">
                    <v-img :src="recipe.imgUrl"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <h3 class="mb-4">Instructions</h3>
                    {{recipe.instructions}}
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "RecipesPanelCardsRecipeView",
        props: {
            recipe: {
                type: Object,
                default: () => {
                }
            }
        }
    }
</script>

<style scoped>

</style>