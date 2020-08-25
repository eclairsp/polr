<template>
    <div>
        <loading :full="true" v-if="$apollo.loading" />
        <error @retry="retry" v-else-if="error" title="Can't get polls." description="Try later" />
        <transition-group v-else name="list" appear tag="ul" class="card--list">
            <li class="card--shadow" v-for="poll in polls" :key="poll._id">
                <card
                    v-if="!$apollo.loading && !error"
                    :index="poll._id"
                    :title="poll.title"
                    :description="poll.description"
                />
            </li>
        </transition-group>
        <card v-if="polls.length === 0 && !$apollo.loading" title="No polls found!" />
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

<style>
.card--list {
    padding: 10px;
    width: 100%;
}

.card--shadow {
    box-shadow: 0px 5px 10px var(--shadow);
    margin: 12px 0px;
    border-radius: 10px;
}
</style>