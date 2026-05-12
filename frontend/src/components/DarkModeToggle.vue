<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
    <Button variant="ghost" size="icon" class="w-8 h-8" @click="toggle">
        <Sun v-if="isDark" class="w-4 h-4" />
        <Moon v-else class="w-4 h-4" />
    </Button>
</template>