<template>
    <teleport to="body">
        <div id="modal">
            <div class="overlay" @click="closeModal"></div>
            <div class="modal-card" :class="bodySizeClasses()">
                <button class="close" @click="closeModal">Close</button>
                <!--  -->
                <header class="modal-header">
                    <slot name="header" />
                </header>
                <!--  -->
                <section class="body">
                    <slot name="default"></slot>
                </section>
                <!--  -->
                <footer class="modal-footer">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, getCurrentInstance, onBeforeMount, onBeforeUnmount } from "vue";
import useKeydown from "@/composable/useKeydown";
//
export default defineComponent({
    inheritAttrs: false,
    props: {
        size: {
            type: String as PropType<string>
        },
        height: {
            type: String as PropType<string>
        },
        modelValue: {
            required: false
        }
    },
    components: {},
    setup(props, { emit }) {
        //
        const bodySizeClasses = (): string[] => {
            const { size, height } = props;
            const i = getCurrentInstance();
            return [
                `hor-${size}`, //
                `ver-${height}`,
                `${i?.attrs.scrollable !== undefined ? "scrollable" : ""}`
            ];
        };
        const closeModal = () => {
            emit("update:modelValue", null);
            emit("close", null);
        };
        //
        // close modal by pressing ESC
        //
        useKeydown([
            {
                key: "Escape",
                fn: closeModal
            }
        ]);
        //
        // blcok scrolling
        //
        let initScrollY: number;
        onBeforeMount(() => {
            initScrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${initScrollY}px`;
        });
        onBeforeUnmount(() => {
            document.body.style.position = "relative";
            document.body.style.top = `-${0}px`;
            scrollTo(0, initScrollY);
        });
        //
        return { bodySizeClasses, closeModal };
    }
});
</script>
