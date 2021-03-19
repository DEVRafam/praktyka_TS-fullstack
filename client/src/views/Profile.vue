<template>
    <div class="profile-wrap">
        <Suspense>
            <template #default>
                <ProfileWrap></ProfileWrap>
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
import useProfile from "@/composable/profile/useProfile";
import ProfileWrap from "@/components/profile/Profile_MAIN.vue";
//
export default defineComponent({
    components: { ProfileWrap },
    computed: {
        NOT_FOUND: () => useProfile.NOT_FOUND.value
    },
    watch: {
        NOT_FOUND(val) {
            if (val) this.$router.push({ path: "/error/not-found" });
        }
    }
});
</script>
