import { useCheckoutStore } from '@/src/core/store';
import { ReactNode, useMemo } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const AccordionHeader = ({ 
    step, 
    icon, 
    title, 
    accessKey 
} : {
    step: number,
    icon: ReactNode,
    title: string,
    accessKey: string,
}) => {
    // store
    const { 
        addCheckoutProduct, 
        removeCheckoutProduct, 
        updateCheckoutStore, 
        resetCheckoutStore, 
        saveCheckoutStore,
        loadCheckoutStore,
        plan, 
        ...products 
    } = useCheckoutStore();
    
    const ProductsCount = useMemo(() => {
        return [...new Set(products[accessKey as keyof typeof products]?.map(prod => prod.id))].length;
    }, [accessKey, products]);
            
    return (
        <div className='flex flex-col gap-2'>
            <p className='border-b text-[12px] font-normal text-start text-textSecondary-200 px-4'>STEP {step} of 4</p>
            <div className='w-full flex flex-row justify-between items-center px-4'>
                <div className='flex flex-row gap-2 items-center'>
                    {icon}
                    <p className='text-[22px] font-semibold mt-1 tracking-wide'>{title}</p>
                </div>
                <div className='flex flex-row items-center'>
                    <p className='text-[14px] font-medium text-primary'>{ProductsCount} selected</p>
                    <MdOutlineArrowDropDown className='text-primary w-6 h-6 chevron' />
                </div>
            </div>
        </div>
    )
}

export default AccordionHeader