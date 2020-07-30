<template>
    <section>
        <searchbar
            @clicked="enter"
            @enter="enter"
            v-bind:value="searchQuery"
            v-on:input="searchQuery = $event"
            placeholder="Search..."
        >
            <svg class="searchbar--icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Search</title>
                <path
                    d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
                    style="stroke-miterlimit:10;stroke-width:32px"
                />
                <line
                    x1="338.29"
                    y1="338.29"
                    x2="448"
                    y2="448"
                    style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                />
            </svg>
        </searchbar>
        <h1>{{searchQuery}}</h1>
    </section>
</template>

<script>
import searchbar from "../components/searchbar";
export default {
    data() {
        return {
            searchQuery: "",
        };
    },
    components: {
        searchbar: searchbar,
    },
    methods: {
        enter: function () {
            this.searchQuery = "Enter";
        },
    },
    head() {
        return {
            title: "Search polls",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: "Search through all the polls",
                },
            ],
        };
    },
};
</script>

<style scoped>
section {
    padding: 10px;
    padding-top: 0;
    border-radius: 10px;
}
</style>