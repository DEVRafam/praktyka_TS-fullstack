<template>
    <span :class="generateClass" class="length-notification" v-html="notificationMessage"> </span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Restriction } from "@/@types/general";
//
export default defineComponent({
    props: {
        value: {
            type: String as PropType<string>,
            required: true
        },
        restrictions: {
            type: Object as PropType<Restriction>,
            required: true
        }
    },
    setup(props) {
        const generateClass = computed<string>(() => {
            const { length } = props.value;
            const { max, min } = props.restrictions;
            if (length >= max || length <= min) return "limit";
            return "";
        });
        const notificationMessage = computed<string>(() => {
            const { length } = props.value;
            const { max, min } = props.restrictions;
            const isBelow = length <= min;
            const unit = isBelow ? min : max;
            const message = isBelow ? "Wording must be at least" : "Wording can be maximum";
            //
            return `
                <span>${message}</span>
                <span class='color'>${props.value.length}/${unit}</span>
                <span>characters long</span>
                `;
        });
        //
        return { generateClass, notificationMessage };
    }
});
</script>
