import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant(): Promise<GetManagedRestaurantResponse> {
  const response = await api.get('/managed-restaurant')

  return response.data
}
