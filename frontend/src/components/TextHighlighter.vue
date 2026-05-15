<script setup>
import { computed } from 'vue'

const props = defineProps({
    text: { type: String, required: true },
    highlights: { type: Array, default: () => [] },
})

const segments = computed(() => {
    if (!props.highlights?.length) {
        return [{ text: props.text, isAi: false }]
    }

    let result = []
    let remaining = props.text

    // Kumpulkan semua frasa AI yang valid
    const phrases = props.highlights
        .map(h => h.text?.trim())
        .filter(t => t && t.length > 3 && props.text.includes(t))

    if (!phrases.length) {
        return [{ text: props.text, isAi: false }]
    }

    // Build segments
    let cursor = 0
    const textLower = props.text.toLowerCase()

    // Sort by position of occurrence
    const positioned = phrases
        .map(phrase => ({
            phrase,
            index: textLower.indexOf(phrase.toLowerCase()),
        }))
        .filter(p => p.index !== -1)
        .sort((a, b) => a.index - b.index)

    for (const { phrase, index } of positioned) {
        if (index < cursor) continue

        // Text sebelum highlight
        if (index > cursor) {
            result.push({ text: props.text.slice(cursor, index), isAi: false })
        }

        // Highlight AI
        result.push({ text: props.text.slice(index, index + phrase.length), isAi: true })
        cursor = index + phrase.length
    }

    // Sisa teks
    if (cursor < props.text.length) {
        result.push({ text: props.text.slice(cursor), isAi: false })
    }

    return result.filter(s => s.text.length > 0)
})
</script>

<template>
    <p class="text-sm leading-8 tracking-wide">
        <span v-for="(segment, i) in segments" :key="i" class="transition-all duration-200" :class="segment.isAi
            ? 'bg-destructive/15 text-destructive dark:bg-destructive/25 dark:text-red-400 rounded px-0.5 border-b-2 border-destructive/50 font-medium cursor-help'
            : 'text-foreground/80'" :title="segment.isAi ? 'Terindikasi ditulis oleh AI' : ''">{{ segment.text }}</span>
    </p>
</template>