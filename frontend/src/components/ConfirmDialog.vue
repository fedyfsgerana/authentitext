<script setup>
import { AlertTriangle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineProps({
    open: Boolean,
    title: { type: String, default: 'Apakah kamu yakin?' },
    description: { type: String, default: '' },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('cancel')" />
                <div
                    class="relative z-10 w-full max-w-sm mx-4 bg-background border border-border rounded-lg shadow-xl p-6">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                            <AlertTriangle class="w-5 h-5 text-destructive" />
                        </div>
                        <div class="flex-1">
                            <h3 class="font-semibold text-sm mb-1">{{ title }}</h3>
                            <p class="text-sm text-muted-foreground">{{ description }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-6 justify-end">
                        <Button variant="outline" size="sm" @click="emit('cancel')">Batal</Button>
                        <Button variant="destructive" size="sm" @click="emit('confirm')">Hapus</Button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}
</style>