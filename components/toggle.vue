<template>
    <div class="theme">
        <label :for="id">
            <slot></slot>
        </label>
        <div :class="{'theme--toggle': true, false: !flag, true: flag}">
            <input
                :id="id"
                aria-label="Switch themes"
                type="checkbox"
                name="theme--switcher"
                class="theme--check--switch"
                @click="toggle"
                v-model="flag"
            />
            <section class="ball"></section>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
    },
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
    margin: 10px 0 10px 0;
    color: var(--text-color-headline);
}

.theme--toggle {
    position: relative;
    background: var(--primary-3);
    padding: 5px;
    height: max-content;
    width: 60px;
    border-radius: 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: 0.5s transform;
    background: var(--primary-3);
}

.false {
    background: var(--error);
}

.true {
    background: var(--primary-2);
}

.theme--check--switch:checked ~ .ball {
    transform: translateX(30px);
}
</style>