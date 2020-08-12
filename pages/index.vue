<template>
    <div>
        <loading :full="true" v-if="$apollo.loading" />
        <error @retry="retry" v-else-if="error" title="Can't get polls." description="Try later" />
        <transition-group v-else name="list" appear tag="ul">
            <li v-for="poll in polls" :key="poll._id">
                <card
                    v-if="!$apollo.loading && !error"
                    :index="poll._id"
                    :title="poll.title"
                    :description="poll.description"
                />
            </li>
        </transition-group>
        <h1 v-if="polls.length === 0">No polls found.</h1>
    </div>
</template>

<script>
import gql from "graphql-tag";
import card from "../components/card";
import loading from "../components/loading";
import error from "../components/error";

const ALL_FEEDS_QUERY = gql`
    query {
        polls {
            _id
            title
            description
        }
    }
`;
const NEW_LINKS_SUBSCRIPTION = gql`
    subscription {
        newLink {
            id
            url
            description
        }
    }
`;
export default {
    data() {
        return {
            polls: [],
            error: null,
        };
    },

    components: {
        card: card,
        loading: loading,
        error: error,
    },
    apollo: {
        polls: {
            query: ALL_FEEDS_QUERY,
            // subscribeToMore: [
            //     {
            //         document: NEW_LINKS_SUBSCRIPTION,
            //         updateQuery: (previous, { subscriptionData }) => {
            //             if (!subscriptionData.data.newLink) return;

            //             const newFeed = [
            //                 subscriptionData.data.newLink,
            //                 ...previous.feed,
            //             ];
            //             const result = {
            //                 ...previous,
            //                 feed: newFeed,
            //             };
            //             return result;
            //         },
            //     },
            // ],
            error(error) {
                this.error = JSON.stringify(error.message);
            },
        },
    },
    methods: {
        retry: function () {
            this.error = null;
            this.$apollo.queries.polls.refetch();
        },
    },
};
</script>

<style scoped>
</style>