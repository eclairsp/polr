<template>
    <transition name="fade">
        <loading :full="true" v-if="$apollo.queries.pollPrivate.loading" />
        <error v-else-if="errorMessage" @retry="retry" :title="error" description="Try later" />
        <section
            v-if="!$apollo.queries.pollPrivate.loading && !errorMessage && passwordCorrect "
            class="id"
        >
            <div class="poll--info">
                <h1 class="poll--title">{{pollPrivate.title}}</h1>
                <p class="poll--description">{{pollPrivate.description}}</p>
                <p
                    class="poll--description"
                >{{new Date(pollPrivate.createdAt).toLocaleDateString("en-US", dateOptions)}}</p>
            </div>
            <transition name="fade" mode="out-in">
                <ul
                    v-if="!errorMessage && !$apollo.queries.pollPrivate.loading && pollPrivate.multipleOption"
                    key="multiple"
                >
                    <li
                        class="option--item"
                        v-for="option in pollPrivate.options"
                        :key="option._id"
                    >
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
                <ul
                    v-if="!errorMessage && !$apollo.queries.pollPrivate.loading && !pollPrivate.multipleOption"
                    key="single"
                >
                    <li
                        class="option--item"
                        v-for="option in pollPrivate.options"
                        :key="option._id"
                    >
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
            <btn
                v-if="!errorMessage && !$apollo.queries.pollPrivate.loading"
                @clicked="vote()"
                class="vote--btn"
            >Vote</btn>

            <transition name="fade" mode="out-in">
                <section v-if="voting" class="result">
                    <loading :full="false" />
                </section>
                <template
                    v-if="!errorMessage && !$apollo.queries.pollPrivate.loading && showResults && !voting"
                >
                    <result :options="pollPrivate.options" />
                </template>
            </transition>
        </section>
        <div v-if="!passwordCorrect">
            <textInput
                :class="errorClass"
                v-bind:value="password"
                v-on:input="password = $event"
                @typing="refreshInput"
                @enter="validatePassword"
                type="password"
                placeholder="Enter password for Poll."
            />
            <btn @clicked="validatePassword">GO</btn>
            <transition name="fade">
                <section class="error--message" v-if="errorMessage">
                    <transition name="fade" mode="out-in">
                        <h3 :key="errorMessage">{{errorMessage}}</h3>
                    </transition>
                </section>
            </transition>
        </div>
    </transition>
</template>

<script>
import gql from "graphql-tag";
import loading from "../../../components/loading";
import error from "../../../components/error";
import textInput from "../../../components/textInput";
import btn from "../../../components/btn";
import result from "../../../components/result";

const PRIVATE_POLL = gql`
    query privatePoll($id: ID!, $password: String!) {
        pollPrivate(id: $id, password: $password) {
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
            pollPrivate: {},
            dateOptions: {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            },
            showResults: false,
            voting: false,
            password: "",
            passwordCorrect: false,
            errorMessage: "",
            errorClass: "",
        };
    },
    methods: {
        retry: function () {
            this.skipQuery = false;
            this.$apollo.queries.pollPrivate.refetch();
        },
        validatePassword: function () {
            console.log("checking");
            if (this.password.length === 0) {
                this.password = "";
                this.errorMessage = "Cant keep blank.";
                this.errorClass = "input--error";
                return;
            }
            if (this.password.length < 8) {
                this.password = "";
                this.errorMessage = "Should be more than 8 characters";
                this.errorClass = "input--error";
                return;
            }
            this.$apollo.queries.pollPrivate.skip = false;
            this.$apollo.queries.pollPrivate.refetch();
        },
        refreshInput: function () {
            this.$apollo.queries.pollPrivate.skip = true;
            this.errorMessage = "";
            this.errorClass = "";
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
    apollo: {
        pollPrivate: {
            query: PRIVATE_POLL,
            variables() {
                return {
                    id: this.$route.params.id,
                    password: this.password,
                };
            },
            result(res, key) {
                if (
                    key === "pollPrivate" &&
                    this.errorMessage != "Wrong password!" &&
                    res.data.pollPrivate.__typename === "Poll"
                ) {
                    this.passwordCorrect = true;
                }
            },
            error(error) {
                if (error.message === "GraphQL error: Wrong password") {
                    this.errorMessage = "Wrong password!";
                    this.passwordCorrect = false;
                } else {
                    this.errorMessage = JSON.stringify(error.message);
                }
            },
            skip: true,
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
                        previousResult.pollPrivate._id ===
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
        textInput,
        btn,
        loading,
        error,
        result,
    },
    head() {
        return {
            title: `${this.pollPrivate.title} | polr`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: this.pollPrivate.description,
                },
            ],
        };
    },
};
</script>

<style scoped>
div {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
}

.error--message {
    font-size: 1em;
    padding: 10px;
    background: var(--card-bg);
    border: 2px solid var(--error);
    color: var(--error);
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
    border-radius: 10px;
    margin: 0 0 10px 0;
}

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