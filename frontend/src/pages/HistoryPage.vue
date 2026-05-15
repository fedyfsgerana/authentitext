<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    Bot, User, ArrowLeft, Trash2, Clock,
    RotateCcw, History, Search, X,
    TrendingUp, BarChart3, Filter
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useHistoryStore } from '@/stores/useHistoryStore'
import { useToast } from '@/composables/useToast'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()
const store = useHistoryStore()
const { toast } = useToast()

onMounted(() => store.load())

const searchQuery = ref('')
const filterVerdict = ref('semua')

const filters = [
    { value: 'semua', label: 'Semua' },
    { value: 'Dibuat AI', label: 'AI' },
    { value: 'Kemungkinan AI', label: 'Mungkin AI' },
    { value: 'Tidak Pasti', label: 'Tidak Pasti' },
    { value: 'Kemungkinan Manusia', label: 'Mungkin Manusia' },
    { value: 'Ditulis Manusia', label: 'Manusia' },
]

const filteredHistory = computed(() => {
    return store.history.filter(item => {
        const matchSearch = item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
        const verdict = getVerdict(item.ai_probability).label
        const matchFilter = filterVerdict.value === 'semua' || verdict === filterVerdict.value
        return matchSearch && matchFilter
    })
})

// Stats
const avgAiScore = computed(() => {
    if (!store.history.length) return 0
    return Math.round(store.history.reduce((a, b) => a + b.ai_probability, 0) / store.history.length)
})

const aiCount = computed(() => store.history.filter(i => i.ai_probability >= 50).length)
const humanCount = computed(() => store.history.filter(i => i.ai_probability < 50).length)

const showConfirmClear = ref(false)
const showConfirmDelete = ref(false)
const deleteTargetId = ref(null)

function confirmDelete(id) {
    deleteTargetId.value = id
    showConfirmDelete.value = true
}

function handleDelete() {
    store.remove(deleteTargetId.value)
    showConfirmDelete.value = false
    toast({ title: 'Dihapus', description: 'Analisis dihapus dari riwayat', type: 'success' })
}

function handleClearAll() {
    store.clear()
    showConfirmClear.value = false
    toast({ title: 'Riwayat Dibersihkan', description: 'Semua analisis telah dihapus', type: 'success' })
}

const isEmpty = computed(() => store.history.length === 0)

function getVerdict(ai) {
    if (ai >= 80) return { label: 'Dibuat AI', variant: 'destructive', isAi: true }
    if (ai >= 60) return { label: 'Kemungkinan AI', variant: 'destructive', isAi: true }
    if (ai >= 40) return { label: 'Tidak Pasti', variant: 'secondary', isAi: null }
    if (ai >= 20) return { label: 'Kemungkinan Manusia', variant: 'default', isAi: false }
    return { label: 'Ditulis Manusia', variant: 'default', isAi: false }
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })
}

