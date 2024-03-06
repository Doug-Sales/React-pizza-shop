import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  description: string | null
}

export async function updateProfile({ description, name }: UpdateProfileBody) {
  // await new Promise((_resolve, reject) => {
  //   setTimeout(reject, 3000)
  // })

  await api.put('/profile', { name, description })
}
