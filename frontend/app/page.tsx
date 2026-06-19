'use client'

import { useEffect, useState } from 'react';
import { Accordion } from '@szhsin/react-accordion';

import { useGetDataQuery } from '@/src/core/apis/get-data';
import AccordionHeader from '@/src/components/accordion/accordion-header';
import AccordionItem from '@/src/components/accordion/accordion-item';
import { CATEGORIES } from '@/src/core/constants';
import ProductCard from '@/src/components/cards/product-card';
import PlanCard from '@/src/components/cards/plan-card';
import { PlanItem, ProductItem } from '@/src/core/apis/@types';
import Summery from '@/src/components/summery';
import { useCheckoutStore } from '@/src/core/store';
import Spinner from '@/src/components/spinner';

export default function Home() {
  // apis
  const { data, isPending } = useGetDataQuery();
  // store
  const { loadCheckoutStore } = useCheckoutStore();
  // states
  const [step, setStep] = useState('cameras');

  // loade stored data (Persistence "Save my system for later")
  useEffect(() => {
    loadCheckoutStore();
  },[])

  if(!data && isPending) return <div className='w-full h-screen flex items-center justify-center'><Spinner /></div>;

  if(!data && !isPending) return <div className='w-full h-screen flex items-center justify-center'>Somthing Went Wrong!</div>;

  const openItem = (itemKey: string) => {
    setStep(itemKey);
  };

  return (
    <div className='w-full flex flex-col items-center px-5 py-8 sm:items-start sm:py-14 sm:gap-10 md:px-10 xl:flex-row 2xl:px-30 '>
      <h1 className='text-[32px] font-bold text-textPrimary-200 block sm:hidden'>Let’s get started!</h1>
     {/* Category accordions */}
      <section className=' xl:w-[70%] mt-5 sm:mt-0'>
        <Accordion 
        transition
        transitionTimeout={250}
        className='flex flex-col gap-4'>
          {CATEGORIES.map(cat => (
            <AccordionItem 
            key={cat.title}
            disabled={cat.accessKey !== step}
            initialEntered={cat.accessKey === step}
            header={
              <AccordionHeader 
              step={cat.index + 1} 
              title={cat.title} 
              icon={cat.icon} 
              accessKey={cat.accessKey}
              />
            }>
              {cat.accessKey === 'plans' ? (
                // plans
                <div className='flex flex-col items-center gap-2'>
                  <div className='flex flex-wrap gap-4 justify-center'>
                    {data[cat.accessKey as keyof typeof data]?.map((plan) => (
                      <PlanCard key={plan.id} plan={plan as PlanItem} />
                    ))}
                  </div>
                    {/* Action */}
                    <button
                    onClick={() => openItem(CATEGORIES[cat.index + 1]?.title  ? CATEGORIES[cat.index + 1].accessKey : 'cameras')}
                    className={`w-62 rounded-lg py-3 my-3 text-[18px] font-semibold transition cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white`}
                    >
                      {CATEGORIES[cat.index + 1]?.title ? `Next: ${CATEGORIES[cat.index + 1]?.title}` : 'Go To Top'}
                    </button>
                </div>
              ) : (
                // products
                <div className='flex flex-col items-center gap-2'>
                      <div className='w-full flex flex-wrap gap-4 justify-center'>
                        {data[cat.accessKey as keyof typeof data]?.map((product) => (
                          <ProductCard key={product.id} product={product as ProductItem} accessKey={cat.accessKey} />
                        ))}
                      </div>
                      {/* Action */}
                      {CATEGORIES[cat.index + 1]?.title && (
                        <button
                        onClick={() => openItem(CATEGORIES[cat.index + 1].accessKey)}
                        className={`w-62 rounded-lg py-3 my-3 text-[18px] font-semibold transition cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white`}
                        >
                          Next: {CATEGORIES[cat.index + 1]?.title}
                        </button>
                      )}
                  </div>
                )}
            </AccordionItem>

          ))}
        </Accordion>
      </section>
      {/* Summery */}
      <Summery setStep={setStep}/>
    </div>
  );
}
