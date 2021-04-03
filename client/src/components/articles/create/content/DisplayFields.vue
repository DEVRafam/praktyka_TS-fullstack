<template>
    <section id="fields">
        <VueDraggableNext class="dragArea list-group w-full" :list="data.content" :key="data.content.length">
            <template v-for="(field, index) in data.content">
                <!--  -->
                <Header v-if="field.type === 'header'" :key="index" :field="field" :index="index"></Header>
                <Text v-if="field.type === 'text'" :key="index" :field="field" :index="index"></Text>
                <Image v-if="field.type === 'image'" :key="index" :field="field" :index="index"></Image>
                <List v-if="field.type === 'list'" :key="index" :field="field" :index="index"></List>
                <MentionOffer v-if="field.type === 'mention_offer'" :key="index" :field="field" :index="index"></MentionOffer>
                <!--  -->
            </template>
        </VueDraggableNext>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateArticle from "@/composable/articles/useCreateArticles";
//
import { VueDraggableNext } from "vue-draggable-next";
//
import Header from "./fields/Header.vue";
import Text from "./fields/Text.vue";
import Image from "./fields/Image.vue";
import List from "./fields/list/List.vue";
import MentionOffer from "./fields/mention_offer/Mention_offer.vue";
//
export default defineComponent({
    components: { VueDraggableNext, Header, Text, Image, List, MentionOffer },
    setup() {
        const { data } = useCreateArticle;
        //
        return { data };
    }
});
</script>
