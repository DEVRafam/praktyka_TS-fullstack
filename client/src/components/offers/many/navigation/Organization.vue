<template>
    <section id="organization">
        <div class="right">
            <input type="text" placeholder="Search for an offer..." />
            <button class="dark">Search</button>
        </div>
        <!--  -->
        <div class="left">
            <select v-model="order">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="cheapest">Cheapest</option>
                <option value="most-expensive">Most expensive</option>
            </select>
            <!--  -->
            <button @click="applyFilter" :class="isApplyAvailable ? 'dark' : 'light'">Apply</button>
            <button @click="clearFilters" :class="isClearAvailable ? 'dark' : 'light'">Clear</button>
            <!--  -->
            <button @click="layout = 'GRID'" :class="layout === 'GRID' ? 'dark' : 'light'" class="layout">
                <font-awesome-icon icon="th-large" />
            </button>
            <button @click="layout = 'LIST'" :class="layout === 'LIST' ? 'dark' : 'light'" class="layout">
                <font-awesome-icon icon="bars" />
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
//
export default defineComponent({
    setup() {
        const { layout, order, category } = useOffersNavigation;
        onBeforeUnmount(() => {
            order.value = "newest";
            category.value = "";
        });
        //
        return { layout, order };
    },
    computed: {
        isClearAvailable(): boolean {
            const { category, order } = this.$route.query;
            return !!(category || order);
        },
        isApplyAvailable(): boolean {
            const { category: qc, order: qo } = this.$route.query; //q- query
            const { category: nc, order: no } = useOffersNavigation; //n- new
            if (qo === undefined && no.value === "newest" && !nc.value) return false;
            return !!((nc.value && qc != nc.value) || qo != no.value);
        }
    },
    methods: {
        applyFilter() {
            const { category, order } = useOffersNavigation;
            const routerParams = {
                path: "/",
                query: {
                    category: category.value,
                    order: order.value
                }
            };
            if (!category.value) {
                // eslint-disable-next-line
                delete (routerParams.query as any).category;
            }
            if (!order.value) {
                // eslint-disable-next-line
                delete (routerParams.query as any).order;
            }
            this.$router.push(routerParams);
        },
        clearFilters() {
            const { category, order } = useOffersNavigation;
            category.value = "";
            order.value = "newest";
            this.$router.push({
                path: "/",
                query: {}
            });
        }
    }
});
</script>
