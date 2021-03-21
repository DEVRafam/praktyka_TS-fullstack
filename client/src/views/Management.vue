<template>
    <div>
        <Suspense>
            <template #default>
                <OffersManagement></OffersManagement>
            </template>
            <!--  -->
            <template #fallback>
                <Loading></Loading>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OffersManagement from "@/components/offers/management/Management.vue";
import useOffersManagement from "@/composable/offers/useOffersManagement";
//
export default defineComponent({
    components: { OffersManagement },
    computed: {
        NOT_FOUND: () => useOffersManagement.NOT_FOUND.value
    },
    watch: {
        NOT_FOUND(val) {
            if (val) this.$router.push({ path: "/error/not-found" });
        }
    }
});
</script>
