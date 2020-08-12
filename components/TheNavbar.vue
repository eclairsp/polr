<template>
    <transition name="nav" mode="out-in">
        <nav key="full" v-if="full">
            <ul class="nav--bar">
                <li @click="collapse" class="nav--bar--item">
                    <nuxt-link v-if="full" to="/">
                        <svg
                            class="nav--bar--icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <title>Home</title>
                            <path
                                d="M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                            <path
                                d="M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                            <polyline
                                points="400 179 400 64 352 64 352 133"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                        </svg>
                    </nuxt-link>
                </li>
                <li @click="collapse" class="nav--bar--item">
                    <nuxt-link v-if="full" :to="{name: 'search'}">
                        <svg
                            class="nav--bar--icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <title>Search</title>
                            <path
                                d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
                                style="stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="338.29"
                                y1="338.29"
                                x2="448"
                                y2="448"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                        </svg>
                    </nuxt-link>
                </li>
                <li @click="collapse" class="nav--bar--item">
                    <nuxt-link v-if="full" :to="{ name: 'add'}">
                        <svg
                            class="nav--bar--icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <title>Add</title>
                            <line
                                x1="256"
                                y1="72"
                                x2="256"
                                y2="440"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                            <line
                                x1="440"
                                y1="256"
                                x2="72"
                                y2="256"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                        </svg>
                    </nuxt-link>
                </li>
                <transition name="theme" mode="out-in">
                    <li
                        key="light"
                        v-if="$colorMode.preference === 'light'"
                        @click="$colorMode.preference = 'dark'"
                        class="nav--bar--item"
                    >
                        <svg
                            class="nav--bar--icons"
                            xmlns="http://www.w3.org/2000/svg"
                            width="512"
                            height="512"
                            viewBox="0 0 512 512"
                        >
                            <title>Theme Dark</title>
                            <path
                                d="M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,119.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z"
                                style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                            />
                        </svg>
                    </li>
                    <li
                        key="dark"
                        v-if="$colorMode.preference === 'dark'"
                        @click="$colorMode.preference = 'light'"
                        class="nav--bar--item"
                    >
                        <svg
                            class="nav--bar--icons"
                            xmlns="http://www.w3.org/2000/svg"
                            width="512"
                            height="512"
                            viewBox="0 0 512 512"
                        >
                            <title>Light Theme</title>
                            <line
                                x1="256"
                                y1="48"
                                x2="256"
                                y2="96"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="256"
                                y1="416"
                                x2="256"
                                y2="464"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="403.08"
                                y1="108.92"
                                x2="369.14"
                                y2="142.86"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="142.86"
                                y1="369.14"
                                x2="108.92"
                                y2="403.08"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="464"
                                y1="256"
                                x2="416"
                                y2="256"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="96"
                                y1="256"
                                x2="48"
                                y2="256"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="403.08"
                                y1="403.08"
                                x2="369.14"
                                y2="369.14"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <line
                                x1="142.86"
                                y1="142.86"
                                x2="108.92"
                                y2="108.92"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                            <circle
                                cx="256"
                                cy="256"
                                r="80"
                                style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            />
                        </svg>
                    </li>
                </transition>
                <li @click="collapse" class="nav--bar--item">
                    <svg
                        class="nav--bar--icons"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                    >
                        <title>Minimize</title>
                        <line
                            x1="412"
                            y1="412"
                            x2="100"
                            y2="100"
                            style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                        />
                        <line
                            x1="412"
                            y1="100"
                            x2="100"
                            y2="412"
                            style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                        />
                    </svg>
                </li>
            </ul>
        </nav>
        <nav class="nav-collapsed" key="collapse" v-if="!full" @click="collapse">
            <ul class="nav--bar">
                <li class="nav--bar--item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                        class="nav--bar--icons"
                    >
                        <title>Open Menu</title>
                        <line
                            x1="80"
                            y1="160"
                            x2="432"
                            y2="160"
                            style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                        />
                        <line
                            x1="80"
                            y1="256"
                            x2="432"
                            y2="256"
                            style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                        />
                        <line
                            x1="80"
                            y1="352"
                            x2="432"
                            y2="352"
                            style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                        />
                    </svg>
                </li>
            </ul>
        </nav>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            full: false,
        };
    },
    methods: {
        collapse: function () {
            this.full = !this.full;
        },
    },
};
</script>

<style scoped>
nav {
    background: var(--nav-bg);
    width: 80vw;
    border-radius: 100px;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    padding: 10px;
    box-shadow: 5px 5px 20px #00000080;
    z-index: 10;
    overflow: hidden;
}

.nav-collapsed {
    width: 55px;
    height: 55px;
    left: 0px;
    right: 20px;
    margin-left: auto;
    margin-right: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.nav--bar {
    display: flex;
    justify-content: space-around;
    overflow: hidden;
}

.nav--bar--item {
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
}

.nav--bar--icons {
    height: 30px;
    width: 30px;
    fill: none;
    stroke: var(--primary-2);
}

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    nav {
        width: 40vw;
        border-radius: 100px;
        position: fixed;
        bottom: 20px;
        right: 40px;
        left: auto;
        padding: 10px;
    }

    .nav--bar {
        display: flex;
        justify-content: space-around;
    }

    .nav--bar--item,
    .nav--bar--icons {
        height: 35px;
        width: 35px;
    }
}

@media screen and (min-width: 1024px) and (max-width: 1336px) {
    nav {
        width: 30vw;
        border-radius: 100px;
        position: fixed;
        bottom: 20px;
        right: 40px;
        left: auto;
        padding: 10px;
    }
}

@media screen and (min-width: 1336px) {
    nav {
        width: 20vw;
        border-radius: 100px;
        position: fixed;
        bottom: 20px;
        right: 40px;
        left: auto;
        padding: 10px;
    }
}
</style>