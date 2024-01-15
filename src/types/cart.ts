import { Products } from './product';

export namespace Carts {
    export interface Cart {
        id: number;
        products: Products.Product[];
        total: number;
        discountedTotal: number;
        userId: number;
        totalProducts: number;
        totalQuantity: number;
    }

    export namespace ListCart {
        export interface Reqeust {
            id: number;
        }

        export interface Response {
            total: number;
            skip: number;
            limit: number;
            carts: Cart[];
        }
    }
}
