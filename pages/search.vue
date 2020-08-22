<template>
    <section>
        <searchbar
            @typing="searchFire"
            @clicked="searchFire"
            @enter="searchBtn"
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
        <loading v-if="$apollo.queries.search.loading" :full="false" />
        <transition-group name="list" appear tag="ul">
            <li class="card--shadow" v-for="poll in search" :key="poll._id">
                <card
                    v-if="!$apollo.loading && !error"
                    :index="poll._id"
                    :title="poll.title"
                    :description="poll.description"
                />
            </li>
        </transition-group>
        <h1 v-if="!$apollo.queries.search.loading && noneFound">No poll found</h1>
    </section>
</template>

<script>
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import searchbar from "../components/searchbar";
import loading from "../components/loading";

const SEARCH_QUERY = gql`
    query Search($query: String!) {
        search(query: $query) {
            _id
            title
            description
        }
    }
`;

export default {
    data() {
        return {
            searchQuery: "",
            search: [],
            noneFound: false,
        };
    },
    components: {
        searchbar,
        loading,
    },
    methods: {
        searchFire: debounce(function () {
            this.error = null;
            this.noneFound = false;
            this.$apollo.queries.search.skip = false;
            this.$apollo.queries.search.refetch();
        }, 200),
        searchBtn: function () {
            this.noneFound = false;
            this.$apollo.queries.search.skip = false;
            this.$apollo.queries.search.refetch();
        },
    },
    apollo: {
        search: {
            query: SEARCH_QUERY,
            variables() {
                // Use vue reactive properties here
                return {
                    query: this.searchQuery,
                };
            },
            error(error) {
                this.error = JSON.stringify(error.message);
            },
            result(res, key) {
                if (key === "search" && res.data.search.length === 0) {
                    this.noneFound = true;
                }
            },
            skip: true,
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
    display: flex;
    flex-direction: column;
}
</style>