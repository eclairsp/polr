<template>
    <section>
        <div id="wave-container" class="wave-container">
            <div class="dot" id="d1"></div>
            <div class="dot" id="d2"></div>
            <div class="dot" id="d3"></div>
            <div class="dot" id="d4"></div>
            <div class="dot" id="d5"></div>
            <div class="dot" id="d6"></div>
            <div class="dot" id="d7"></div>
            <div class="dot" id="d8"></div>
            <div class="dot" id="d9"></div>
            <div class="dot" id="d10"></div>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
    width: 100%;
    height: calc(100vh - 106px);
    display: flex;
    justify-content: center;
    align-items: center;
}

#wave-container {
    position: relative;
    height: 36px;
    width: 132px;
    margin-left: -10px;
}
.dot {
    transform-origin: 50% 50%;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    top: 0;
    background-color: var(--primary-1);
    position: absolute;
    animation: vertical-movement 2.5s infinite ease-in-out;
}
#d1 {
    left: 12px;
    animation-delay: -0.3s;
}
#d2 {
    left: 24px;
    animation-delay: -0.6s;
}
#d3 {
    left: 36px;
    animation-delay: -0.9s;
}
#d4 {
    left: 48px;
    animation-delay: -1.2s;
}
#d5 {
    left: 60px;
    animation-delay: -1.5s;
}
#d6 {
    left: 72px;
    animation-delay: -1.8s;
}
#d7 {
    left: 84px;
    animation-delay: -2.1s;
}
#d8 {
    left: 96px;
    animation-delay: -2.4s;
}
#d9 {
    left: 108px;
    animation-delay: -2.7s;
}
#d10 {
    left: 120px;
    animation-delay: -3s;
}

@keyframes vertical-movement {
    0%,
    100% {
        transform: translateY(0%);
    }
    50% {
        transform: translateY(30px);
    }
}
</style>