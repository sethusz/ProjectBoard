import React from 'react';
import cls from './header.module.scss';
import Link from 'next/link';
import { GanttChartSquare } from 'lucide-react';
import { COLORS } from '@/constants/color.constants';
import { LogoutButton } from '../sidebar/LogoutButton';
import { MENU } from '../sidebar/menu.data';
import { MenuItem } from '../sidebar/MenuItem';

export default function BurgerMenu({ setIsActive, isActive }: any) {

    return (
        <div className={`${cls.burgerMenu}`}>
            <div className={cls.burgerContent}>
                <div className='flex h-full flex-col justify-between
		lg:hidden'>
                    <div>

                        <div className='p-3 relative'>
                            <LogoutButton />
                            <div onClick={() => setIsActive(false)}>
                                {MENU.map(item => (
                                    <MenuItem
                                        item={item}
                                        key={item.link}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <footer className='text-xs opacity-40 font-normal text-center p-layout'>
                        2024 &copy; With love from{' '}
                        <a
                            href=''
                            target='_blank'
                            rel='noreferrer'
                            className='hover:text-primary text-brand-300 transition-colors'
                        >
                            Board
                        </a>
                        . <br /> All rights reserved.
                    </footer>
                </div>
            </div>
        </div>
    );
}
