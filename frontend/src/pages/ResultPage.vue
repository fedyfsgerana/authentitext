<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Bot, User, ArrowLeft, RotateCcw, Clock, CheckCircle, AlertCircle, Minus, Download, FileJson } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import ScoreChart from '@/components/ScoreChart.vue'

const router = useRouter()
const store = useAnalysisStore()
const { exportPDF, exportJSON } = useExport()
const { toast } = useToast()

const result = computed(() => store.result)

onMounted(() => {
    if (!result.value) router.push('/analyze')
})

const verdictConfig = computed(() => {
    if (!result.value) return {}
    const ai = result.value.ai_probability
    if (ai >= 80) return { label: 'Dibuat AI', variant: 'destructive', icon: Bot, color: 'text-destructive', bg: 'bg-destructive/10' }
    if (ai >= 60) return { label: 'Kemungkinan AI', variant: 'destructive', icon: Bot, color: 'text-destructive', bg: 'bg-destructive/10' }
    if (ai >= 40) return { label: 'Tidak Pasti', variant: 'secondary', icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' }
    if (ai >= 20) return { label: 'Kemungkinan Manusia', variant: 'default', icon: User, color: 'text-green-500', bg: 'bg-green-500/10' }
    return { label: 'Ditulis Manusia', variant: 'default', icon: User, color: 'text-green-500', bg: 'bg-green-500/10' }
})

const confidenceIcon = computed(() => {
    if (!result.value) return Minus
    if (result.value.confidence === 'Tinggi') return CheckCircle
    if (result.value.confidence === 'Sedang') return Minus
    return AlertCircle
})

function handleExportPDF() {
    exportPDF(result.value)
    toast({ title: 'PDF Diunduh', description: 'Laporan berhasil disimpan', type: 'success' })
}

function handleExportJSON() {
    exportJSON(result.value)
    toast({ title: 'JSON Diunduh', description: 'Data berhasil diekspor', type: 'success' })
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
                    <div
                        class="w-6 h-6 rounded-md bg-primary flex items-center justify-center transition-transform hover:scale-110">
                        <Bot class="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span class="font-semibold text-sm">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm" @click="router.push('/history')">
                        Riwayat
                    </Button>
                </div>
            </div>
        </nav>

        <main v-if="result" class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6"
                @click="router.push('/analyze')">
                <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Analisis Baru
            </button>

            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 transition-transform hover:scale-105"
                    :class="verdictConfig.bg">
                    <component :is="verdictConfig.icon" class="w-8 h-8 sm:w-9 sm:h-9" :class="verdictConfig.color" />
                </div>
                <div class="mb-3">
                    <Badge :variant="verdictConfig.variant" class="text-sm px-4 py-1">
                        {{ verdictConfig.label }}
                    </Badge>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Analisis Selesai</h1>
                <div class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Clock class="w-3 h-3" />
                    {{ formatDate(result.analyzedAt) }}
                </div>
            </div>

            <!-- Chart + Skor -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <!-- Donut Chart -->
                <Card class="border-border card-hover sm:col-span-1">
                    <CardContent class="p-5 flex items-center justify-center">
                        <ScoreChart :ai-score="result.ai_probability" :human-score="result.human_probability" />
                    </CardContent>
                </Card>

                <!-- Skor Detail -->
                <div class="sm:col-span-2 grid grid-cols-1 gap-3">
                    <Card class="border-border card-hover-destructive group">
                        <CardContent class="p-4 sm:p-5">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2">
                                    <Bot class="w-4 h-4 text-destructive" />
                                    <span class="text-sm font-medium text-destructive">AI</span>
                                </div>
                                <span class="text-2xl font-bold tabular-nums">{{ result.ai_probability }}%</span>
                            </div>
                            <div class="h-2.5 bg-muted rounded-full overflow-hidden">
                                <div class="h-full bg-destructive rounded-full transition-all duration-700"
                                    :style="{ width: result.ai_probability + '%' }" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card class="border-border card-hover-green group">
                        <CardContent class="p-4 sm:p-5">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2">
                                    <User class="w-4 h-4 text-green-500" />
                                    <span class="text-sm font-medium text-green-500">Manusia</span>
                                </div>
                                <span class="text-2xl font-bold tabular-nums">{{ result.human_probability }}%</span>
                            </div>
                            <div class="h-2.5 bg-muted rounded-full overflow-hidden">
                                <div class="h-full bg-green-500 rounded-full transition-all duration-700"
                                    :style="{ width: result.human_probability + '%' }" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- Kepercayaan -->
            <Card class="mb-5 sm:mb-6 border-border card-hover group">
                <CardContent class="p-4 sm:p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <component :is="confidenceIcon"
                                class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span class="text-sm font-medium">Tingkat Kepercayaan</span>
                        </div>
                        <Badge variant="outline" class="text-xs">{{ result.confidence }}</Badge>
                    </div>
                </CardContent>
            </Card>

            <!-- Ringkasan -->
            <Card class="mb-5 sm:mb-6 border-border card-hover-primary">
                <CardHeader class="pb-3 px-4 sm:px-6">
                    <CardTitle class="text-sm font-medium">Ringkasan Analisis</CardTitle>
                </CardHeader>
                <CardContent class="pt-0 px-4 sm:px-6">
                    <p class="text-sm text-muted-foreground leading-relaxed">{{ result.summary }}</p>
                </CardContent>
            </Card>

            <!-- Indikator Utama -->
            <Card v-if="result.highlights && result.highlights.length" class="mb-6 sm:mb-8 border-border">
                <CardHeader class="pb-3 px-4 sm:px-6">
                    <CardTitle class="text-sm font-medium">Indikator Utama</CardTitle>
                </CardHeader>
                <CardContent class="pt-0 px-4 sm:px-6 space-y-3">
                    <div v-for="(h, i) in result.highlights" :key="i"
                        class="p-3 rounded-md bg-muted/40 border border-border transition-all duration-200 hover:bg-muted/70 hover:border-border/60">
                        <p class="text-xs font-medium mb-1 italic">"{{ h.text }}"</p>
                        <p class="text-xs text-muted-foreground">{{ h.reason }}</p>
                    </div>
                </CardContent>
            </Card>

            <!-- Teks Asli -->
            <Card class="mb-6 sm:mb-8 border-border card-hover">
                <CardHeader class="pb-3 px-4 sm:px-6">
                    <CardTitle class="text-sm font-medium">Teks yang Dianalisis</CardTitle>
                </CardHeader>
                <CardContent class="pt-0 px-4 sm:px-6">
                    <p class="text-sm text-muted-foreground leading-relaxed line-clamp-6">{{ result.text }}</p>
                </CardContent>
            </Card>

            <!-- Aksi -->
            <div class="flex flex-col sm:flex-row gap-3">
                <Button class="flex-1 gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    @click="router.push('/analyze')">
                    <RotateCcw class="w-4 h-4" />
                    Analisis Lagi
                </Button>
                <Button variant="outline"
                    class="flex-1 gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    @click="handleExportPDF">
                    <Download class="w-4 h-4" />
                    Unduh PDF
                </Button>
                <Button variant="outline"
                    class="flex-1 gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    @click="handleExportJSON">
                    <FileJson class="w-4 h-4" />
                    Ekspor JSON
                </Button>
            </div>

        </main>
    </div>
</template>