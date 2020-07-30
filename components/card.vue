<template>
    <section class="poll--card">
        <h3 class="poll--card--title">
            <nuxt-link
                class="poll--card--title--link"
                :to="{ name: 'poll-id', params: { id: index }}"
            >{{title}}</nuxt-link>
        </h3>

        <p class="poll--card--description">{{description}}</p>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        index: Number,
    },
};
</script>

<style scoped>
.poll--card {
    border-radius: 10px;
    background: var(--card-bg);
    color: var(--text-color);
    padding: 10px;
    box-shadow: 0px 2px 10px 0.5px var(--shadow);
    margin: 12px 10px;
}

.poll--card--title {
    color: var(--text-color-headline);
    font-size: 1.5em;
    margin-bottom: 10px;
}

.poll--card--title--link,
.poll--card--title--link:active,
.poll--card--title--link:hover,
.poll--card--title--link:visited {
    color: var(--text-color-headline);
    text-decoration: none;
}

.poll--card--description {
    font-size: 1.2em;
}
</style>