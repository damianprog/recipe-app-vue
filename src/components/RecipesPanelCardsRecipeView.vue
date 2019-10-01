<template>
    <v-card>
        <v-card-title>
            <div class="d-flex flex-column">
                <div v-if="editMode">
                    <v-text-field
                            outlined
                            v-model="updatedRecipe.title"
                    >
                    </v-text-field>
                </div>
                <div v-else>
                    {{updatedRecipe.title}}
                </div>
                <v-subheader class="pl-0">
                    <div class="pr-2">
                        Difficulty: {{updatedRecipe.difficulty}}
                    </div>
                    <div class="pr-2">
                        Meal Types:&nbsp; {{mealTypes}}
                    </div>
                    <div>
                        For People: {{updatedRecipe.people}}
                    </div>
                </v-subheader>
            </div>
        </v-card-title>
        <v-card-text class="text--primary">
            <v-row>
                <v-col xs="12" sm="6">
                    <h3 class="mb-4">Ingredients</h3>
                    <v-textarea
                            v-if="editMode"
                            v-model="updatedRecipe.ingredients"
                            auto-grow
                            outlined
                    >
                    </v-textarea>
                    <div
                            v-else
                            v-html="compiledMarkdown(updatedRecipe.ingredients)"
                    >
                    </div>
                </v-col>
                <v-col xs="12" sm="6">
                    <v-img :src="updatedRecipe.imgUrl"></v-img>
                    <div v-if="editMode">
                        <v-text-field
                                outlined
                                v-model="updatedRecipe.imgUrl"
                                class="mt-2"
                        >
                        </v-text-field>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <h3 class="mb-4">Instructions</h3>
                    <v-textarea
                            v-if="editMode"
                            v-model="updatedRecipe.instructions"
                            auto-grow
                            outlined
                    >
                    </v-textarea>
                    <div
                            v-else
                            v-html="compiledMarkdown(updatedRecipe.instructions)"
                    >
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    @click="close"
                    dark
                    color="#1e88e5"
            >
                Close
            </v-btn>
            <v-btn
                    @click="changeMode"
                    class="mr-2"
                    color="success"
            >
                {{currentMode}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import db from '../components/firebase/firebaseInit';

    export default {
        name: "RecipesPanelCardsRecipeView",
        props: {
            recipe: {
                type: Object,
                default: () => {
                }
            }
        },

        data() {
            return {
                editMode: false,
                updatedRecipe: {...this.recipe}
            }
        },

        computed: {
            currentMode() {
                return this.editMode ? "View Mode" : "Edit Mode";
            },
            mealTypes() {
                return this.updatedRecipe.mealTypes ? this.updatedRecipe.mealTypes.join(", ") : "";
            }
        },

        methods: {
            compiledMarkdown(templateString) {
                return templateString ? marked(templateString) : "";
            },
            close() {
                this.editMode = false;
                this.$emit("close");
            },
            changeMode() {
              if (this.editMode) {
                  this.updateRecipe();
              }

              this.editMode = !this.editMode;
            },
            updateRecipe() {
                db.collection('recipes').doc(this.recipe.id).get().then(doc => {
                    const {id, ...recipeToSave} = this.updatedRecipe;
                    doc.ref.update({...recipeToSave});
                })
                .then(() => {
                    alert("Recipe Updated.")
                });

            }
        },

        watch: {
            recipe(data) {
                this.updatedRecipe = {...data};
            }
        }
    }
</script>

<style scoped>

</style>