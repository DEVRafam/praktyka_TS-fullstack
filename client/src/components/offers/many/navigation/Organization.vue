<template>
    <section id="organization">
        <div class="right">
            <input type="text" placeholder="Search for an offer..." v-model="search" v-if="renderProperInput" />
            <button :class="search ? 'dark' : 'light'" @click="search = ''">Reset</button>
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
import { defineComponent, onBeforeUnmount, ref } from "vue";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
//
export default defineComponent({
    setup() {
        const { layout, order, category, search } = useOffersNavigation;
        onBeforeUnmount(() => {
            order.value = "newest";
            category.value = "";
            search.value = "";
        });
        // serach.value can be inherited from url, and v-model directive doesn't want to
        // recognize this behaviour propery, so i decided to prevent rendering input
        const renderProperInput = ref<boolean>(false);
        setTimeout(() => (renderProperInput.value = true), 1);

        return { layout, order, search, renderProperInput };
    },
    computed: {
        isClearAvailable(): boolean {
            const { category, order, search } = this.$route.query;
            return !!(category || order || search);
        },
        isApplyAvailable(): boolean {
            const { category: qc, order: qo, search: qs } = this.$route.query; //q- query
            const { category: nc, order: no, search: ns } = useOffersNavigation; //n- new
            if (qo === undefined && no.value === "newest" && !nc.value) return false;
            return !!((nc.value && qc != nc.value) || qo != no.value || ((qs || ns.value) && qs != ns.value));
        }
    },
    methods: {
        applyFilter() {
            const { category, order, search, categorySectionDevelop } = useOffersNavigation;
            const routerParams = {
                path: "/",
                query: {
                    category: category.value,
                    order: order.value,
                    search: search.value
                }
            };
            categorySectionDevelop.value = false;
            if (!category.value) {
                // eslint-disable-next-line
                delete (routerParams.query as any).category;
            }
            if (!order.value) {
                // eslint-disable-next-line
                delete (routerParams.query as any).order;
            }
            if (!search.value) {
                // eslint-disable-next-line
                delete (routerParams.query as any).search;
            }
            this.$router.push(routerParams);
        },
        clearFilters() {
            const { category, order, search } = useOffersNavigation;
            //
            category.value = "";
            order.value = "newest";
            search.value = "";
            //
            this.$router.push({
                path: "/",
                query: {}
            });
        }
    }
});
</script>
