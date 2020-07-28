<template>
    <section class="poll--card">
        <h3 class="poll--card--title">{{title}}</h3>
        <p class="poll--card--description">{{description}}</p>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
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
    margin: 10px 0;
}

.poll--card--title {
    color: var(--error);
    font-size: 1.5em;
    margin-bottom: 10px;
}

.poll--card--description {
    font-size: 1.2em;
}
</style>