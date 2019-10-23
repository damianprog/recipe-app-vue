<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            offset-y
            min-width="650"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                    color="indigo"
                    dark
                    v-on="on"
            >
                Search Locally
            </v-btn>
        </template>
        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Search Filters</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-btn
                    color="primary"
                    class="ml-4"
                    dark
                    @click="resetFilters"
            >
                Reset Filters
            </v-btn>
            <v-row>
                <v-col
                        cols="12" sm="6"
                >
                    <v-text-field
                            v-model="title"
                            label="Recipe Name"
                            class="ml-4"
                            @input="onInput"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="12" sm="5"
                >
                    <v-select
                            v-model="selectedMealTypes"
                            label="Meal Type"
                            :items="availableMealTypes"
                            multiple
                            @change="onInput"
                    >
                    </v-select>
                </v-col>
            </v-row>
        </v-card>
    </v-menu>
</template>

<script>
    import {MEAL_TYPES} from "../constants/index";

    export default {
        name: "FiltersMenu",

        data() {
            return {
                menu: false,
                title: "",
                availableMealTypes: MEAL_TYPES,
                selectedMealTypes: MEAL_TYPES
            }
        },

        methods: {
            onInput() {
                this.$emit('filterInput', {title: this.title.toLowerCase(), mealTypes: this.selectedMealTypes});
            },
            resetFilters() {
                this.selectedMealTypes = MEAL_TYPES;
                this.title = "";
                this.onInput();
            }
        },
    }
</script>

<style scoped>

</style>