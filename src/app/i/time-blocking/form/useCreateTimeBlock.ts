'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TypeTimeBlockFormState } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'
import { useState } from 'react';

export function useCreateTimeBlock() {
	const queryClient = useQueryClient()

	const [error, setError] = useState<string | null>(null);


	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: (data: TypeTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		},
		onError: (error: any) => {
            // Здесь мы предполагаем, что структура ошибки соответствует той, что вы ожидаете
            const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
            setError(errorMessage); // Сохранение сообщения об ошибке в состоянии
        }

	})

	return {
		createTimeBlock,
		isPending,
		error
	}
}
