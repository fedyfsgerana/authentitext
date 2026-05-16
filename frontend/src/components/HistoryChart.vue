<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const props = defineProps({
    history: { type: Array, default: () => [] },
})

const chartData = computed(() => {
    const sorted = [...props.history].reverse().slice(-10)

    const labels = sorted.map((item, i) => {
        return new Date(item.savedAt).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short',
        })
    })

    return {
        labels,
        datasets: [
            {
                label: 'Skor AI (%)',
                data: sorted.map(i => i.ai_probability),
                borderColor: 'hsl(0, 84.2%, 60.2%)',
                backgroundColor: 'hsl(0, 84.2%, 60.2%, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: 'hsl(0, 84.2%, 60.2%)',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Skor Manusia (%)',
                data: sorted.map(i => i.human_probability),
                borderColor: 'hsl(142, 71%, 45%)',
                backgroundColor: 'hsl(142, 71%, 45%, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: 'hsl(142, 71%, 45%)',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
            },
        ],
    }
})

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'hsl(240, 10%, 8%)',
            titleColor: 'hsl(0, 0%, 98%)',
            bodyColor: 'hsl(240, 5%, 64%)',
            borderColor: 'hsl(240, 3.7%, 20%)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            callbacks: {
                label(context) {
                    return ` ${context.dataset.label}: ${context.parsed.y}%`
                },
            },
        },
    },
    scales: {
        x: {
            grid: {
                color: 'hsl(240, 5.9%, 90%, 0.5)',
                drawBorder: false,
            },
            ticks: {
                color: 'hsl(240, 3.8%, 46%)',
                font: { size: 11 },
            },
        },
        y: {
            min: 0,
            max: 100,
            grid: {
                color: 'hsl(240, 5.9%, 90%, 0.5)',
                drawBorder: false,
            },
            ticks: {
                color: 'hsl(240, 3.8%, 46%)',
                font: { size: 11 },
                callback: val => val + '%',
                stepSize: 25,
            },
        },
    },
}))
</script>

<template>
    <div>
        <!-- Legend manual -->
        <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1.5">
                <div class="w-3 h-3 rounded-full bg-destructive" />
                <span class="text-xs text-muted-foreground">Skor AI</span>
            </div>
            <div class="flex items-center gap-1.5">
                <div class="w-3 h-3 rounded-full bg-green-500" />
                <span class="text-xs text-muted-foreground">Skor Manusia</span>
            </div>
            <span class="text-xs text-muted-foreground ml-auto">
                {{ Math.min(history.length, 10) }} analisis terakhir
            </span>
        </div>

        <!-- Chart -->
        <div class="h-48">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>