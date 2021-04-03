<template>
    <span class="length-notification" :class="{ limit: limitClass }">
        {{ `${length}/${limit}` }}
    </span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
import { CreateOfferBody } from "@/@types/Offer";
import { Restrictions } from "@/composable/offers/useCreateOffer";
import { Restriction } from "@/@types/general";
//
export default defineComponent({
    props: {
        propname: {
            type: String as PropType<keyof CreateOfferBody>
        },
        value: {
            type: String as PropType<string>
        },
        restrictions: {
            type: Object as PropType<Restriction>
        }
    },
    setup(props, { emit }) {
        if (props.propname) {
            // eslint-disable-next-line vue/no-setup-props-destructure
            const { propname } = props;
            const { data, RESTRICTIONS } = useCreateOffer;
            const { max, min } = RESTRICTIONS[propname as keyof Restrictions] as Restriction;
            //
            const length = computed<number>(() => (data.value[propname] as string).length);
            const limit = computed<number>(() => (length.value < min ? min : max));
            const limitClass = computed<boolean>(() => length.value < min || length.value > max);
            //
            watch(length, val => {
                if (val > max) (data.value[propname] as string) = (data.value[propname] as string).slice(0, max);
            });
            //
            return { length, limit, limitClass };
        }
        //
        else if (props.value !== undefined && props.restrictions !== undefined) {
            // eslint-disable-next-line vue/no-setup-props-destructure
            const { max, min } = props.restrictions;
            //
            const length = computed<number>(() => (props.value as string).length);
            const limit = computed<number>(() => (length.value < min ? min : max));
            const limitClass = computed<boolean>(() => length.value < min || length.value > max);
            //
            watch(length, val => {
                if (val > max) emit("change-val", (props.value as string).slice(0, max));
            });
            //
            return { length, limit, limitClass };
        }
    }
});
</script>
