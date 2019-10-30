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
                <div class="pb-3" v-else>
                    {{updatedRecipe.title}}
                </div>
                <v-row v-if="editMode">
                    <v-col cols="6" sm="3">
                        <v-select
                                v-model="updatedRecipe.difficulty"
                                label="Difficulty"
                                :items="difficultyLevels"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="6" sm="3">
                        <v-text-field
                                v-model.number="updatedRecipe.people"
                                type="number"
                                min="0"
                                label="For People"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-select
                                v-model="updatedRecipe.mealTypes"
                                label="Meal Type"
                                :items="mealTypes"
                                multiple
                        >
                        </v-select>
                    </v-col>
                </v-row>
                <v-subheader v-else-if="!isPreviewMode" class="pl-3">
                    <v-row>
                        <div class="pr-2">
                            Difficulty: {{updatedRecipe.difficulty}}
                        </div>
                        <div class="pr-2">
                            For People: {{updatedRecipe.people}}
                        </div>
                        <div class="pr-2">
                            Meal Types:&nbsp; {{formattedMealTypes}}
                        </div>
                    </v-row>
                </v-subheader>
            </div>
        </v-card-title>
        <v-card-text class="text--primary">
            <v-row>
                <v-col cols="12" md="6" order="2" order-md="1">
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
                <v-col cols="12" md="6" order="1" order-md="2">
                    <img
                            class="recipeImg"
                            :src="defaultImg"
                            @error="imgUrlAlt"
                    />
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
            <template v-if="isPreviewMode">
                <v-spacer></v-spacer>
                <v-btn
                        @click="saveRecipe"
                        class="mr-2"
                        color="success"
                >
                    Save Recipe
                </v-btn>
            </template>
            <template v-else>
                <v-btn
                        @click="deleteRecipe"
                        dark
                        color="error"
                        class="ml-2"
                >
                    Delete
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        @click="changeMode"
                        class="mr-2"
                        color="success"
                >
                    {{modeBtnLabel}}
                </v-btn>
            </template>
            <v-btn
                    @click="close"
                    dark
                    color="#1e88e5"
            >
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import db from '../firebase/firebaseInit';

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
                updatedRecipe: {...this.recipe},
                mealTypes: ["Breakfast", "Lunch", "Supper", "Snack"],
                difficultyLevels: ["Beginner", "Intermediate", "Advanced"],
            }
        },

        computed: {
            modeBtnLabel() {
                return this.editMode ? "View Mode" : "Edit Mode";
            },
            formattedMealTypes() {
                return this.updatedRecipe.mealTypes ? this.updatedRecipe.mealTypes.join(", ") : "";
            },
            isPreviewMode() {
                return !this.updatedRecipe.id;
            },
            defaultImg() {
                return this.updatedRecipe.imgUrl ? this.updatedRecipe.imgUrl : require('@/assets/recipe-img.png');
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
            saveRecipe() {
                const {id, ...recipe} = this.updatedRecipe;
                recipe.createdAt = new Date().toISOString();
                db.collection('recipes').add(recipe)
                    .then(docRef => {
                        this.$emit("save");
                        this.updatedRecipe = {...this.updatedRecipe, id: docRef.id};
                    })
                    .catch(err => console.log(err));
            },
            updateRecipe() {
                db.collection('recipes').doc(this.updatedRecipe.id).get().then(doc => {
                    const {id, ...recipeToSave} = this.updatedRecipe;
                    doc.ref.update({...recipeToSave});
                })
                    .then(() => {
                        this.$emit("save");
                    });
            },
            deleteRecipe() {
                if (confirm("Are you sure you want to delete this recipe?")) {
                    db.collection('recipes').doc(this.updatedRecipe.id).get().then(doc => {
                        doc.ref.delete().then(() => {
                            this.editMode = false;
                            this.$emit("delete");
                        })
                    })
                }
            },
            imgUrlAlt(event) {
                event.target.src = require("@/assets/recipe-img.png");
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
    .recipeImg {
        object-fit: cover;
        width: 100%;
    }
</style>