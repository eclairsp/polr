<template>
    <div>
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
</template>

<script>
import textInput from "../../../components/textInput";
import btn from "../../../components/btn";
export default {
    data() {
        return {
            password: "",
            errorMessage: "",
            errorClass: "",
        };
    },
    methods: {
        validatePassword: function () {
            if (this.password.length === 0) {
                this.password = "";
                this.errorMessage = "Cant keep blank.";
                this.errorClass = "input--error";
                return;
            }
            if (isNaN(this.password)) {
                this.password = "";
                this.errorMessage = "Only numbers allowed";
                this.errorClass = "input--error";
                return;
            }
            if (this.password.length < 8) {
                this.password = "";
                this.errorMessage = "Should be more than 8 characters";
                this.errorClass = "input--error";
                return;
            }
            console.log(this.password);
        },
        refreshInput: function () {
            this.errorMessage = false;
            this.errorClass = "";
        },
    },
    components: {
        textInput: textInput,
        btn: btn,
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
</style>