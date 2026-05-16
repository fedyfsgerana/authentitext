<script setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps({
    active: { type: Boolean, default: false },
})

onMounted(() => {
    if (!props.active) return

    // Tembak dari kiri
    confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#ffffff'],
        scalar: 0.9,
    })

    // Tembak dari kanan
    confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#ffffff'],
        scalar: 0.9,
    })

    // Tembak tengah kecil setelah delay
    setTimeout(() => {
        confetti({
            particleCount: 30,
            angle: 90,
            spread: 50,
            origin: { x: 0.5, y: 0.6 },
            colors: ['#22c55e', '#ffffff', '#86efac'],
            scalar: 0.7,
            gravity: 0.8,
        })
    }, 300)
})
</script>

<template>
    <div />
</template>