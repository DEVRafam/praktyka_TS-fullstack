<template>
    <div>
        <Suspense>
            <template #default>
                <FollowingMain></FollowingMain>
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
import FollowingMain from "@/components/offers/following/Following.vue";
//
export default defineComponent({
    components: { FollowingMain },
    setup() {
        //
    }
});
</script>
