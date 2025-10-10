import React from 'react'

const Navbar = () => {
  return (
    <div>
        <header className='h-[50px] bg-[#acacac] '>
            <nav className='flex items-center justify-between w-[1300px]'>
                <a className='text-[30px] font-[700] ml-[20px]' href="">Zukarbook</a>
                <ul className='flex gap-[40px] font-[500]'>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Skill</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar