import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMenuStore } from './useMenuStore'
import type { Cart } from '@/utils/types'

export const useCartStore = defineStore('cartStore', () => {
  const menuStore = useMenuStore()
  const isOpenCart = ref(false)
  const { pizza, toppings, selectedPizzaId, selectedToppings } = storeToRefs(menuStore)

  const carts = ref<Cart[]>([])
  const getSelectedPizza = computed(() => {
    return pizza.value.find((item) => item.id === selectedPizzaId.value)
  })

  const getSelectedToppings = computed(() => {
    return toppings.value.filter((item) => selectedToppings.value.includes(item.id))
  })

  const calculateSelectedToppingPrice = computed(() => {
    return selectedToppings.value.reduce((acc, curr) => {
      const findTopping = toppings.value.find((item) => item.id === curr)
      if (findTopping) {
        return acc + findTopping.price
      }
      return acc
    }, 0)
  })

  const totalSelectedPizzaPrice = computed(() => {
    if (getSelectedPizza.value) {
      return getSelectedPizza.value.price + calculateSelectedToppingPrice.value
    } else {
      return 0
    }
  })

  const totalPriceCheckout = computed(() => {
    return carts.value.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  })

  const totalItemCarts = computed(() => {
    return carts.value.reduce((acc, curr) => acc + curr.quantity, 0)
  })

  function addToCart() {
    if (getSelectedPizza.value?.id) {
      // if pizza and same toppings already in cart, increase quantity
      const findCart = carts.value.find(
        (item) =>
          item.id === selectedPizzaId.value &&
          JSON.stringify(item.toppings) === JSON.stringify(getSelectedToppings.value)
      )

      if (findCart) {
        findCart.quantity += 1
      } else {
        carts.value.push({
          id: getSelectedPizza.value.id,
          pizza: getSelectedPizza.value,
          toppings: getSelectedToppings.value,
          price: totalSelectedPizzaPrice.value,
          quantity: 1
        })
      }
    }
    selectedToppings.value = []
  }

  function removeCart(index: number) {
    carts.value.splice(index, 1)
  }

  function checkout() {
    carts.value = []
  }

  return { 
    carts, 
    isOpenCart,
    addToCart, 
    removeCart,
    checkout,
    getSelectedPizza, 
    getSelectedToppings, 
    calculateSelectedToppingPrice, 
    totalSelectedPizzaPrice,
    totalPriceCheckout,
    totalItemCarts
  }
}, 
{
  persist: true
})
