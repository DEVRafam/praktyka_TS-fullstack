<template>
    <section id="offer-data">
        <Header :offer="offer"></Header>
        <div class="img-wrap">
            <Images :offer="offer"></Images>
        </div>
        <!--  -->
        <section id="content">
            <Content :offer="offer"></Content>
        </section>
        <Recommendations :offer="offer"></Recommendations>
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
