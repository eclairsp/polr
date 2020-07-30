<template>
    <div>
        <loading v-if="$apollo.loading" />
        <error v-else-if="error" @retry="retry" :title="error" description="Try later" />
        <div v-else>
            <h1>{{link.url}}</h1>
            <p>{{link.description}}</p>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import loading from "../../components/loading";
import error from "../../components/error";

const ALL_FEEDS_QUERY = gql`
    query Link($id: ID!) {
        link(id: $id) {
            id
            url
            description
        }
    }
`;

export default {
    data() {
        return {
            link: {
                url: "Poll",
                description: "Vote on a poll",
            },
            error: null,
        };
    },
    apollo: {
        link: {
            query: gql`
                query($id: ID!) {
                    link(id: $id) {
                        url
                        description
                    }
                }
            `,
            variables() {
                // Use vue reactive properties here
                return {
                    id: this.$route.params.id,
                };
            },
            error(error) {
                if (error.message === "GraphQL error: No poll found") {
                    this.error = "No poll found";
                } else {
                    this.error = JSON.stringify(error.message);
                }
            },
        },
    },
    components: {
        loading: loading,
        error: error,
    },
    methods: {
        retry: function () {
            this.skipQuery = false;
            this.$apollo.queries.feed.refetch();
        },
    },
    head() {
        return {
            title: `${this.link.url} | polr`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: this.link.description,
                },
            ],
        };
    },
};
</script>

<style scoped>
p {
    margin: 10px 0;
}

h1 {
    word-break: break-all;
}
</style>
