<template>
    <section class="chart-wrap">
        <!--  -->
        <canvas :id="`${id}-char`" width="400" height="400" :key="refresh"></canvas>
        <!--  -->
        <button @click="currentType = 'bar'" :class="currentType === 'bar' ? 'active' : 'unactive'">
            <font-awesome-icon icon="chart-bar"></font-awesome-icon>
        </button>
        <button @click="currentType = 'pie'" :class="currentType === 'pie' ? 'active' : 'unactive'">
            <font-awesome-icon icon="chart-pie"></font-awesome-icon>
        </button>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart } from "chart.js";
import { Profile } from "@/@types/user";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        },
        type: {
            type: String as PropType<"pie" | "bar">,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        id: {
            type: String as PropType<string>,
            required: true
        },
        label: {
            type: String as PropType<string>,
            required: true
        },
        colors: {
            type: String as PropType<"review" | "offer">,
            default: "offer"
        }
    },
    data() {
        return {
            currentType: this.type,
            refresh: 0
        };
    },
    watch: {
        currentType() {
            setTimeout(this.printChar, 0);
            this.refresh++;
        }
    },
    mounted() {
        this.printChar();
    },
    methods: {
        printChar() {
            const offersColor = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#ee5253", "#0abde3", "#10ac84", "#f368e0", "#ff9f43"];
            const reviewsColor = ["#ee5253", "#ff6b6b", "#ff9f43", "#1dd1a1", "#10ac84"];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ctx = ((document.getElementById(`${this.id}-char`) as unknown) as any).getContext("2d");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            new Chart(ctx, {
                type: this.currentType,
                data: {
                    labels: Object.keys(this.data),
                    datasets: [
                        {
                            label: this.label,
                            data: Object.values(this.data as number[]),
                            backgroundColor: this.colors === "offer" ? offersColor : reviewsColor,
                            borderColor: this.colors === "offer" ? offersColor : reviewsColor,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: this.currentType === "pie"
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            });
        }
    }
});
</script>
