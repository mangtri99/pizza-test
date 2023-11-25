<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from '@/stores/useMenuStore'
import PizzaCard from '@/components/PizzaCard.vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'
import ToppingList from '@/components/ToppingList.vue'
import Cart from '@/components/Cart.vue'
import ModalBase from '@/components/ModalBase.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import CheckoutSuccess from '@/components/CheckoutSuccess.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('md')

const menuStore = useMenuStore()
const { filterPizza, search, selectedPizzaId } = storeToRefs(menuStore)

const cartStore = useCartStore()
const { carts, isOpenCart, isOrderSuccess } = storeToRefs(cartStore)

const isOpenTopping = ref(false)

function selectPizza(id: number) {
  selectedPizzaId.value = id
  openModalTopping()
}

function closeModalTopping() {
  isOpenTopping.value = false
}
function openModalTopping() {
  isOpenTopping.value = true
}

function closeCart() {
  isOpenCart.value = false
}
function openCart() {
  isOpenCart.value = true
}
</script>

<template>
  <div class="min-h-screen relative">
    <div class="md:pr-6 pr-0 md:mr-64 lg:ml-32 md:ml-16 sm:ml-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold">Pizza List</h1>
        <div class="block md:hidden">
          <button
            type="button"
            class="btn btn-secondary inline-flex items-center"
            @click="openCart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span>Cart ({{ carts.length }})</span>
          </button>
        </div>
      </div>
      <div class="my-4">
        <input
          type="text"
          class="form-input rounded-sm w-full"
          placeholder="Search Pizza..."
          v-model="search"
        />
      </div>
      <div class="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
        <PizzaCard
          :pizza="filterPizza"
          @add="
            (id) => {
              selectPizza(id)
            }
          "
        />
      </div>
    </div>
    <div class="fixed hidden md:flex md:flex-col top-32 right-4 bottom-10 bg-gray-200 w-64 p-4">
      <Cart />
    </div>
    <ToppingList :is-open="isOpenTopping" @close="closeModalTopping" />
    <ModalBase
      v-if="isMobile"
      :is-open="isOpenCart"
      @close="closeCart"
      wrapper-class="h-full"
      body-class="h-full"
    >
      <template #title>
        <div class="flex justify-end">
          <button type="button" @click="closeCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>
      <Cart />
    </ModalBase>
    <CheckoutSuccess :is-open="isOrderSuccess" @close="isOrderSuccess = false" />
  </div>
</template>
