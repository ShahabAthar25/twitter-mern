import HomeIcon from '@mui/icons-material/Home';
import SidebarOption from './SidebarOption';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

export default function Sidebar() {
  return (
    <div className='fixed bottom-0 left-0 flex items-center justify-center border-t-2 w-screen py-3'>
        <div className="flex items-center justify-between space-x-8 w-[80%] max-w-xs">
            <SidebarOption Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsOutlinedIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineOutlinedIcon} text="Messages" />
        </div>
    </div>
  )
}
