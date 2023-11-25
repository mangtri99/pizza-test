<script setup lang="ts">
// @ts-ignore
import { formatNumber } from '@/utils/formatNumber'
import type { Pizza } from '@/utils/types'

interface Props {
  pizza: Pizza[]
}

const { pizza } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'add', id: number): void
}>()
</script>

<template>
  <div class="rounded-md p-2 bg-primary shadow flex flex-col" v-for="item in pizza" :key="item.id">
    <img class="aspect-4/3 object-cover rounded-md" :src="item.image" :alt="item.name" />
    <div class="flex flex-col flex-1 items-center mt-4">
      <p class="font-medium text-lg">{{ item.name }}</p>
      <p>{{ formatNumber(item.price) }}</p>
    </div>
    <div class="flex justify-center mt-4">
      <button type="button" @click="emit('add', item.id)" class="btn btn-secondary">
        Select Pizza
      </button>
    </div>
  </div>
</template>
