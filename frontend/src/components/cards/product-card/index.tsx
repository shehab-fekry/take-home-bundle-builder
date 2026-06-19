import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/libs/utils';
import { AccessoryItem, cameraItem, SensorItem } from '@/src/core/apis/@types';
import Counter from '../../counter';
import { useCheckoutStore } from '@/src/core/store';

const ProductCard = ({ 
    product,
    accessKey,
} : { 
    product: cameraItem | SensorItem | AccessoryItem;
    accessKey: string;
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
    // state
    const [selectedColor, setSelectedColor] = useState<{color: string, url: string} | null>(product.colors[0]);
    // vars
    const productList = products[accessKey as keyof typeof products];
    
    
    const onAddProduct = () => {
        addCheckoutProduct({
            id: product.id,
            name: product.name,
            color: selectedColor || {color: undefined, url: product.url},
            original_price: product.original_price,
            discounted_price: product.discounted_price,
        }, accessKey)
    }

    const onMinusProduct = () => {
        removeCheckoutProduct(product.id, selectedColor?.color || undefined, accessKey);
    }

    const productQuantity = useMemo(() => {
        return productList?.find(prod => {
            return prod.id === product.id && prod.color?.color === selectedColor?.color;
        })?.quantity
    }, [product, productList, selectedColor]);

    const isActive = useMemo(() => {
        return productList?.find(prod => prod.id === product.id);
    }, [product, productList]);

    return (
        <div 
        key={product.id} 
        className={cn(
            'bg-white  flex flex-row w-[361px] min-h-[160px] rounded-xl',
            isActive?.id === product.id && 'outline-2 outline-primary/70'
        )}>
            {/* image */}
            <div className='relative w-[30%] flex items-center justify-center'>
                {product.discount_percentage && <div className='absolute top-2 left-2 text-[12px] bg-primary text-white font-semibold px-2 py-0.5 rounded-xl'>
                    Save {product.discount_percentage}%
                </div>}
                <Image src={product.url} width={85} height={100} alt={product.name} unoptimized/>
            </div>
            {/* details */}
            <div className='w-[70%] flex flex-col justify-between p-3'>
                <div>
                <p className='text-[16px] font-bold text-textPrimary-200'>{product.name}</p>
                <p className='text-[12px] text-textPrimary-200/75 leading-4'>{product.description}</p>
                <Link href='/' className='underline text-[12px] font-medium text-primary'>learn more</Link>
                {product?.colors?.length !== 0 && (
                    <div className='flex flex-row gap-2 my-1'>
                    {product?.colors?.map((color) => (
                        <div 
                        key={color.color}
                        onClick={() => setSelectedColor(color)}
                        className={cn('flex flex-row items-center justify-center gap-1 text-[10px] font-medium border border-textSecondary-300 py-0.5 px-1 cursor-pointer', color.color === selectedColor?.color && 'border-success bg-success/5' )}
                        >
                            <Image src={color.url} width={22} height={22} alt={color.color} unoptimized/>
                            {color.color}
                        </div>
                    ))}
                    </div>
                )}
                </div>
                {/* controls & price */}
                <div className=' flex flex-row justify-between'>
                    <Counter 
                    className={cn('bg-primary-light-200')} 
                    count={productQuantity || 0} 
                    onMinus={onMinusProduct} 
                    onAdd={onAddProduct} 
                    />
                    <div className='flex flex-col leading-4 justify-center'>
                        {product.original_price && <p className='text-[16px] text-error line-through'>${product.original_price}</p>}
                        {product.discounted_price && <p className='text-[16px] text-textPrimary-200/75'>${product.discounted_price}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard