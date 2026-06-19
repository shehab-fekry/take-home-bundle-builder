'use client';

import Image from 'next/image'
import { AiOutlineSafety } from 'react-icons/ai'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import Divider from '../divider'
import Counter from '../counter'
import { useCheckoutStore } from '@/src/core/store'
import { SelectedProduct } from '@/src/core/store/@types'
import { FaInfoCircle } from 'react-icons/fa';

const Summery = ({ setStep }:{ setStep: Dispatch<SetStateAction<string>> }) => {
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
    // states
    const [systemStatus, setSystemStatus] = useState<'saved' | 'reseted' | null>(null);
    // vars
    const totalOriginalPrice = useMemo(() => {
        return Object.values(products)
        .flatMap((items) => items ?? [])
        .reduce(
            (sum, item) => sum + (item.original_price ?? 0) * item.quantity,
            0
        );
    }, [products]);
    const totalDiscountedPrice = useMemo(() => {
        return Object.values(products)
        .flatMap((items) => items ?? [])
        .reduce(
            (sum, item) => sum + (item.discounted_price ?? 0) * item.quantity,
            0
        );
    }, [products]);
    const totalPrice = totalDiscountedPrice + (plan?.price || 0);
    const accessKeys = Object.keys(products);
    const cachedCheckout = localStorage.getItem('checkoutStore');

    
    const onAddProduct = (product: SelectedProduct, accessKey: string) => {
        addCheckoutProduct({
            id: product.id,
            name: product.name,
            color: product.color,
            original_price: product.original_price,
            discounted_price: product.discounted_price,
        }, accessKey)
    }

    const onMinusProduct = (product: SelectedProduct, accessKey: string) => {
        removeCheckoutProduct(product.id, product.color!.color, accessKey);
    }

    return (
        <section className='h-fit xl:w-[30%] border-none bg-primary-light-100 rounded-t-xl py-4 px-6'>
            <p className='text-[12px] font-normal text-textSecondary-200 tracking-wide'>REVIEW</p>
            <div className='flex flex-col mt-2'>
                <h1 className='text-[22px] font-semibold text-textPrimary-200 tracking-wide'>Your security system</h1>
                <p className='text-[14px] font-normal text-primary-200/75'>Review your personalized protection system designed to keep what matters most safe.</p>
            </div>
            {/* products */}
            {accessKeys.map(accessKey => {
                const productList = products[accessKey as keyof typeof products];
                return (
                    <div key={accessKey}>
                        <Divider />
                        <div className='mt-3'>
                            <p className='text-[12px] uppercase text-textSecondary-300 mb-2'>{accessKey}</p>
                            <div className='flex flex-col gap-2'>
                                {!productList?.length ? (
                                    <div
                                    className='flex flex-row items-center justifycenter gap-2 p-2 w-full text-[13px] text-primary font-semibold cursor-pointer rounded-lg hover:bg-white'
                                    onClick={() => setStep(accessKey)}
                                    >
                                        <FaInfoCircle size={15} />
                                        <p className='mt-0.5'>Try to add {accessKey}</p>
                                    </div>
                                ) :  productList?.map(prod => (
                                    <div key={'prod_' + prod.id + prod.color?.color} className='flex flex-row items-center justify-between'>
                                        <div className='h-full w-[60%] flex flex-row items-center justify-start gap-3'>
                                            <div className='flex items-center justify-center bg-white h-[41px] w-[41px] rounded-md'                                                                                                                                                                                                   >
                                                <Image src={prod.color?.url ?? ''} width={35} height={35} alt={prod.name} unoptimized/>
                                            </div>
                                            <p className='text-[14px] font-normal text-textPrimary-100'>{prod.name}</p>
                                        </div>
                                        <div className='h-full w-[40%] flex flex-row justify-end gap-5'>
                                            <Counter 
                                            count={prod.quantity} 
                                            onMinus={() => onMinusProduct(prod, accessKey)} 
                                            onAdd={() => onAddProduct(prod, accessKey)} 
                                            />
                                            <div className='flex flex-col justify-center leading-none'>
                                                {prod.original_price && <p className='text-[16px] text-textSecondary-100 leading-none line-through'>${prod.original_price}</p>}                                                                                             
                                                {prod.discounted_price && <p className='text-[16px] text-primary'>${prod.discounted_price}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* plan */}
            <Divider />
            <div className='mt-3'>
                <p className='text-[12px] uppercase text-textSecondary-300 mb-2'>plan</p>
                {plan ? (
                    <div className='flex flex-row items-center justify-between'>
                        <div className='h-full w-[70%] flex flex-row items-center justify-start gap-1'>
                            <AiOutlineSafety className='w-[20px] h-[23px] text-blue' />
                            <p className='text-[16px] font-bold text-textPrimary-100 mt-1 tracking-wide'>Cam <span className='text-primary'>{plan?.name}</span></p>
                        </div>
                        <div className='flex flex-col leading-none font-semibold'>
                            {/* <p className='text-[16px] text-textSecondary-100 line-through'>$100/mo</p> */}
                            <p className='text-[16px] text-primary'>${plan?.price}/{plan?.billingPeriod}</p>
                        </div>
                    </div>
                ) : (
                    <div 
                    className='flex flex-row items-center justifycenter gap-2 p-2 w-full text-[13px] text-primary font-semibold cursor-pointer rounded-lg hover:bg-white'
                    onClick={() => setStep('plans')}
                    >
                        <FaInfoCircle size={15} />
                        <p className='mt-0.5'>Try to add plan</p>
                    </div>
                )}
            </div>
            {/* Fast Shipping */}
            <Divider />
            <div className='flex flex-row items-center justify-between mt-3'>
                <div className='h-full w-[60%] flex flex-row items-center justify-start gap-3'>
                    <div className='flex items-center justify-center bg-white h-[41px] w-[41px] rounded-md'                                                                                                                                                                                                   >
                        <LiaShippingFastSolid className=' w-[25px] h-[25px] text-success' />
                    </div>
                    <p className='text-[14px] font-normal text-textPrimary-100'>Fast Shipping</p>
                </div>
                <div className='flex flex-col leading-none'>
                    <p className='text-[16px] text-textSecondary-100 leading-none line-through'>$100</p>                                                                                             
                    <p className='text-[16px] text-primary'>$190</p>
                </div>
            </div>
            {/* Total */}
            <div className='flex flex-row items-center justify-between mt-3'>
                <div className='h-[78px] w-[78px]'                                                                                                                                                                                                   >
                    <Image src={'/images/badge.png'} width={100} height={100} alt='' unoptimized/>
                </div>
                <div className='flex flex-col gap-2 leading-none'>
                    <div className='text-[12px] text-center bg-primary text-white font-semibold py-1 rounded-sm'>
                        as low as $19.19/mo
                    </div>
                    <div className='flex flex-row items-center justify-end gap-2'>
                        {totalOriginalPrice !== 0 && <p className='text-[18px] text-textSecondary-100 font-medium leading-none line-through'>${totalOriginalPrice.toFixed(2)}</p> }                                                                                            
                        <p className='text-[24px] font-bold text-primary'>${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            {/* actions */}
            <div className='flex flex-col items-center justify-center gap-2 mt-3'>
                <p className='text-[12px] text-success font-semibold'>Congrats! You’re saving $50.92 on your security bundle!</p>
                <button
                className={`w-full rounded-lg py-3 text-[17px] font-bold transition cursor-pointer bg-primary text-white`}
                >
                    Checkout
                </button>
                <p 
                className='text-[12px] text-textSecondary-200 font-normal underline cursor-pointer'
                onClick={() => {
                    if(!cachedCheckout && systemStatus !== 'saved'){
                    saveCheckoutStore();
                        setSystemStatus('saved'); 
                        
                    } else if(cachedCheckout && systemStatus === null) {
                        resetCheckoutStore();
                        setSystemStatus('reseted')
                    }
                }}
                >
                    {!cachedCheckout && systemStatus !== 'saved' 
                    ? 'Save my system for later' 
                    : systemStatus === 'saved' 
                    ? 'Saved!' 
                    : cachedCheckout && systemStatus === null 
                    && 'Reset system storage'
                    } 
                </p>
            </div>

        </section>
    )
}

export default Summery