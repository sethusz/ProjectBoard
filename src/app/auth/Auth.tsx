'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)
    const [errorMessages, setErrorMessages] = useState([]); 

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')

			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError: (error: any) => {
			const errors = error?.toString().split(',').map((msg:string) => 
				msg.trim().charAt(0).toUpperCase() + msg.trim().slice(1)
			);
			setErrorMessages(errors);
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
        setErrorMessages([]);

		mutate(data)
	}

	return (
		<div className='flex min-h-screen max-w-[350px] mx-[auto]'>
			<form
				className=' m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Auth' />
				<Field
					id='email'
					label='Email:'
					placeholder='Enter email:'
					type='email'
					extra='mb-4'
					{...register('email', {
						required: 'Email is required!'
					})}
				/>

				<Field
					id='password'
					label='Password: '
					placeholder='Enter password: '
					type='password'
					{...register('password', {
						required: 'Password is required!'
					})}
					extra='mb-6'
				/>

				{errorMessages.length > 0 && (
					<div className="pb-[20px] text-center text-[18px] text-red-500">
						{errorMessages.map((msg, index) => (
							<div key={index}>{msg}</div>
						))}
					</div>
				)}



				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
