<template>
    <section id="offer-data">
        <Header :offer="offer"></Header>
        <Images :offer="offer"></Images>
        <!--  -->
        <div class="content">
            <Content :offer="offer"></Content>
            <Recommendations :offer="offer"></Recommendations>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
//
import Content from "./Content.vue";
import Images from "./preview_images/Images.vue";
import Header from "./Header.vue";
import Recommendations from "./recommendations/Recommendations.vue";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    components: { Header, Images, Content, Recommendations }
});
</script>
