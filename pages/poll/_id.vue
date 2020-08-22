<template>
    <section class="id">
        <loading :full="true" v-if="$apollo.queries.poll.loading" />
        <error v-else-if="error" @retry="retry" :title="error" description="Try later" />
        <div class="poll--info" v-else>
            <h1 class="poll--title">{{poll.title}}</h1>
            <p class="poll--description">{{poll.description}}</p>
            <p
                class="poll--description"
            >{{new Date(poll.createdAt).toLocaleDateString("en-US", dateOptions)}}</p>
        </div>
        <transition name="fade" mode="out-in">
            <ul
                v-if="!error && !$apollo.queries.poll.loading && poll.multipleOption"
                key="multiple"
            >
                <li class="option--item" v-for="option in poll.options" :key="option._id">
                    <section class="option">
                        <input
                            class="indicator"
                            :id="option._id"
                            type="checkbox"
                            :value="option._id"
                            v-model="voteFor"
                        />
                        <label class="option--text" :for="option._id">{{option.option}}</label>
                    </section>
                </li>
            </ul>
            <ul v-if="!error && !$apollo.queries.poll.loading && !poll.multipleOption" key="single">
                <li class="option--item" v-for="option in poll.options" :key="option._id">
                    <section class="option">
                        <input
                            class="indicator"
                            :id="option._id"
                            type="radio"
                            :value="option._id"
                            v-model="voteFor"
                        />
                        <label class="option--text" :for="option._id">{{option.option}}</label>
                    </section>
                </li>
            </ul>
        </transition>
        <btn v-if="!error && !$apollo.queries.poll.loading" @clicked="vote()" class="vote--btn">Vote</btn>

        <transition name="fade" mode="out-in">
            <section v-if="voting" class="result">
                <loading :full="false" />
            </section>
            <template v-if="!error && !$apollo.queries.poll.loading && showResults && !voting">
                <result :options="poll.options" />
            </template>
        </transition>
    </section>
</template>

<script>
import gql from "graphql-tag";
import loading from "../../components/loading";
import error from "../../components/error";
import btn from "../../components/btn";
import result from "../../components/result";

const ALL_FEEDS_QUERY = gql`
    query Poll($id: ID!) {
        poll(id: $id) {
            _id
            title
            description
            createdAt
            multipleOption
            privatePoll
            options {
                _id
                option
                vote
            }
        }
    }
`;

const VOTE_OPTION = gql`
    mutation addVote($options: [ID!]!, $poll_id: ID!) {
        addVote(options: $options, poll_id: $poll_id) {
            _id
            options {
                _id
                option
                vote
            }
        }
    }
`;

const VOTE_SUBSCRIBE = gql`
    subscription newVote($poll_id: ID!) {
        newVote(poll_id: $poll_id) {
            _id
            options {
                _id
                option
                vote
            }
        }
    }
`;

export default {
    data() {
        return {
            voteFor: [],
            poll: {},
            error: null,
            dateOptions: {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            },
            showResults: false,
            voting: false,
        };
    },
    apollo: {
        poll: {
            query: ALL_FEEDS_QUERY,
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
            subscribeToMore: {
                document: VOTE_SUBSCRIBE,
                // Variables passed to the subscription. Since we're using a function,
                // they are reactive
                variables() {
                    return {
                        poll_id: this.$route.params.id,
                    };
                },
                // Mutate the previous result
                updateQuery: (previousResult, { subscriptionData }) => {
                    if (
                        previousResult.poll._id ===
                        subscriptionData.data.newVote._id
                    ) {
                        const options = {
                            ...subscriptionData.data.newVote.options,
                        };
                        return (previousResult = {
                            ...previousResult,
                            ...options,
                        });
                    }
                },
            },
        },
    },
    components: {
        loading,
        error,
        btn,
        result,
    },
    methods: {
        retry: function () {
            this.skipQuery = false;
            this.$apollo.queries.poll.refetch();
        },
        translate: function (data) {
            return `translate(-${100 - data})`;
        },
        vote: async function () {
            this.voting = true;
            const result = await this.$apollo.mutate({
                // Query
                mutation: VOTE_OPTION,
                // Parameters
                variables: {
                    options: this.voteFor,
                    poll_id: this.$route.params.id,
                },
            });
            this.showResults = true;
            this.voteFor = [];

            this.voting = false;
        },
    },
    head() {
        return {
            title: `${this.poll.title} | polr`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: this.poll.description,
                },
            ],
        };
    },
};
</script>

<style scoped>
.id {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.poll--info {
    padding: 10px;
}

.poll--description {
    margin: 10px 0;
    font-size: 1.2em;
    padding: 2px;
}

.poll--title {
    font-size: 2.5em;
    word-break: break-all;
    padding: 2px;
}

.indicator {
    margin: 0 10px 0 0;
}

.option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--card-bg);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 2px 10px 0.5px var(--shadow);
    margin: 5px 10px;
}

.option--item {
    border-radius: 10px;
}

.option--text {
    margin: 0 0 0 10px;
}

.vote--btn {
    margin: 10px 10px;
}

.result {
    padding: 10px;
}

@media screen and (min-width: 768px) and (max-width: 1025px) {
}
@media screen and (min-width: 1025px) and (max-width: 1336px) {
}
@media screen and (min-width: 1336px) {
    .poll--title {
        font-size: 4em;
        word-break: break-all;
    }
}
</style>
