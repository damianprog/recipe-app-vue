<template>
    <v-card
            max-width="1000"
    >
        <v-card-title>Create Recipe</v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-text-field
                            v-model="updatedRecipe.title"
                            label="Title"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-text-field
                            v-model="updatedRecipe.imgUrl"
                            label="Image Url (Optional)"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        sm="5"
                >
                    <v-select
                            v-model="updatedRecipe.mealTypes"
                            label="Meal Type"
                            :items="mealTypes"
                            multiple
                    >
                    </v-select>
                </v-col>
                <v-col
                        cols="6"
                        sm="5"
                >
                    <v-select
                            v-model="updatedRecipe.difficulty"
                            label="Difficulty"
                            :items="difficultyLevels"
                    >
                    </v-select>
                </v-col>
                <v-col
                        cols="6"
                        sm="2"
                >
                    <v-text-field
                            v-model.number="updatedRecipe.people"
                            type="number"
                            min="0"
                            label="For People"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-textarea
                    v-model="updatedRecipe.ingredients"
                    rows="12"
                    label="Ingredients"
            >
            </v-textarea>
            <v-textarea
                    v-model="updatedRecipe.instructions"
                    rows="12"
                    label="Instructions"
            >
            </v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    @click="save"
                    class="mr-2"
                    color="success"
                    :disabled="!enableSave"
            >Save
            </v-btn>
            <v-btn
                    @click="closeCreator"
                    class="mr-4"
                    dark
                    color="#1e88e5"
            >Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import db from '../components/firebase/firebaseInit';

    export default {
        name: "RecipeCreator",

        data() {
            return {
                updatedRecipe: {},
                mealTypes: ["Breakfast", "Lunch", "Supper", "Snack"],
                difficultyLevels: ["Beginner", "Intermediate", "Advanced"]
            }
        },

        computed: {
            enableSave() {
                return this.updatedRecipe.title && this.updatedRecipe.title.trim() != "";
            }
        },

        methods: {
            closeCreator() {
                this.updatedRecipe = {};
                this.$emit("close");
            },
            save() {
                const {id, ...recipe} = this.updatedRecipe;
                recipe.createdAt = new Date().toISOString();
                db.collection('recipes').add(recipe)
                    .then(docRef => {
                        this.$emit("save");
                        this.updatedRecipe = {};
                    })
                    .catch(err => console.log(err));
            }
        },
    }
</script>

<style scoped>

</style>