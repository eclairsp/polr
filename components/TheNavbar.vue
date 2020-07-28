<template>
    <nav>
        <ul class="nav--bar">
            <nuxt-link to="/">
                <li class="nav--bar--item">
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
                </li>
            </nuxt-link>
            <nuxt-link :to="{name: 'search'}">
                <li class="actions--item">
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
                </li>
            </nuxt-link>
            <nuxt-link :to="{ name: 'add'}">
                <li class="actions--item">
                    <svg
                        class="nav--bar--icons"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <title>Add</title>
                        <line
                            x1="256"
                            y1="112"
                            x2="256"
                            y2="400"
                            style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                        />
                        <line
                            x1="400"
                            y1="256"
                            x2="112"
                            y2="256"
                            style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                        />
                    </svg>
                </li>
            </nuxt-link>
        </ul>
    </nav>
</template>

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
    box-shadow: 0 10px 20px var(--shadow), 0 6px 6px var(--shadow);
}

.nav--bar {
    display: flex;
    justify-content: space-around;
}

.nav--bar--items {
    font-size: 2em;
}

.nav--bar--icons {
    height: 35px;
    width: 35px;
    fill: none;
    stroke: var(--primary-2);
}

@media screen and (min-device-width: 1200px) and (-webkit-min-device-pixel-ratio: 1) {
    nav {
        width: 20vw;
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

    .nav--bar--items {
        font-size: 2em;
    }

    .nav--bar--icons {
        height: 30px;
        width: 30px;
    }
}
</style>