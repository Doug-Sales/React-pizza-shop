import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const singInForm = z.object({
  email: z.string().email(),
})

type SingInForm = z.infer<typeof singInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SingInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SingInForm) {
    console.log(data)

    try {
      await authenticate({ email: data.email })
      toast.success(`Enviamos um link de autenticação para seu e-mail.`, {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch (error) {
      toast.error(`Credenciais inválidas.`)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className=" absolute right-8 top-8" variant={'outline'}>
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>

        <div className=" flex w-[21.875rem] flex-col justify-center gap-6 ">
          <div className=" flex flex-col gap-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tight ">
              Acessar painel
            </h1>
            <p className=" text-sm text-muted-foreground ">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className=" space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
