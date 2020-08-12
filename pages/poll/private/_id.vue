<template>
    <transition name="fade">
        <loading :full="true" v-if="$apollo.queries.pollPrivate.loading && passwordCorrect" />
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
                <figure
                    id="result"
                    v-if="!errorMessage && !$apollo.queries.pollPrivate.loading && showResults && !voting"
                >
                    <figcaption>
                        <h1 class="result--title">Results</h1>
                        <ul class="result--list">
                            <li
                                class="result--item"
                                v-for="(color, index) in optionsColors"
                                :key="color"
                            >
                                <div class="result--box" :style="{background: color}"></div>
                                {{pollPrivate.options[index].option}} - {{pollPrivate.options[index].vote}}
                            </li>
                        </ul>
                    </figcaption>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        class="chart"
                        width="100%"
                        :height="pollPrivate.options.length * 40"
                        aria-labelledby="title"
                        role="img"
                    >
                        <title id="title">A bart chart showing information</title>
                        <g
                            v-for="(data, index) in pollPrivate.options"
                            class="bar"
                            :key="data.option"
                        >
                            <rect
                                stroke="black"
                                stroke-alignment="inside"
                                :fill="optionsColors[index]"
                                :width="`${((data.vote / max) * 100) - 1}%`"
                                height="30"
                                :y="5 + 35*index"
                                x="2"
                                rx="5"
                            />
                            <text
                                class="bar--text"
                                x="10"
                                :y="25 + 35*index"
                            >{{data.option}} - {{data.vote}} votes</text>
                        </g>
                    </svg>
                </figure>
            </transition>
        </section>
        <div v-if="!passwordCorrect">
            <textInput
                :class="errorClass"
                v-bind:value="password"
                v-on:input="password = $event"
                @typing="refreshInput"
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
            totalVotes: 0,
            max: 0,
            optionsColors: [],
            showResults: false,
            voting: false,
            password: "",
            passwordCorrect: false,
            errorMessage: "",
            errorClass: "",
        };
    },
    watch: {
        pollPrivate: function (poll) {
            this.max = Math.max(
                ...poll.options.map((option) => option.vote),
                0
            );

            let totalVotes = 0;
            this.pollPrivate.options.forEach(
                (element) => (totalVotes += element.vote)
            );

            this.totalVotes = totalVotes;

            // Get a random hue value 0-360
            const randHue = () => Math.floor(360 * Math.random());

            // Get a random value for Saturation and Lightness
            const randSaturation = () => Math.random() * (80 - 20) + 20;

            // Get a random value for Lightness
            const randLightness = () => Math.random() * (60 - 40) + 40;

            const colors = this.pollPrivate.options.map((_, index) => {
                return (
                    "hsl(" +
                    randHue() +
                    "," +
                    randSaturation() +
                    "%," +
                    randLightness() +
                    "%)"
                );
            });
            this.optionsColors = [...colors];
        },
    },
    methods: {
        retry: function () {
            this.skipQuery = false;
            this.$apollo.queries.pollPrivate.refetch();
        },
        validatePassword: function () {
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
            setTimeout(() => {
                if (process.client && this.showResults) {
                    document.getElementById("result").scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest",
                    });
                }
            }, 100);
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
                    console.log(previousResult, subscriptionData);
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

.result {
    padding: 10px;
    height: 100%;
    background: var(--card-bg);
    border-radius: 10px;
    margin: 0 10px;
}

.result--title {
    font-size: 2em;
    margin: 5px 0;
}

figure {
    padding: 10px;
    height: 100%;
    background: var(--card-bg);
    border-radius: 10px;
    margin: 0 10px;
}

.result--list {
    margin: 5px 0;
}

.result--item {
    display: flex;
    margin: 5px 0;
    justify-content: flex-start;
    align-items: center;
}

.result--box {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: red;
    margin: 0 5px;
}

.bar {
    font-family: Helvetica, sans-serif;
    -webkit-transition: 0.5s all;
    transition: 0.5s all;
}

.bar rect {
    transition: 1s all;
    stroke-width: 3px;
    paint-order: stroke;
}

.bar--text {
    fill: var(--text-svg);
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