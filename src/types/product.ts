export namespace Products {
    export interface Product {
        id: number;
        title: string;
        price: number;
        quantity: number;
        total: number;
        discountPercentage: number;
        discountedPrice: number;
        thumbnail: string;
    }
}
