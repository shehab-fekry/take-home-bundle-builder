import { AiOutlineSafety } from "react-icons/ai";
import { BiCameraHome } from "react-icons/bi";
import { BsShieldPlus } from "react-icons/bs";
import { MdSensors } from "react-icons/md";

export const CATEGORIES = [
    {
      index:0,
      accessKey: 'cameras',
      title: 'Choose your cameras', 
      icon: <BiCameraHome className='w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] text-textSecondary-100' />,
    },
    {
      index:1,
      accessKey: 'sensors',
      title: 'Choose your sensors', 
      icon: <MdSensors className='w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] text-textSecondary-100' />,
    },
    {
      index:2,
      accessKey: 'accessories',
      title: 'Add extra protection', 
      icon: <BsShieldPlus className='w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] text-textSecondary-100' />,
    },
    {
      index:3,
      accessKey: 'plans',
      title: 'Choose your plan', 
      icon: <AiOutlineSafety className='w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] text-textSecondary-100' />,
    },
  ]