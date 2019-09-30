<template>
    <v-card>
        <v-img
            :src="recipe.imgUrl"
            height="200px"
        >
        </v-img>
        <v-card-title>
            {{recipe.title}}
        </v-card-title>
        <v-card-actions>
            <v-btn
                    color="#6a1b9a"
                    dark
                    @click="openRecipe"
            >
                <v-icon>open_in_new</v-icon>Open Recipe
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
                this.$emit('openRecipe',{...this.recipe});
            }
        }
    }
</script>

<style scoped>

</style>