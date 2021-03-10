<template>
    <div class="auth">
        <Authenticated v-if="authenticated"> </Authenticated>
        <Unlogged v-else> </Unlogged>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deepAuthenticate } from "@/composable/auth/authenticate";
import Unlogged from "./Unlogged.vue";
import Authenticated from "./Authenticated.vue";
//
export default defineComponent({
    components: { Unlogged, Authenticated },
    async setup() {
        const authenticated = await deepAuthenticate();
        //
        return { authenticated };
    }
});
</script>
