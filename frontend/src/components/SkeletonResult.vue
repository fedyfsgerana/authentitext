<script setup>
</script>

<template>
    <div class="space-y-5 animate-pulse">

        <!-- Verdict Hero Skeleton -->
        <div class="rounded-3xl border border-border p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row items-center gap-6">
                <div class="w-20 h-20 rounded-2xl bg-muted shimmer shrink-0" />
                <div class="flex-1 space-y-3 text-center sm:text-left">
                    <div class="h-5 w-24 bg-muted rounded-full shimmer mx-auto sm:mx-0" />
                    <div class="h-8 w-48 bg-muted rounded-xl shimmer mx-auto sm:mx-0" />
                    <div class="h-3 w-36 bg-muted rounded-lg shimmer mx-auto sm:mx-0" />
                </div>
                <div class="flex sm:flex-col gap-3 shrink-0">
                    <div class="w-20 h-14 rounded-xl bg-muted shimmer" />
                    <div class="w-20 h-14 rounded-xl bg-muted shimmer" />
                </div>
            </div>
        </div>

        <!-- Chart + Score Skeleton -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div class="sm:col-span-2 rounded-2xl border border-border p-6 flex items-center justify-center">
                <div class="w-36 h-36 rounded-full bg-muted shimmer" />
            </div>
            <div class="sm:col-span-3 flex flex-col gap-3">
                <div class="rounded-2xl border border-border p-5 flex-1">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 rounded-lg bg-muted shimmer" />
                            <div class="h-4 w-28 bg-muted rounded shimmer" />
                        </div>
                        <div class="h-8 w-14 bg-muted rounded shimmer" />
                    </div>
                    <div class="h-3 bg-muted rounded-full shimmer" />
                </div>
                <div class="rounded-2xl border border-border p-5 flex-1">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 rounded-lg bg-muted shimmer" />
                            <div class="h-4 w-28 bg-muted rounded shimmer" />
                        </div>
                        <div class="h-8 w-14 bg-muted rounded shimmer" />
                    </div>
                    <div class="h-3 bg-muted rounded-full shimmer" />
                </div>
                <div class="rounded-2xl border border-border p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 rounded-lg bg-muted shimmer" />
                            <div class="h-4 w-32 bg-muted rounded shimmer" />
                        </div>
                        <div class="h-6 w-16 bg-muted rounded-full shimmer" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Ringkasan Skeleton -->
        <div class="rounded-2xl border border-border p-5">
            <div class="flex items-center gap-2 mb-4">
                <div class="w-5 h-5 rounded bg-muted shimmer" />
                <div class="h-4 w-32 bg-muted rounded shimmer" />
            </div>
            <div class="space-y-2">
                <div class="h-3 bg-muted rounded shimmer" />
                <div class="h-3 bg-muted rounded shimmer" />
                <div class="h-3 w-3/4 bg-muted rounded shimmer" />
            </div>
        </div>

        <!-- Indikator Skeleton -->
        <div class="rounded-2xl border border-border p-5">
            <div class="flex items-center gap-2 mb-4">
                <div class="w-5 h-5 rounded bg-muted shimmer" />
                <div class="h-4 w-28 bg-muted rounded shimmer" />
            </div>
            <div class="space-y-3">
                <div v-for="i in 2" :key="i" class="p-3.5 rounded-xl bg-muted/40 space-y-2">
                    <div class="h-3 w-3/4 bg-muted rounded shimmer" />
                    <div class="h-3 bg-muted rounded shimmer" />
                </div>
            </div>
        </div>

    </div>
</template>