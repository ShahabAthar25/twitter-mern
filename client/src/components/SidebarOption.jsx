import React from 'react'

export default function SidebarOption({ Icon, text }) {
  return (
    <div className='group relative cursor-pointer'>
        <div className="group-hover:flex hidden absolute bottom-12 right-[-8px] bg-gray-400 rounded-sm px-1 w-fit">
            <h1 className='text-white'>{text}</h1>
        </div>
        <div className="group-hover:bg-[#E6E7E7] rounded-full p-1">
            <Icon className="!text-3xl" />
        </div>
    </div>
  )
}
