'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'
import { useEffect, useState } from 'react';
import cls from '.././header.module.scss'
import BurgerMenu from '.././burgerMenu';

export function Profile() {
	const { data, isLoading } = useProfile()


	const [isTinyScreen, setIsTinyScreen] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const toggleMenu = () => {
	  setIsActive(!isActive);
	};
  

	useEffect(() => {
		// This function will only be called on the client side, where `window` is defined.
		const handleResize = () => {
		  setIsTinyScreen(window.innerWidth < 800);
		};
		
		// Set the initial value
		handleResize();
	
		// Set up event listener
		window.addEventListener('resize', handleResize);
	
		// Clean up event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	  }, []);

	return (
		<div className='absolute top-big-layout right-big-layout'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='flex items-center 
				xs:flex-row lg:mt-[0]
				tiny:flex-col tiny:gap-[5px] tiny:mt-[-10px]'>
						<div className='text-right mr-3'>
							<p className='font-bold -mb-1'>
								{data?.user?.name && (isTinyScreen && data.user.name.length > 10 ? `${data.user.name.substring(0, 10)}...` : data.user.name)}
							</p>
							<p className='text-sm opacity-40'>
								{data?.user?.email && (isTinyScreen && data.user.email.length > 10 ? `${data.user.email.substring(0, 10)}...` : data.user.email)}
							</p>
						</div>

						<div className='w-10 h-10 justify-center items-center text-2xl text-white bg-white/20 rounded uppercase
					hidden lg:flex'>
							{data?.user.name?.charAt(0) || 'A'}
						</div>
					</div>

					<div className='block lg:hidden'>
						<div className={`${cls.burger} ${isActive ? `${cls.burger__active}` : ''}`} onClick={toggleMenu}>
							<div className={`${cls.burger__line} ${cls.burger__line__1}`}></div>
							<div className={`${cls.burger__line} ${cls.burger__line__2}`}></div>
							<div className={`${cls.burger__line} ${cls.burger__line__3}`}></div>
						</div>
						{isActive && <BurgerMenu setIsActive={setIsActive} isActive={isActive} />}
					</div>

				</>
			)}
		</div>
	)
}
