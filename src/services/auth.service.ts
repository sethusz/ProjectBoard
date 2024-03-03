import { axiosClassic } from '@/api/interceptors'
import { removeFromStorage, saveTokenToStorage } from './auth-token.service'
import { IAuthForm, IAuthResponse } from '@/types/auth.types'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	},

	async logout() {
        const response = await axiosClassic.post<Boolean>('./auth/logout')
        if(response.data) removeFromStorage()

        return response
    }
}
