<template>
    <div class="searchbar">
        <input
            class="search--input"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            v-on:keyup.enter="$emit('enter')"
            v-on:keyup="$emit('typing')"
            type="text"
            :placeholder="placeholder"
        />
        <button class="search--button" v-on:click="$emit('clicked')">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: String,
    },
};
</script>

<style scoped>
.searchbar {
    width: 100%;
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 2px 10px 0.2px var(--shadow);
    margin: 10px 0 10px 0;
}

.search--input {
    width: 80%;
    font-size: 1.5em;
    background: var(--card-bg);
    color: var(--text-color);
    border: none;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.input--error {
    border: 2px solid var(--error);
}

.search--button {
    cursor: pointer;
    width: 20%;
    background: var(--primary-3);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.searchbar--icons {
    height: 35px;
    width: 35px;
    fill: none;
    stroke: var(--bg);
}

@media screen and (min-width: 1336px) {
    .search--input {
        width: 90%;
    }
    .search--button {
        width: 10%;
    }
}
</style>