<template>
    <div>
        <h1 v-if="$apollo.loading">Loading...</h1>
        <h1 v-else-if="error">Error Occured</h1>
        <div v-else>
            <h1>{{link.url}}</h1>
            <p>{{link.description}}</p>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
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
            link: {},
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
                this.error = JSON.stringify(error.message);
            },
        },
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
