import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'
import axios from 'axios';

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		try {
			const response = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data);

			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken);
			}

			return response;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data.message;
			} else {
				throw new Error('An unexpected error occurred');
			}
		}
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
