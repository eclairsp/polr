<template>
    <section class="main">
        <div class="container">
            <Header />
            <Navbar />
            <svg class="svg--wave" viewBox="0 0 120 28">
                <defs>
                    <path
                        id="wave"
                        d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
                    />
                </defs>
                <filter id="sharpBlur">
                    <feGaussianBlur stdDeviation="10" />
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
                    />
                    <feComposite in2="SourceGraphic" operator="in" />
                </filter>

                <use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2" />
                <use id="wave2" class="wave" xlink:href="#wave" x="0" y="0" />
                <use id="wave1" class="wave" xlink:href="#wave" x="0" y="1" />
            </svg>
            <div class="nuxt--container">
                <Nuxt />
            </div>
        </div>
    </section>
</template>

<script>
import TheHeader from "../components/TheHeader";
import TheNavbar from "../components/TheNavbar";
export default {
    components: {
        Header: TheHeader,
        Navbar: TheNavbar,
    },
};
</script>

<style>
.main {
    background: var(--bg);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    z-index: 5;
}

.nuxt--container {
    background: var(--bg-blur);
    backdrop-filter: blur(1px);
    padding: 10px;
    min-height: calc(100vh - 83px);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 20px;
}

.svg--wave {
    position: fixed;
    bottom: 50px;
    left: 0;
    transform: scale(9);
    z-index: -1;
}
.wave {
    width: 200%;
    animation: wave 3s linear infinite;
    fill: var(--primary-1);
    opacity: 1;
}

#wave2 {
    animation-duration: 5s;
    opacity: 0.7;
}

#wave3 {
    animation-duration: 7s;
    opacity: 0.5;
}

@keyframes wave {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
}

@media screen and (min-width: 768px) and (max-width: 1025px) {
    .container {
        width: 90vw;
    }

    .nuxt--container {
        padding: 30px;
    }

    .svg--wave {
        bottom: 0;
        transform: scale(5);
    }
}

@media screen and (min-width: 1025px) and (max-width: 1336px) {
    .container {
        width: 70vw;
    }

    .svg--wave {
        transform: scale(4);
    }
}

@media screen and (min-width: 1336px) {
    .container {
        width: 50vw;
    }

    .svg--wave {
        transform: scale(2);
    }
}
</style>