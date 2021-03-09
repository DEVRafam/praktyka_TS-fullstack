<template>
    <button class="ds-scroll" @click="scroll" ref="btn">
        <font-awesome-icon icon="arrow-up" />
    </button>
</template>

<script>
export default {
    data() {
        return {
            closing: false
        };
    },
    mounted() {
        const { classList } = this.$refs.btn;
        window.addEventListener("scroll", () => {
            if (scrollY > 150) {
                classList.add("active");
                if (classList.contains("exit")) classList.remove("exit");
            } else if (scrollY < 150) {
                if (classList.contains("active")) classList.add("exit");
            }
        });
    },
    methods: {
        scroll() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    }
};
</script>
