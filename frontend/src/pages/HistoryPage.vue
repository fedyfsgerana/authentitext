<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bot, User, ArrowLeft, Trash2, Clock, RotateCcw, History, Search } from 'lucide-vue-next'
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

const filteredHistory = computed(() => {
    return store.history.filter(item => {
        const matchSearch = item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
        const verdict = getVerdict(item.ai_probability).label
        const matchFilter = filterVerdict.value === 'semua' || verdict === filterVerdict.value
        return matchSearch && matchFilter
    })
})

const showConfirmClear = ref(false)
const showConfirmDelete = ref(false)
const deleteTargetId = ref(null)
const hoveredCard = ref(null)

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
        day: 'numeric', month: 'short',
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
                    <Button v-if="!isEmpty" variant="ghost" size="sm"
                        class="gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-destructive transition-colors duration-200"
                        @click="showConfirmClear = true">
                        <Trash2 class="w-3.5 h-3.5" />
                        <span class="hidden sm:inline">Hapus Semua</span>
                    </Button>
                </div>
            </div>
        </nav>

        <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

            <!-- Tombol Kembali -->
            <button
                class="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6"
                @click="router.push('/')">
                <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Kembali ke Beranda
            </button>

            <!-- Header -->
            <div class="flex items-center gap-2 mb-6">
                <History class="w-5 h-5 text-muted-foreground" />
                <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Riwayat</h1>
                <Badge variant="secondary" class="ml-1">{{ store.history.length }}</Badge>
            </div>

            <!-- Pencarian & Filter -->
            <div v-if="!isEmpty" class="flex gap-2 mb-6">
                <div class="relative flex-1">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input v-model="searchQuery" placeholder="Cari riwayat..."
                        class="w-full h-9 pl-9 pr-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-200 focus:border-primary/30" />
                </div>
                <select v-model="filterVerdict"
                    class="h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring text-foreground transition-all duration-200 cursor-pointer">
                    <option value="semua">Semua</option>
                    <option value="Dibuat AI">Dibuat AI</option>
                    <option value="Kemungkinan AI">Kemungkinan AI</option>
                    <option value="Tidak Pasti">Tidak Pasti</option>
                    <option value="Kemungkinan Manusia">Kemungkinan Manusia</option>
                    <option value="Ditulis Manusia">Ditulis Manusia</option>
                </select>
            </div>

            <!-- Kosong -->
            <div v-if="isEmpty" class="text-center py-20">
                <div class="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <History class="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 class="font-semibold mb-1">Belum ada riwayat</h3>
                <p class="text-sm text-muted-foreground mb-6">Hasil analisis kamu akan muncul di sini</p>
                <Button class="gap-2 transition-transform hover:scale-105 active:scale-95"
                    @click="router.push('/analyze')">
                    <RotateCcw class="w-4 h-4" />
                    Mulai Analisis
                </Button>
            </div>

            <!-- Tidak Ada Hasil -->
            <div v-else-if="filteredHistory.length === 0" class="text-center py-16">
                <Search class="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p class="text-sm text-muted-foreground">Tidak ada hasil untuk "{{ searchQuery }}"</p>
            </div>

            <!-- Daftar Riwayat -->
            <div v-else class="space-y-3">
                <Card v-for="item in filteredHistory" :key="item.id"
                    class="border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                    :class="{
                        'hover:border-destructive/40 hover:bg-destructive/5': getVerdict(item.ai_probability).isAi === true,
                        'hover:border-green-500/40 hover:bg-green-500/5': getVerdict(item.ai_probability).isAi === false,
                        'hover:border-border/60': getVerdict(item.ai_probability).isAi === null,
                    }" @mouseenter="hoveredCard = item.id" @mouseleave="hoveredCard = null">
                    <CardContent class="p-4">
                        <div class="flex items-start justify-between gap-3 mb-3">
                            <p
                                class="text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                {{ item.text }}
                            </p>
                            <button
                                class="w-7 h-7 shrink-0 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                @click.stop="confirmDelete(item.id)">
                                <Trash2 class="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div class="flex items-center gap-4 mb-3">
                            <div class="flex items-center gap-1.5">
                                <Bot class="w-3.5 h-3.5 text-destructive" />
                                <span class="text-xs font-semibold text-destructive tabular-nums">{{ item.ai_probability
                                    }}%</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <User class="w-3.5 h-3.5 text-green-500" />
                                <span class="text-xs font-semibold text-green-500 tabular-nums">{{
                                    item.human_probability }}%</span>
                            </div>
                            <div class="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div class="h-full bg-destructive rounded-full transition-all duration-500"
                                    :style="{ width: item.ai_probability + '%' }" />
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock class="w-3 h-3" />
                                {{ formatDate(item.savedAt) }}
                            </div>
                            <Badge :variant="getVerdict(item.ai_probability).variant" class="text-xs">
                                {{ getVerdict(item.ai_probability).label }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </main>

        <!-- Dialog Hapus Satu -->
        <ConfirmDialog :open="showConfirmDelete" title="Hapus analisis ini?"
            description="Tindakan ini tidak dapat dibatalkan." @confirm="handleDelete"
            @cancel="showConfirmDelete = false" />

        <!-- Dialog Hapus Semua -->
        <ConfirmDialog :open="showConfirmClear" title="Hapus semua riwayat?"
            description="Semua hasil analisis yang tersimpan akan dihapus permanen." @confirm="handleClearAll"
            @cancel="showConfirmClear = false" />

    </div>
</template>