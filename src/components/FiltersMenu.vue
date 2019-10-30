<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            offset-y
            absolute
            min-width="200"
    >
        <template v-slot:activator="{ on }">
            <slot :item="{...on}"></slot>
        </template>
        <v-card
                class="px-5"
        >
            <v-list>
                <v-list-item class="pl-0">
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
                    dark
                    @click="resetFilters"
            >
                Reset Filters
            </v-btn>
            <v-row>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-text-field
                            v-model="title"
                            label="Recipe Name"
                            @input="onInput"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="12" sm="6"
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
            <v-card-actions class="px-0">
                <v-spacer></v-spacer>
                <v-btn
                        @click="menu = false"
                        color="primary"
                >Close
                </v-btn>
            </v-card-actions>
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