<template>
    <div>
        <Suspense>
            <FollowingMain></FollowingMain>
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
