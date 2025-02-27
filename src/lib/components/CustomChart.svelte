<script lang="ts">
    import type { ChartData, ChartOptions, ChartConfiguration, ChartType } from "chart.js";
    import { Chart, registerables } from "chart.js";
    import { onDestroy, onMount } from "svelte";

    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;

    // **🔹 Registrasi semua komponen yang dibutuhkan**
    Chart.register(...registerables);

    // Props untuk menyesuaikan Chart
    export let type: ChartType = "bar";
    export let data: ChartData<ChartType> = { labels: [], datasets: [] };
    export let options: ChartOptions = { 
        responsive: true, 
        maintainAspectRatio: false // **🔹 Jangan pakai aspek rasio bawaan** 
    };

    onMount(() => {
        if (canvas) {
            const config: ChartConfiguration<ChartType> = { type, data, options };
            chart = new Chart(canvas, config);
        }
    });

    onDestroy(() => {
        chart?.destroy();
    });
</script>

<!-- **🔹 Bungkus canvas dalam div agar tidak terlalu besar** -->
<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart-container {
        width: 100%;
        max-width: 600px;  /* **🔹 Batasi lebar maksimum agar tidak membesar terlalu besar** */
        height: 400px; /* **🔹 Atur tinggi agar tidak terlalu besar** */
        margin: auto; /* **🔹 Agar tetap berada di tengah** */
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>
