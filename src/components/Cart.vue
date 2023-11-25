<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { formatNumber } from '@/utils/formatNumber'
import CartItem from './CartItem.vue'
import { ref } from 'vue'
import CheckoutSuccess from './CheckoutSuccess.vue'

const cartStore = useCartStore()
const { removeCart, checkout } = cartStore
const { carts, totalPriceCheckout, totalItemCarts } = storeToRefs(cartStore)
const isShowNotif = ref(false)

function checkoutOrder() {
  checkout()
  isShowNotif.value = true
}

function closeNotif() {
  isShowNotif.value = false
}
</script>
<template>
  <div class="flex flex-col h-full">
    <p class="text-2xl mt-4">Cart</p>
    <div class="space-y-2 overflow-auto flex-1 mt-4">
      <!-- Card -->
      <div v-if="carts.length === 0" class="flex flex-col items-center justify-center h-full">
        <p class="text-xs text-gray-700 text-center">
          There is no item in cart. <br />
          Please select pizza.
        </p>
      </div>
      <CartItem :carts="carts" @remove="removeCart" />
    </div>
    <div class="w-full mt-4 mb-5">
      <div class="flex justify-between">
        <p class="text-sm">Total Item:</p>
        <p class="text-sm">{{ totalItemCarts }}</p>
      </div>
      <div class="bg-gray-400 py-4 px-2 rounded-md flex w-full justify-between items-center">
        <p class="font-bold">Total Price:</p>
        <p class="font-medium">
          {{ formatNumber(totalPriceCheckout) }}
        </p>
      </div>
      <button
        type="button"
        class="btn btn-primary w-full mt-4"
        :disabled="carts.length === 0"
        @click="checkoutOrder()"
      >
        Checkout
      </button>
    </div>
    <CheckoutSuccess :is-open="isShowNotif" @close="closeNotif" />
  </div>
</template>
