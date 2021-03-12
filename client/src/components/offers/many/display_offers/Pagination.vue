<template>
    <div class="pagination">
        <span class="field" v-for="page in pagesAmount" :key="page" @click="goToPage(page)" :class="{ active: ($route.query.page || 1) == page }">{{ page }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//
export default defineComponent({
    props: {
        pagesAmount: Number as PropType<number>
    },
    methods: {
        goToPage(page: number) {
            scrollTo(0, 0);
            this.$router.push({
                path: "/",
                query: {
                    order: this.$route.query.order,
                    category: this.$route.query.category,
                    page: page
                }
            });
        }
    }
});
</script>
