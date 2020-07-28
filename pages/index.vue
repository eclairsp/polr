<template>
    <div>
        <div v-if="$apollo.loading">
            <loading />
        </div>
        <div v-else-if="error">
            <error title="Can't get polls." description="Try later" />
        </div>
        <ul v-else>
            <li v-for="(poll, index) in feed" :key="poll.id">
                <card :index="index" :title="poll.url" :description="poll.description" />
            </li>
        </ul>
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
                        console.log(previous, subscriptionData);
                        if (!subscriptionData.data.newLink) return;

                        const newFeed = [
                            ...previous.feed,
                            subscriptionData.data.newLink,
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
};
</script>

<style scoped>
</style>