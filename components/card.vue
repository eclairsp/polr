<template>
    <nuxt-link class="poll--card--title--link" :to="{ name: 'poll-id', params: { id: index }}">
        <section class="poll--card">
            <h3 class="poll--card--title">{{title}}</h3>
            <p class="poll--card--description">{{description}}</p>
            <button class="poll--card--vote--btn">Vote Now</button>
        </section>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        index: String,
    },
};
</script>

<style scoped>
.poll--card {
    border-radius: 10px;
    background: var(--card-bg);
    color: var(--text-color);
    padding: 10px;
    box-shadow: 0px 5px 10px var(--shadow);
    margin: 12px 10px;
}

.poll--card--title {
    color: var(--text-color-headline);
    font-size: 1.5em;
    margin-bottom: 5px;
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
    margin-bottom: 5px;
}

.poll--card--vote--btn {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    font-size: 1.1em;
    background: var(--primary-2);
    color: var(--text-color-headline);
    border: none;
    margin: 5px 0;
}
</style>