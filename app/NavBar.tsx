'use client';

import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
    const path = usePathname();
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <li key={link.href}>
                        <Link className={classNames({
                            'text-zinc-900': link.href === path,
                            'text-zinc-500': link.href !== path,
                            'hover:text-zinc-800 transition-colors': true
                        })}
                            href={link.href}>{link.label}
                        </Link>
                    </li>)}
            </ul>
            <Box>
                { status === "authenticated" 
                && <Link href="/api/auth/signout">Sign Out</Link>}
                { status  === "unauthenticated" 
                && <Link href="/api/auth/signin">Sign In</Link>}

            </Box>
        </nav>
    )
}

export default NavBar