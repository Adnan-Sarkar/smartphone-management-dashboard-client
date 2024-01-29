export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  operatingSystem: "iOS" | "Android";
  storage: {
    ROM:
      | "2GB"
      | "4GB"
      | "8GB"
      | "16GB"
      | "32GB"
      | "64GB"
      | "128GB"
      | "256GB"
      | "1TB";
    RAM: "2GB" | "4GB" | "8GB" | "16GB" | "32GB" | "64GB" | "128GB" | "256GB";
  };
  screenSize: string;
  battery: string;
  camera: {
    front: string;
    back: string;
  };
  processor: {
    type: string;
    speed: string;
  };
  rating: number;
  colors?: string[];
  chargingType: string;
  weight: string;
  details: string;
  discount: boolean;
  productImage: string;
  _id: string;
};

export type TProductState = {
  products: TProduct[];
  totalProducts: number;
};
