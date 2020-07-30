<template>
    <div class="theme">
        <label for="check">
            <slot></slot>
        </label>
        <div class="theme--toggle">
            <input
                id="check"
                aria-label="Switch themes"
                type="checkbox"
                name="theme--switcher"
                class="theme--check--switch"
                @click="toggle"
                v-model="flag"
            />
            <span class="ball"></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
        };
    },
    methods: {
        toggle: function () {
            this.flag = !this.flag;
            this.$emit("toggled");
        },
    },
};
</script>

<style scoped>
.theme {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

label {
    font-size: 1.75em;
    margin: 0 0 10px 0;
    color: var(--text-color-headline);
}

.theme--toggle {
    position: relative;
    background: var(--primary-3);
    padding: 5px;
    height: max-content;
    width: 80px;
    border-radius: 100px;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: 0.5s background;
}

.theme--check--switch {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 100;
    cursor: pointer;
}

.ball {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: var(--primary-2);
    transition: 0.5s transform;
}

.theme--check--switch:checked ~ .ball {
    transform: translateX(40px);
}
</style>