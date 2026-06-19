import { create } from "zustand";
import { ICheckoutAction, ICheckoutState, ICheckoutStateOmitted, SelectedProduct } from "./@types";


const initialState: ICheckoutState = {
    cameras: null,
    sensors: null,
    accessories: null,
    plan: null
};



type ICheckoutStore = ICheckoutState & ICheckoutAction;

export const useCheckoutStore = create<ICheckoutStore>((set, get) => {
  return (
    {
      ...initialState,
      saveCheckoutStore: () => {
        localStorage.setItem('checkoutStore', JSON.stringify({ checkoutStore: get() }));
      },
      loadCheckoutStore: () => {
        const stored = localStorage.getItem('checkoutStore');
        if (stored) {
          const data = JSON.parse(stored);
          set({...data.checkoutStore});
        }
      },
      resetCheckoutStore: () => {
        localStorage.clear();
      },
      updateCheckoutStore: (newState: Partial<ICheckoutState>) => {
        set((prevState: ICheckoutState) => ({ ...prevState,  ...newState}));
      },
      addCheckoutProduct: (product: Partial<SelectedProduct>, accessKey: string) => {
        set((prevState: ICheckoutStateOmitted) => {
          const targetedList = prevState[accessKey as keyof typeof prevState];
          if (!targetedList) {
              return {
                ...prevState,
                [accessKey]: [{...product, quantity: 1}],
              };
            }
            
            const existingProduct = targetedList.find(prod => prod.id === product.id && product.color?.color === prod.color?.color);
  
            const updatedList = existingProduct
              ? targetedList.map((prod) =>
                  prod.id === product.id && prod.color?.color === product.color?.color
                    ? {
                        ...prod,
                        quantity: prod.quantity + 1,
                      }
                    : prod
                )
              : [...targetedList, {...product, quantity: 1}];
        
            return {
              ...prevState,
              [accessKey]: updatedList,
            };
          });
        },
      removeCheckoutProduct: (productId: number, color: string | undefined, accessKey: string) => {
        set((prevState: ICheckoutStateOmitted) => {
          const newState = {...prevState};
          const targetedList = newState[accessKey as keyof typeof newState];
              if(!targetedList) return {...prevState};
              
              // find targeted product
              const productIndex = targetedList.findIndex(prod => prod.id === productId && prod.color?.color === color);
              const product = productIndex >= 0 ? targetedList[productIndex] : null;
              
              // update list
              const updatedList = product?.quantity === 1 
              ? targetedList.filter(prod => !(prod.id === productId && prod.color?.color === color)) 
              : targetedList.map(prod => prod.id === productId && prod.color?.color === color ? 
                  {
                      ...prod,
                      quantity: prod.quantity - 1,
                  }
                  : prod);  

              newState[accessKey as keyof typeof newState] = updatedList;
              return {...newState};
          });
      },
  }
  );
})