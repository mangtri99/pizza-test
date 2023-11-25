<script setup lang="ts">
import { formatNumber } from '@/utils/formatNumber'
import { toppings } from '@/data/toppings'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/useMenuStore'
import { useCartStore } from '@/stores/useCartStore'
import ModalBase from './ModalBase.vue'
interface Props {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()
defineEmits<{
  (e: 'close'): void
}>()

const menuStore = useMenuStore()
const { selectedToppings } = storeToRefs(menuStore)

const cartStore = useCartStore()
const { addToCart } = cartStore
const { getSelectedPizza, totalSelectedPizzaPrice } = storeToRefs(cartStore)
</script>

<template>
  <ModalBase :is-open="isOpen">
    <template #title>
      <div>
        Choose Toppings for <br />
        <span class="font-bold">{{ getSelectedPizza?.name }}</span>
      </div>
    </template>
    <div>
      <div class="mt-2">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div v-for="item in toppings" :key="item.id" class="flex rounded-lg p-2 bg-primary">
            <label :for="'topping' + item.id" class="text-sm">
              <input
                :id="'topping' + item.id"
                type="checkbox"
                class="mr-2"
                :value="item.id"
                v-model="selectedToppings"
              />
              {{ item.name }} - {{ formatNumber(item.price) }}
            </label>
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-between">
        <p>Total Price: {{ formatNumber(totalSelectedPizzaPrice) }}</p>
        <button
          type="button"
          class="btn btn-secondary"
          @click="
            () => {
              addToCart()
              $emit('close')
            }
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  </ModalBase>
</template>
