export interface cameraItem {
    id: number;
    name: string;
    url: string;
    description: string | null;
    colors: {color: string, url: string}[];
    original_price: number | null;
    discounted_price: number;
    discount_percentage: number | null;
    quantity: number;
  }
  
  export interface SensorItem extends cameraItem {
    required: boolean;
  }
  
  export interface AccessoryItem extends cameraItem {
    required?: boolean;
  }
  
  export interface PlanItem {
    id: string;
    name: string;
    description: string;
    price: number;
    billingPeriod: string;
    camerasIncluded: number | string;
    features: string[];
    recommended?: boolean;
  }

  export type ProductItem = cameraItem | SensorItem | AccessoryItem;

  interface Data {
    cameras: cameraItem[];
    sensors: SensorItem[];
    accessories: AccessoryItem[];
    plans: PlanItem[];
  }
  
  export interface IResponse {
    data: Data;
    message?: string;
  }