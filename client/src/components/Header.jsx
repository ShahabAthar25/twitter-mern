import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

export default function Header() {
  return (
    <div className='flex items-center justify-between px-4 py-2 sticky top-0 left-0 backdrop-blur-3xl'>
      <div className="flex items-center space-x-5">
        <AccountCircleIcon className='!text-4xl text-gray-400' />
        <h1 className='font-bold text-lg'>Home</h1>
      </div>
      <div className='flex flex-col hover:bg-[#E6E7E7] hover:rounded-full px-4 py-2 transition-all duration-200 cursor-pointer'>
        <StarBorderOutlinedIcon className='!text-sm' />
        <StarBorderOutlinedIcon className='!text-xl' />
      </div>
    </div>
  )
}
