<template>
    <section>
        <label for="title">Title</label>
        <textInput
            :class="errorClass[0]"
            id="title"
            v-bind:value="title"
            @typing="refreshInput"
            v-on:input="title = $event"
            placeholder="Enter title..."
        />

        <toggle @toggled="changePrivate">Private</toggle>
        <transition name="fade">
            <label v-if="privatePoll" key="label" for="password">Password</label>
        </transition>
        <transition name="fade">
            <textInput
                :class="errorClass[1]"
                v-if="privatePoll"
                key="passwordInput"
                id="password"
                v-bind:value="password"
                @typing="refreshInput"
                v-on:input="password = $event"
                placeholder="Enter password..."
                type="password"
            />
        </transition>

        <label for="description">Description</label>
        <textarea
            v-on:keyup="refreshInput"
            :class="errorClass[2]"
            id="description"
            v-model="description"
        />

        <label for="options">Options</label>
        <transition name="fade">
            <transition-group name="list" v-if="options.length != 0" tag="ul">
                <li v-for="(option, index) in options" :key="option">
                    <span>
                        <p>{{option}}</p>
                        <btn class="remove--margin" @clicked="removeOption(index)">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 512 512"
                            >
                                <title>Remove</title>
                                <line
                                    x1="368"
                                    y1="368"
                                    x2="144"
                                    y2="144"
                                    style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                                />
                                <line
                                    x1="368"
                                    y1="144"
                                    x2="144"
                                    y2="368"
                                    style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                                />
                            </svg>
                        </btn>
                    </span>
                </li>
            </transition-group>
        </transition>

        <searchbar
            :class="errorClass[3]"
            @clicked="addOption"
            v-bind:value="option"
            v-on:input="option = $event"
            @typing="refreshInput"
            placeholder="Add options..."
        >
            <svg class="searchbar--icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Add</title>
                <line
                    x1="256"
                    y1="112"
                    x2="256"
                    y2="400"
                    style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                />
                <line
                    x1="400"
                    y1="256"
                    x2="112"
                    y2="256"
                    style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                />
            </svg>
        </searchbar>

        <toggle @toggled="changeMultiple">Multiple Options</toggle>

        <btn class @clicked="submitList">Submit List</btn>
        <transition name="fade">
            <section class="error--message" v-if="errorMessage">
                <transition name="fade" mode="out-in">
                    <h3 :key="errorMessage">{{errorMessage}}</h3>
                </transition>
            </section>
        </transition>
    </section>
</template>

<script>
import gql from "graphql-tag";
import textInput from "../components/textInput";
import btn from "../components/btn";
import toggle from "../components/toggle";
import searchbar from "../components/searchbar";

const NEW_POLL = gql`
    mutation createPoll(
        $title: String!
        $description: String!
        $privatePoll: Boolean!
        $multipleOption: Boolean!
        $password: String!
        $options: [String!]
    ) {
        createPoll(
            input: {
                title: $title
                description: $description
                privatePoll: $privatePoll
                multipleOption: $multipleOption
                password: $password
                options: $options
            }
        ) {
            _id
            title
            privatePoll
        }
    }
`;

export default {
    data() {
        return {
            options: [],
            option: "",
            privatePoll: false,
            title: "",
            description: "",
            password: "",
            errorClass: ["", "", "", ""],
            errorMessage: "",
            multipleOption: false,
        };
    },
    head() {
        return {
            title: "Create a poll",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: "Create a new poll",
                },
            ],
        };
    },
    methods: {
        addOption: function () {
            if (this.option.length === 0) {
                this.errorMessage = "No blank option.";
                this.changeErrorClass(3);
                return;
            }
            if (this.options.includes(this.option)) {
                this.errorMessage = "No duplicate option.";
                this.changeErrorClass(3);
                return;
            }
            this.options.push(this.option);
            this.option = "";
        },
        removeOption: function (index) {
            this.options.splice(index, 1);
        },
        submitList: async function () {
            if (this.title.length === 0) {
                this.errorMessage = "No blank title.";
                this.changeErrorClass(0);
                return;
            }
            if (this.privatePoll) {
                if (this.password.length === 0) {
                    this.errorMessage = "No blank password.";
                    this.changeErrorClass(1);
                    return;
                }
                if (this.password.length < 8) {
                    this.errorMessage =
                        "Password should be minimum 8 characters long.";
                    this.changeErrorClass(1);
                    return;
                }
            }
            if (this.options.length === 0) {
                this.errorMessage = "No blank option.";
                this.changeErrorClass(3);
                return;
            }
            if (this.options.length < 2) {
                this.errorMessage = "At least two options.";
                this.changeErrorClass(3);
                return;
            }

            //no error
            this.changeErrorClass(5);

            if (!this.privatePoll) {
                this.password = "password";
            }

            const {
                title,
                description,
                privatePoll,
                multipleOption,
                password,
                options,
            } = this;
            const result = await this.$apollo.mutate({
                // Query
                mutation: NEW_POLL,
                // Parameters
                variables: {
                    title,
                    description,
                    privatePoll,
                    multipleOption,
                    password,
                    options,
                },
            });
            if (result.data.createPoll.privatePoll) {
                this.$router.push({
                    name: "poll-id",
                    params: { id: result.data.createPoll._id },
                });
            } else {
                this.$router.push({
                    name: "poll-id",
                    params: { id: result.data.createPoll._id },
                });
            }
        },
        changePrivate: function () {
            this.privatePoll = !this.privatePoll;
        },
        changeErrorClass: function (index) {
            if (index > this.errorClass.length) this.errorMessage = "";
            this.errorClass.map((val, idx) => {
                if (index === idx) this.errorClass[idx] = "input--error";
                if (index !== idx) this.errorClass[idx] = "";
            });
        },
        refreshInput: function () {
            this.errorClass = ["", "", "", ""];
            this.errorMessage = "";
        },
        changeMultiple: function () {
            this.multipleOption = !this.multipleOption;
        },
    },
    components: {
        textInput,
        btn,
        toggle,
        searchbar,
    },
};
</script>

<style scoped>
section {
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
}

textarea {
    width: 100%;
    font-size: 1.5em;
    color: var(--text-color);
    background: var(--card-bg);
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin: 0 0 10px 0;
    resize: vertical;
}

label {
    font-size: 1.75em;
    margin: 10px 0 10px 0;
    color: var(--text-color-headline);
}

ul {
    background: var(--bg);
    padding: 10px;
    margin: 0 0 10px 0;
    border-radius: 10px;
    overflow-x: hidden;
}

span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5em;
    margin: 0 0 10px 0;
}

.error--message {
    font-size: 1.2em;
    padding: 10px;
    background: var(--card-bg);
    border: 2px solid var(--error);
    color: var(--error);
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
    border-radius: 10px;
    margin: 20px 0 10px 0;
}

span p {
    width: 80%;
}
</style>