<template>
    <button v-on:click="$emit('clicked')">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        name: String,
    },
};
</script>

<style scoped>
button {
    background: var(--primary-3);
    border: none;
    color: var(--text-color-headline);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 1.5em;
    border-radius: 10px;
    margin: 15px 0 15px 0;
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
}

.remove--margin {
    margin: 0 0 0 0;
}

.btn--not--full {
    width: max-content;
}
</style>