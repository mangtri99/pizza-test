import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pizza, Topping } from '@/utils/types'
import { pizza as dataPizza } from '@/data/pizza'
import { toppings as dataToppings } from '@/data/toppings'

export const useMenuStore = defineStore('menuStore', () => {
  const selectedPizzaId = ref<number>(0)
  const selectedToppings = ref<number[]>([])
  const search = ref('')
  const pizza = ref<Pizza[]>(dataPizza)

  const toppings = ref<Topping[]>(dataToppings)
  const filterPizza = computed(() => {
    return pizza.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
  })

  return { 
    selectedPizzaId, 
    selectedToppings, 
    search, 
    pizza, 
    toppings,
    filterPizza
   }
}, {
  persist: true
})
