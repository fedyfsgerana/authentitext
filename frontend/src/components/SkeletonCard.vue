<script setup>
defineProps({
    lines: { type: Number, default: 3 },
    showHeader: { type: Boolean, default: true },
})
</script>

<template>
    <div class="rounded-2xl border border-border bg-background p-5 animate-pulse">
        <!-- Header -->
        <div v-if="showHeader" class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-muted shimmer" />
            <div class="h-4 w-32 bg-muted rounded-lg shimmer" />
        </div>
        <!-- Lines -->
        <div class="space-y-2.5">
            <div v-for="i in lines" :key="i" class="h-3 bg-muted rounded-lg shimmer"
                :style="{ width: i === lines ? '60%' : '100%' }" />
        </div>
    </div>
</template>