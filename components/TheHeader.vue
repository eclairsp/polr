<template>
    <header>
        <h1 class="logo--heading">polr</h1>
        <transition name="fade">
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
    padding: 10px;
    padding-bottom: 25px;
}

h1 {
    color: var(--text-color-headline);
}

.page--name {
    margin-right: 10px;
    font-size: 2em;
    color: var(--primary-2);
}

.logo--heading {
    font-size: 4em;
}
</style>