'use client';

import { cp } from 'fs';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames';

const NavBar = () => {
    const path = usePathname();
    
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
                ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link 
                    key={link.href} 
                    className={ classNames({
                        'text-zinc-900': link.href === path,
                        'text-zinc-500': link.href !== path,
                        'hover:text-zinc-800 transition-colors': true
                    })}  
                    href={link.href}>{link.label}
                </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar