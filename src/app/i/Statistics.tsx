'use client'
import { useProfile } from "@/hooks/useProfile"
import Loader from "@/components/ui/Loader"

export default function Statistics() {

    const { data, isLoading } = useProfile()

    return isLoading ? <Loader /> : (
        <div className="grid gap-12 mt-7
        md:grid-cols-4
        ">
            {data?.statistics.length ? data.statistics.map(statistic => (

                <div
                    className='bg-border/5 rounded p-layout text-center hover:translate-y-3 transition-transform duration-500'
                    key={statistic.label}
                >
                    <div className='text-xl'>{statistic.label}</div>
                    <div className='text-3xl font-semibold'>{statistic.value}</div>
                </div>

            )) : <div>Statisticks not loader</div>}
        </div>
    )
} 