<template>
    <header>
        <nuxt-link class="logo--heading--link" to="/">
            <h1 class="logo--heading">polr</h1>
        </nuxt-link>
        <transition name="theme">
            <h1 v-if="root" class="page--name">{{routeName.toUpperCase()}}</h1>
        </transition>
    </header>
</template>

<script>
export default {
    data() {
        return {
            root: true,
            routeName: this.routeNameValidator(),
        };
    },
    methods: {
        routeNameValidator: function () {
            if (this.$route.name.split("-")[0] === "index") {
                return "Home";
            } else {
                return this.$route.name.split("-")[0];
            }
        },
        routeChange: function () {
            this.routeName = this.routeNameValidator();
            setTimeout(() => {
                this.root = true;
            }, 500);
            this.root = false;
        },
    },
    watch: {
        $route(to, from) {
            this.routeChange();
        },
    },
};
</script>

<style scoped>
header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 15px 10px 15px 10px;
}

h1 {
    color: var(--text-color-headline);
}

.page--name {
    margin-right: 10px;
    font-size: 1.5em;
    color: var(--primary-1);
}

.logo--heading {
    font-size: 3em;
}

.logo--heading--link,
.logo--heading--link:active,
.logo--heading--link:hover,
.logo--heading--link:visited {
    color: var(--text-color-headline);
    text-decoration: none;
}
</style>