function clearSearch() {
    searchQuery.value = ''
    filterVerdict.value = 'semua'
}
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border/50 sticky top-0 z-50 glass">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2.5 cursor-pointer group" @click="router.push('/')">
                    <div
                        class="w-6 h-6 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Bot class="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span class="font-bold text-sm">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button v-if="!isEmpty" variant="ghost" size="sm"
                        class="gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-200"
                        @click="showConfirmClear = true">
                        <Trash2 class="w-3.5 h-3.5" />
                        <span class="hidden sm:inline">Hapus Semua</span>
                    </Button>
                </div>
            </div>
        </nav>

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6"
                @click="router.push('/')">
                <ArrowLeft class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Kembali ke Beranda
            </button>

            <!-- Layout 2 kolom di desktop -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Kolom Kiri: Stats + Filter -->
                <div class="flex flex-col gap-4 lg:order-2">

                    <!-- Header mobile -->
                    <div class="lg:hidden flex items-center gap-2">
                        <History class="w-5 h-5 text-muted-foreground" />
                        <h1 class="text-2xl font-extrabold tracking-tight">Riwayat</h1>
                        <Badge variant="secondary" class="font-bold">{{ store.history.length }}</Badge>
                    </div>

                    <!-- Stats Cards -->
                    <div v-if="!isEmpty" class="rounded-2xl border border-border bg-background p-5">
                        <p class="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Statistik
                        </p>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                <div class="flex items-center gap-2">
                                    <BarChart3 class="w-4 h-4 text-muted-foreground" />
                                    <span class="text-xs font-medium">Total Analisis</span>
                                </div>
                                <span class="text-sm font-black">{{ store.history.length }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                                <div class="flex items-center gap-2">
                                    <Bot class="w-4 h-4 text-destructive" />
                                    <span class="text-xs font-medium text-destructive">Terdeteksi AI</span>
                                </div>
                                <span class="text-sm font-black text-destructive">{{ aiCount }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                                <div class="flex items-center gap-2">
                                    <User class="w-4 h-4 text-green-500" />
                                    <span class="text-xs font-medium text-green-600 dark:text-green-400">Terdeteksi
                                        Manusia</span>
                                </div>
                                <span class="text-sm font-black text-green-500">{{ humanCount }}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                                <div class="flex items-center gap-2">
                                    <TrendingUp class="w-4 h-4 text-muted-foreground" />
                                    <span class="text-xs font-medium">Rata-rata Skor AI</span>
                                </div>
                                <span class="text-sm font-black tabular-nums"
                                    :class="avgAiScore >= 50 ? 'text-destructive' : 'text-green-500'">
                                    {{ avgAiScore }}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Filter -->
                    <div v-if="!isEmpty" class="rounded-2xl border border-border bg-background p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <Filter class="w-4 h-4 text-muted-foreground" />
                            <p class="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Filter Hasil
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="f in filters" :key="f.value"
                                class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border"
                                :class="filterVerdict === f.value
                                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                    : 'bg-background text-muted-foreground border-border/60 hover:border-primary/30 hover:text-foreground'"
                                @click="filterVerdict = f.value">
                                {{ f.label }}
                            </button>
                        </div>
                    </div>

                    <!-- CTA Analisis Baru -->
                    <Button
                        class="w-full gap-2 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                        @click="router.push('/analyze')">
                        <RotateCcw class="w-4 h-4" />
                        Analisis Baru
                    </Button>

                </div>

                <!-- Kolom Kanan: List (2/3) -->
                <div class="lg:col-span-2 lg:order-1 flex flex-col gap-4">

                    <!-- Header desktop -->
                    <div class="hidden lg:flex items-center gap-2">
                        <History class="w-5 h-5 text-muted-foreground" />
                        <h1 class="text-2xl font-extrabold tracking-tight">Riwayat</h1>
                        <Badge variant="secondary" class="font-bold">{{ store.history.length }}</Badge>
                    </div>

                    <!-- Search -->
                    <div v-if="!isEmpty" class="relative">
                        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input v-model="searchQuery" placeholder="Cari dalam riwayat analisis..."
                            class="w-full h-10 pl-10 pr-10 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200" />
                        <button v-if="searchQuery"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            @click="searchQuery = ''">
                            <X class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Empty State -->
                    <div v-if="isEmpty" class="flex flex-col items-center justify-center py-20 text-center">
                        <div class="relative mb-6">
                            <div class="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center">
                                <History class="w-9 h-9 text-muted-foreground" />
                            </div>
                            <div
                                class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <span class="text-[10px] font-black text-primary">0</span>
                            </div>
                        </div>
                        <h3 class="font-extrabold text-lg mb-2">Belum ada riwayat</h3>
                        <p class="text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
                            Hasil analisis kamu akan otomatis tersimpan di sini setelah analisis pertama dilakukan
                        </p>
                        <Button class="gap-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                            @click="router.push('/analyze')">
                            <RotateCcw class="w-4 h-4" />
                            Mulai Analisis Pertama
                        </Button>
                    </div>

                    <!-- No Results -->
                    <div v-else-if="filteredHistory.length === 0"
                        class="flex flex-col items-center justify-center py-14 text-center">
                        <div class="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                            <Search class="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p class="text-sm font-semibold mb-1">Tidak ada hasil</p>
                        <p class="text-xs text-muted-foreground mb-4">
                            Tidak ditemukan riwayat untuk pencarian ini
                        </p>
                        <button class="text-xs text-primary hover:underline font-medium" @click="clearSearch">
                            Hapus filter
                        </button>
                    </div>

                    <!-- History List -->
                    <div v-else class="space-y-3">
                        <div v-for="item in filteredHistory" :key="item.id"
                            class="group relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
                            :class="{
                                'border-destructive/20 hover:border-destructive/40 bg-destructive/[0.02] hover:bg-destructive/[0.04]': getVerdict(item.ai_probability).isAi === true,
                                'border-green-500/20 hover:border-green-500/40 bg-green-500/[0.02] hover:bg-green-500/[0.04]': getVerdict(item.ai_probability).isAi === false,
                                'border-border hover:border-border/60': getVerdict(item.ai_probability).isAi === null,
                            }">
                            <div class="flex items-start justify-between gap-3 mb-3">
                                <p
                                    class="text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">
                                    {{ item.text }}
                                </p>
                                <button
                                    class="w-7 h-7 shrink-0 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                                    @click.stop="confirmDelete(item.id)">
                                    <Trash2 class="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <!-- Score visual -->
                            <div class="flex items-center gap-2 mb-3">
                                <div class="flex items-center gap-1.5 shrink-0">
                                    <Bot class="w-3.5 h-3.5 text-destructive" />
                                    <span class="text-xs font-bold text-destructive tabular-nums w-8">{{
                                        item.ai_probability }}%</span>
                                </div>
                                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-500" :class="item.ai_probability >= 50
                                        ? 'bg-gradient-to-r from-destructive/80 to-destructive'
                                        : 'bg-gradient-to-r from-green-500/80 to-green-500'"
                                        :style="{ width: item.ai_probability + '%' }" />
                                </div>
                                <div class="flex items-center gap-1.5 shrink-0">
                                    <span class="text-xs font-bold text-green-500 tabular-nums w-8 text-right">{{
                                        item.human_probability }}%</span>
                                    <User class="w-3.5 h-3.5 text-green-500" />
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock class="w-3 h-3" />
                                    {{ formatDate(item.savedAt) }}
                                </div>
                                <Badge :variant="getVerdict(item.ai_probability).variant" class="text-xs font-semibold">
                                    {{ getVerdict(item.ai_probability).label }}
                                </Badge>
                            </div>
                        </div>

                        <!-- Footer info -->
                        <p class="text-center text-xs text-muted-foreground pt-2">
                            Menampilkan {{ filteredHistory.length }} dari {{ store.history.length }} analisis
                        </p>
                    </div>

                </div>
            </div>

        </main>

        <ConfirmDialog :open="showConfirmDelete" title="Hapus analisis ini?"
            description="Tindakan ini tidak dapat dibatalkan." @confirm="handleDelete"
            @cancel="showConfirmDelete = false" />

        <ConfirmDialog :open="showConfirmClear" title="Hapus semua riwayat?"
            description="Semua hasil analisis yang tersimpan akan dihapus permanen." @confirm="handleClearAll"
            @cancel="showConfirmClear = false" />

    </div>
</template>