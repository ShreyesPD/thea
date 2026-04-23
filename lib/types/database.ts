export type UserRole = 'customer' | 'admin'

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  stock: number
  sizes: string[]
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: OrderStatus
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  size: string
  price: number
  product?: Product
}

export type OrderItemWithProduct = Omit<OrderItem, 'product'> & {
  product?: Pick<Product, 'id' | 'name' | 'images'>
}

export interface OrderWithRelations extends Order {
  users?: Pick<User, 'id' | 'name' | 'email'>
  order_items?: OrderItemWithProduct[]
}

export interface Enquiry {
  id: string
  name: string
  email: string
  message: string
  created_at: string
  read: boolean
}

export interface LookbookCollection {
  id: string
  title: string
  description: string
  images: string[]
  season: string
  year: number
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
}
