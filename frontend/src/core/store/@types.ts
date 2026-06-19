export interface SelectedProduct {
    id: number;
    name: string;
    quantity: number;
    color: {color: string | undefined, url: string} | null;
    original_price: number | null;
    discounted_price: number;
  }
  

  
  export interface SelectedPlan {
    id: string;
    name: string;
    price: number;
    billingPeriod: string;
  }
  
  export interface ICheckoutState {
    cameras: SelectedProduct[] | null;
    sensors: SelectedProduct[] | null;
    accessories: SelectedProduct[] | null;
    plan: SelectedPlan | null;
  }
  export type ICheckoutStateOmitted = Omit<ICheckoutState, 'plan'>;

  export interface ICheckoutAction {
    saveCheckoutStore: () => void;
    loadCheckoutStore: () => void;
    resetCheckoutStore: () => void;
    updateCheckoutStore: (newState: Partial<ICheckoutState>) => void,
    addCheckoutProduct: (product: Partial<SelectedProduct>, accessKey: string) => void;
    removeCheckoutProduct: (productId: number, color: string | undefined, accessKey: string) => void;
  }