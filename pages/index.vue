<template>
    <div>
        <loading v-if="$apollo.loading" />
        <error @retry="retry" v-else-if="error" title="Can't get polls." description="Try later" />
        <transition-group v-else name="list" appear tag="ul">
            <li v-for="poll in feed" :key="poll.id">
                <card
                    v-if="!$apollo.loading && !error"
                    :index="parseInt(poll.id)"
                    :title="poll.url"
                    :description="poll.description"
                />
            </li>
        </transition-group>
    </div>
</template>

<script>
import gql from "graphql-tag";
import card from "../components/card";
import loading from "../components/loading";
import error from "../components/error";

const ALL_FEEDS_QUERY = gql`
    query {
        feed {
            id
            url
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
            feed: [],
            error: null,
        };
    },

    components: {
        card: card,
        loading: loading,
        error: error,
    },
    apollo: {
        feed: {
            query: ALL_FEEDS_QUERY,
            subscribeToMore: [
                {
                    document: NEW_LINKS_SUBSCRIPTION,
                    updateQuery: (previous, { subscriptionData }) => {
                        if (!subscriptionData.data.newLink) return;

                        const newFeed = [
                            subscriptionData.data.newLink,
                            ...previous.feed,
                        ];
                        const result = {
                            ...previous,
                            feed: newFeed,
                        };
                        return result;
                    },
                },
            ],
            error(error) {
                this.error = JSON.stringify(error.message);
            },
        },
    },
    methods: {
        retry: function () {
            this.error = null;
            this.$apollo.queries.feed.refetch();
        },
    },
};
</script>

<style scoped>
</style>