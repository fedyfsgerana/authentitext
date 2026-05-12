<script setup>
import { computed } from 'vue'

const props = defineProps({
    aiScore: { type: Number, required: true },
    humanScore: { type: Number, required: true },
})

const radius = 54
const circumference = 2 * Math.PI * radius
const aiDash = computed(() => (props.aiScore / 100) * circumference)
const humanDash = computed(() => (props.humanScore / 100) * circumference)
const aiOffset = computed(() => 0)
const humanOffset = computed(() => -(aiDash.value))

const verdict = computed(() => {
    if (props.aiScore >= 80) return { label: 'Dibuat AI', color: '#ef4444' }
    if (props.aiScore >= 60) return { label: 'Kemungkinan AI', color: '#f97316' }
    if (props.aiScore >= 40) return { label: 'Tidak Pasti', color: '#a1a1aa' }
    if (props.aiScore >= 20) return { label: 'Kemungkinan Manusia', color: '#22c55e' }
    return { label: 'Ditulis Manusia', color: '#22c55e' }
})
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <!-- Donut Chart -->
        <div class="relative w-36 h-36">
            <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
                <!-- Background circle -->
                <circle cx="60" cy="60" :r="radius" fill="none" stroke="currentColor" stroke-width="10"
                    class="text-muted" />
                <!-- Human arc -->
                <circle cx="60" cy="60" :r="radius" fill="none" stroke="#22c55e" stroke-width="10"
                    stroke-linecap="round" :stroke-dasharray="`${humanDash} ${circumference}`"
                    :stroke-dashoffset="humanOffset" class="transition-all duration-700" />
                <!-- AI arc -->
                <circle cx="60" cy="60" :r="radius" fill="none" stroke="#ef4444" stroke-width="10"
                    stroke-linecap="round" :stroke-dasharray="`${aiDash} ${circumference}`"
                    :stroke-dashoffset="aiOffset" class="transition-all duration-700" />
            </svg>
            <!-- Center label -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold tabular-nums" :style="{ color: verdict.color }">
                    {{ aiScore }}%
                </span>
                <span class="text-xs text-muted-foreground">AI</span>
            </div>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-destructive" />
                <span class="text-xs text-muted-foreground">AI {{ aiScore }}%</span>
            </div>
            <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span class="text-xs text-muted-foreground">Manusia {{ humanScore }}%</span>
            </div>
        </div>

        <!-- Verdict -->
        <span class="text-xs font-medium px-3 py-1 rounded-full border"
            :style="{ color: verdict.color, borderColor: verdict.color + '40', backgroundColor: verdict.color + '10' }">
            {{ verdict.label }}
        </span>
    </div>
</template>