<template>
    <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        v-on:keyup.enter="$emit('enter')"
        v-on:keyup="$emit('typing')"
        :type="type"
        :placeholder="placeholder"
    />
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: String,
        type: String,
    },
};
</script>

<style scoped>
input {
    font-size: 1.5em;
    color: var(--text-color);
    background: var(--card-bg);
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin: 0 0 10px 0;
}

.input--error {
    border: 2px solid var(--error);
}
</style>