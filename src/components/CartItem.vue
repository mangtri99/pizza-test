<script setup lang="ts">
import type { Cart } from '@/utils/types'
import { formatNumber } from '@/utils/formatNumber'

interface Props {
  carts: Cart[]
  imgClasses?: string
}

const { carts, imgClasses } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()
</script>
<template>
  <div
    class="bg-primary rounded-md px-2 py-3 relative"
    v-for="(cart, index) in carts"
    :key="cart.id"
  >
    <div class="absolute top-0 right-0">
      <!-- Button remove cart item -->
      <button
        type="button"
        class="hover:bg-gray-100/50 text-xs transition-all p-1"
        @click="emit('remove', index)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex space-x-2">
      <img
        class="object-cover rounded w-16 h-16 aspect-square"
        :class="imgClasses"
        :src="cart.pizza.image"
        :alt="cart.pizza.name"
      />
      <div class="pr-2">
        <p class="text-sm font-medium mb-2">
          {{ cart.pizza.name }}
        </p>
        <p class="text-xs">
          {{
            cart.toppings.length > 0
              ? cart.toppings.map((item) => item.name).join(', ')
              : 'No Toppings'
          }}
        </p>
        <p class="text-sm">{{ formatNumber(cart.price) }} x{{ cart.quantity }}</p>
      </div>
    </div>
  </div>
</template>
