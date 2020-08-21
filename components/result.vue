<template>
    <transition name="fade" mode="out-in">
        <figure id="result">
            <figcaption>
                <h1 class="result--title">Results</h1>
                <ul class="result--list">
                    <li class="result--item" v-for="(color, index) in optionsColors" :key="color">
                        <div class="result--box" :style="{background: color}"></div>
                        {{options[index].option}} - {{options[index].vote}}
                    </li>
                </ul>
            </figcaption>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="chart"
                width="100%"
                :height="options.length * 40"
                aria-labelledby="title"
                role="img"
            >
                <title id="title">A bart chart showing information</title>
                <g v-for="(data, index) in options" class="bar" :key="data.option">
                    <rect
                        stroke-alignment="inside"
                        :fill="optionsColors[index]"
                        :width="`${getwidth(data.vote)}%`"
                        height="30"
                        :y="5 + 40*index"
                        x="2"
                        rx="5"
                    />
                    <text
                        class="bar--text"
                        x="10"
                        :y="25 + 40*index"
                    >{{data.option}} - {{data.vote}} votes</text>
                </g>
            </svg>
        </figure>
    </transition>
</template>

<script>
import loading from "./loading";

export default {
    props: {
        options: Array,
    },
    components: {
        loading,
    },
    methods: {
        getwidth: function (vote) {
            const width = (vote / this.max) * 100 - 1;
            if (width > 0) {
                return width;
            } else {
                return 0;
            }
        },
    },
    computed: {
        optionsColors: function () {
            // Get a random hue value 0-360
            const randHue = () => Math.floor(360 * Math.random());

            // Get a random value for Saturation and Lightness
            const randSaturation = () => Math.random() * (80 - 20) + 20;

            // Get a random value for Lightness
            const randLightness = () => Math.random() * (60 - 40) + 40;

            const colors = this.options.map((_, index) => {
                return (
                    "hsl(" +
                    randHue() +
                    "," +
                    randSaturation() +
                    "%," +
                    randLightness() +
                    "%)"
                );
            });
            return colors;
        },
        max: function () {
            return Math.max(...this.options.map((option) => option.vote), 0);
        },
        totalVotes: function () {
            let totalVotes = 0;
            this.options.forEach((element) => (totalVotes += element.vote));
            return totalVotes;
        },
    },
};
</script>

<style scoped>
.result--title {
    font-size: 2em;
    margin: 5px 0;
}

figure {
    padding: 10px;
    height: 100%;
    background: var(--card-bg);
    border-radius: 10px;
    margin: 0 10px;
}

.result--list {
    margin: 5px 0;
}

.result--item {
    display: flex;
    margin: 5px 0;
    justify-content: flex-start;
    align-items: center;
}

.result--box {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: red;
    margin: 0 5px;
}

.bar {
    font-family: Helvetica, sans-serif;
    -webkit-transition: 0.5s all;
    transition: 0.5s all;
}

.bar rect {
    transition: 1s all;
    stroke-width: 3px;
    paint-order: stroke;
    stroke: var(--text-svg);
}

.bar--text {
    fill: var(--text-svg);
}
</style>