<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight, Zap, Shield, Clock, Bot, User, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()

const features = [
    {
        icon: Zap,
        title: 'Analisis Instan',
        description: 'Dapatkan hasil dalam hitungan detik dengan mesin deteksi yang cepat.',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20',
    },
    {
        icon: Shield,
        title: 'Akurasi Tinggi',
        description: 'Didukung Claude AI untuk deteksi yang andal dan terpercaya.',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    },
    {
        icon: Clock,
        title: 'Riwayat Analisis',
        description: 'Semua hasil analisis sebelumnya tersimpan otomatis di browser kamu.',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    },
]

const examples = [
    {
        text: 'Pemanfaatan kerangka metodologi tingkat lanjut memfasilitasi optimalisasi hasil organisasi melalui implementasi sistematis praktik berbasis bukti.',
        ai: 91,
        human: 9,
        confidence: 'Tinggi',
        isAi: true,
    },
    {
        text: 'Baru bangun terus bikin kopi. Lupa charger di rumah jadi sekarang lagi di kafe sambil ngebut selesain ini sebelum laptop mati wkwk.',
        ai: 4,
        human: 96,
        confidence: 'Tinggi',
        isAi: false,
    },
]
</script>

<template>
    <div class="min-h-screen bg-background">

        <!-- Navbar -->
        <nav class="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer select-none" @click="router.push('/')">
                    <div
                        class="w-7 h-7 rounded-md bg-primary flex items-center justify-center transition-transform hover:scale-110">
                        <Bot class="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span class="font-semibold text-sm tracking-tight">AuthentiText</span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <DarkModeToggle />
                    <Button variant="ghost" size="sm" class="text-xs sm:text-sm" @click="router.push('/history')">
                        Riwayat
                    </Button>
                    <Button size="sm" class="text-xs sm:text-sm gap-1.5" @click="router.push('/analyze')">
                        <span class="hidden sm:inline">Mulai Analisis</span>
                        <span class="sm:hidden">Analisis</span>
                        <ArrowRight class="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
            <Badge variant="secondary" class="mb-5 sm:mb-6 gap-1.5 text-xs">
                <Zap class="w-3 h-3" />
                Didukung Claude AI
            </Badge>

            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                Apakah teks ini ditulis oleh
                <span class="text-muted-foreground line-through decoration-destructive">manusia</span>
                <br class="hidden sm:block" />
                atau dibuat oleh
                <span class="underline decoration-wavy decoration-primary underline-offset-4">AI?</span>
            </h1>

            <p class="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Tempel teks apapun dan langsung ketahui probabilitas apakah teks tersebut
                dibuat oleh AI. Cepat, akurat, tanpa perlu login.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg"
                    class="w-full sm:w-auto gap-2 px-8 transition-transform hover:scale-105 active:scale-95"
                    @click="router.push('/analyze')">
                    Mulai Analisis
                    <ArrowRight class="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg"
                    class="w-full sm:w-auto transition-transform hover:scale-105 active:scale-95"
                    @click="router.push('/history')">
                    Lihat Riwayat
                </Button>
            </div>

            <p class="text-xs text-muted-foreground mt-4">
                Gratis · Tanpa akun · Hasil tersimpan di browser
            </p>
        </section>

        <!-- Contoh Hasil -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
            <p class="text-center text-xs sm:text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
                Contoh Hasil
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card v-for="(example, i) in examples" :key="i" class="border border-border card-hover"
                    :class="example.isAi ? 'hover:border-destructive/40 hover:bg-destructive/5' : 'hover:border-green-500/40 hover:bg-green-500/5'"
                    @click="router.push('/analyze')">
                    <CardContent class="p-4 sm:p-5">
                        <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 italic">
                            "{{ example.text }}"
                        </p>
                        <div class="space-y-2.5 mb-4">
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-1.5 w-20">
                                    <Bot class="w-3.5 h-3.5 text-destructive" />
                                    <span class="text-xs font-medium text-destructive">AI</span>
                                </div>
                                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full bg-destructive rounded-full transition-all duration-1000"
                                        :style="{ width: example.ai + '%' }" />
                                </div>
                                <span class="text-xs font-semibold w-8 text-right">{{ example.ai }}%</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-1.5 w-20">
                                    <User class="w-3.5 h-3.5 text-green-500" />
                                    <span class="text-xs font-medium text-green-500">Manusia</span>
                                </div>
                                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full bg-green-500 rounded-full transition-all duration-1000"
                                        :style="{ width: example.human + '%' }" />
                                </div>
                                <span class="text-xs font-semibold w-8 text-right">{{ example.human }}%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <Badge variant="outline" class="text-xs gap-1">
                                <ChevronRight class="w-3 h-3" />
                                Kepercayaan: {{ example.confidence }}
                            </Badge>
                            <Badge :variant="example.isAi ? 'destructive' : 'default'" class="text-xs">
                                {{ example.isAi ? 'Dibuat AI' : 'Ditulis Manusia' }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        <!-- Fitur -->
        <section class="border-t border-border bg-muted/30">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <p
                    class="text-center text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-10 uppercase tracking-widest font-medium">
                    Mengapa AuthentiText
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div v-for="feature in features" :key="feature.title"
                        class="group flex flex-row sm:flex-col items-start gap-3 p-4 sm:p-5 rounded-lg border border-border bg-background transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-border/60 cursor-default">
                        <div class="w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                            :class="feature.bg">
                            <component :is="feature.icon" class="w-4 h-4 transition-colors duration-200"
                                :class="feature.color" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-sm mb-1">{{ feature.title }}</h3>
                            <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Bawah -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Siap mendeteksi teks AI?</h2>
            <p class="text-muted-foreground text-sm sm:text-base mb-8">Tanpa daftar. Tanpa batas. Tempel dan analisis.
            </p>
            <Button size="lg" class="w-full sm:w-auto gap-2 px-10 transition-transform hover:scale-105 active:scale-95"
                @click="router.push('/analyze')">
                Analisis Sekarang
                <ArrowRight class="w-4 h-4" />
            </Button>
        </section>

        <!-- Footer -->
        <footer class="border-t border-border">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <span class="text-xs text-muted-foreground">© 2025 AuthentiText AI</span>
                <span class="text-xs text-muted-foreground">Didukung oleh Claude</span>
            </div>
        </footer>

    </div>
</template>