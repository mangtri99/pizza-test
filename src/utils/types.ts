export interface Pizza {
  id: number
  name: string
  image: string
  price: number
}

export interface Topping {
  id: number
  name: string
  price: number
}

export interface Cart {
  id: number
  pizza: Pizza
  toppings: Topping[]
  price: number
  quantity: number
}