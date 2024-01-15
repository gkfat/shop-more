import { Carts } from '@/types/cart';

import { request } from './util/agent';
import { ApiRoutes } from './util/api-route';

const agent = request();

export class CartService {
    static async listCart(
        data: Carts.ListCart.Reqeust,
    ): Promise<Carts.ListCart.Response> {
        return agent({
            method: 'get',
            url: `${ApiRoutes.carts.list}/${data.id}`,
        });
    }
}
