<template>
    <v-card
            max-width="1000"
    >
        <v-card-title>{{editorTitle}}</v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                    cols="6"
                >
                    <v-text-field
                        v-model="updatedRecipe.title"
                        label="Title"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="6"
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
                        cols="5"
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
                        cols="5"
                >
                    <v-select
                            v-model="updatedRecipe.difficulty"
                            label="Difficulty Level"
                            :items="difficultyLevels"
                            multiple
                    >
                    </v-select>
                </v-col>
                <v-col
                        cols="2"
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
                @click="closeEditor"
            >Close</v-btn>
            <v-btn
                class="mr-4"
                @click="save"
            >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import db from '../components/firebase/firebaseInit';

    export default {
        name: "RecipeEditor",

        props: {
          recipe: {
              type: Object,
              default: () => {
                  return {}
              }
          }
        },

        data() {
            return {
                updatedRecipe: {...this.recipe},
                mealTypes: ["Breakfast","Lunch","Supper","Snack"],
                difficultyLevels: ["Beginner","Intermediate","Advanced"]
            }
        },

        computed: {
            editorTitle() {
                return this.recipe.id ? this.recipe.title : "New Recipe";
            }
        },

        methods: {
            closeEditor() {
                this.updatedRecipe = {};
                this.$emit("close");
            },
            save () {
                const {id, ...recipe} = this.updatedRecipe;
                db.collection('recipes').add(recipe)
                    .then(docRef => {
                        this.$emit("save");
                        this.updatedRecipe = {};
                    })
                    .catch(err => console.log(err));
            }
        },

        watch: {
            recipe(data) {
                this.updatedRecipe = {...data}
            }
        }
    }
</script>

<style scoped>

</style>