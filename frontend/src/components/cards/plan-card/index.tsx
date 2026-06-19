import { PlanItem } from "@/src/core/apis/@types";
import { useCheckoutStore } from "@/src/core/store";

  
  export default function PlanCard({ plan }: { plan: PlanItem }) {
    // store
    const { 
      addCheckoutProduct, 
      removeCheckoutProduct, 
      updateCheckoutStore, 
      resetCheckoutStore, 
      plan: storedPlan, 
      ...products 
    } = useCheckoutStore();
    
    const addPlan = () => {
      updateCheckoutStore({
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
          billingPeriod: plan.billingPeriod,
        }
      });
    }

    return (
      <div
        className={`
          relative flex flex-col justify-between w-[361px] rounded-xl border-2 bg-white p-6
          ${plan.id === storedPlan?.id ? 'border-primary' : 'border-primary/30'}
        `}
      >
        <div>
            {plan.recommended && (
                <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Most Popular
            </div>
            )}
    
            {/* Header */}
            <div className="mb-6">
            <h4 className="text-[22px] font-bold text-textPrimary-200">
                Cam {plan.name}
            </h4>
    
            <p className="mt-1 text-sm text-textSecondary-100">
                {plan.description}
            </p>
            </div>
    
            {/* Price */}
            <div className="mb-6">
            <span className="text-[42px] font-bold text-textPrimary-200">
                ${plan.price}
            </span>
    
            <span className="ml-1 text-sm text-textSecondary-100">
                /{plan.billingPeriod}
            </span>
            </div>
    
            {/* Included Cameras */}
            <div className="mb-6 rounded-lg bg-primary-light-100 p-3">
            <p className="text-sm font-medium text-primary">
                {plan.camerasIncluded} Cameras Included
            </p>
            </div>
    
            {/* Features */}
            <ul className="mb-8 flex flex-col gap-3">
            {plan.features.map((feature) => (
                <li
                key={feature}
                className="flex items-start gap-3 text-sm text-textPrimary-200"
                >
                <div className="mt-1 h-2 w-2 rounded-full bg-success" />
                <span>{feature}</span>
                </li>
            ))}
            </ul>
        </div>
  
        {/* Actions */}
        <button
          onClick={addPlan}
          className={`
            w-full rounded-lg py-3 text-sm font-semibold transition cursor-pointer
            ${
                plan.id === storedPlan?.id
                ? 'bg-primary text-white'
                : 'border border-primary text-primary'
            }
          `}
        >
          Select Plan
        </button>
      </div>
    );
  }