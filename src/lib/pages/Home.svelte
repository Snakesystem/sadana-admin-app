<script lang="ts">
    import CustomChart from "@lib/components/CustomChart.svelte";
    import type { ChartData, ChartOptions } from "chart.js";
  
    // Data untuk Line Chart
    let lineChartData: ChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Pendapatan",
          data: [12, 19, 3, 5, 2],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: true,
        },
      ],
    };
  
    // Data untuk Bar Chart
    let barChartData: ChartData = {
      labels: ["Apple", "Banana", "Orange", "Grapes", "Mango"],
      datasets: [
        {
          label: "Jumlah",
          data: [5, 10, 8, 6, 12],
          backgroundColor: ["red", "yellow", "orange", "purple", "green"],
          borderColor: "rgba(0,0,0,0.5)",
          borderWidth: 1,
        },
      ],
    };
  
    // Opsi Chart
    let chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
</script>

<div class="home-page">
    <div class="d-flex content-home gap-2">
        <h1>Dashboard Statistik</h1>
        <div class="card">
            <div class="flex-row mb-2 card-header">
                <span class="heading">Persediaan (Dapur)</span>
            </div>
            <CustomChart type="line" data={lineChartData} options={chartOptions} />
        </div>
        <div class="card">
            <div class="flex-row mb-2 card-header">
                <span class="heading">Persediaan (Dapur)</span>
            </div>
            <CustomChart type="bar" data={barChartData} options={chartOptions} />
        </div>
    </div>
</div>

<style lang="scss">
    .home-page {
        display: flex;
        gap: 10px;
        padding: 0.6rem;
        flex-wrap: nowrap;
        width: 100%;
        .content-home {
            display: flex;
            flex-direction: column;
            gap: 10px;
            // background-color: salmon;
            flex: 1;
            .card {
                padding: 10px;
                border-radius: 10px;
                background-color: #fff;
                display: flex;

                .card-header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        
    }
</style>