import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMenuStore } from './useMenuStore'
import type { Cart } from '@/utils/types'

export const useCartStore = defineStore('cartStore', () => {
  const menuStore = useMenuStore()
  const isOpenCart = ref(false) // cart modal (use on mobile)
  const isOrderSuccess = ref(false) // modal order success
  const { pizza, toppings, selectedPizzaId, selectedToppings } = storeToRefs(menuStore)

  const carts = ref<Cart[]>([]) // cart list

  // get selected pizza
  const getSelectedPizza = computed(() => {
    return pizza.value.find((item) => item.id === selectedPizzaId.value)
  })

  // get selected toppings
  const getSelectedToppings = computed(() => {
    return toppings.value.filter((item) => selectedToppings.value.includes(item.id))
  })

  // calculate selected toppings price
  const calculateSelectedToppingPrice = computed(() => {
    return selectedToppings.value.reduce((acc, curr) => {
      const findTopping = toppings.value.find((item) => item.id === curr)
      if (findTopping) {
        return acc + findTopping.price
      }
      return acc
    }, 0)
  })

  // calculate total price of selected pizza and toppings
  const totalSelectedPizzaPrice = computed(() => {
    if (getSelectedPizza.value) {
      return getSelectedPizza.value.price + calculateSelectedToppingPrice.value
    } else {
      return 0
    }
  })

  // calculate total price of all carts
  const totalPriceCheckout = computed(() => {
    return carts.value.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  })

  // calculate total item of all carts
  const totalItemCarts = computed(() => {
    return carts.value.reduce((acc, curr) => acc + curr.quantity, 0)
  })

  // add selected pizza and toppings to cart
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

  // remove a item in cart
  function removeCart(index: number) {
    carts.value.splice(index, 1)
  }

  // checkout and reset cart
  function checkout() {
    carts.value = []
    isOrderSuccess.value = true
  }

  return { 
    carts, 
    isOpenCart,
    isOrderSuccess,
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
