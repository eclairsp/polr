<template>
    <section class="poll--card">
        <h3 class="poll--card--title">{{title}}</h3>
        <p class="poll--card--description">{{description}}</p>
        <button @click="retry" class="poll--card--error--btn">Retry</button>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
    },
    methods: {
        retry: function () {
            this.$emit("retry");
        },
    },
};
</script>

<style scoped>
.poll--card {
    border-radius: 10px;
    background: var(--card-bg);
    color: var(--text-color);
    border: 2px solid var(--error);
    padding: 10px;
    box-shadow: 0px 5px 10px 0.2px var(--shadow);
    margin: 10px 10px;
}

.poll--card--title {
    color: var(--error);
    font-size: 1.5em;
    margin-bottom: 10px;
}

.poll--card--description {
    font-size: 1.2em;
}

.poll--card--error--btn {
    cursor: pointer;
    background: var(--card-bg);
    border: 2px solid var(--error);
    font-size: 1.5em;
    padding: 10px;
    color: var(--error);
    border-radius: 5px;
    margin: 10px 0 0 0;
}
</style>