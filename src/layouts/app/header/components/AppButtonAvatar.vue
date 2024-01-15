<template>
    <div
        v-if="user"
        class="d-flex ga-3 flex-no-wrap align-center me-3"
    >
        <p>
            {{ t('app.message_greetings') }}{{ user.firstName }}
        </p>

        <!-- cart -->
        <v-badge
            color="error"
            :content="cartList.length"
            btn
            @click="router.push('/user/cart')"
        >
            <v-btn
                flat
                icon="mdi-cart-outline"
            />
        </v-badge>

        <!-- user -->
        <v-btn
            icon
            @click="appStore.toggleSettingDrawer()"
        >
            <v-avatar
                color="primary"
                :size="36"
            >
                <v-img
                    v-if="user.image"
                    alt="avatar"
                    :src="user.image"
                />
                <span
                    v-else
                    class="white--text font-weight-bold"
                >
                    {{ avatarAlternative }}
                </span>
            </v-avatar>
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    onMounted,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { CartService } from '@/api/cart';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { Carts } from '@/types/cart';

const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const { t } = useI18n();
const user = computed(() => authStore.state.user);
const cartList = ref([] as Carts.Cart[]);

const avatarAlternative = computed(() => {
    if (user.value?.firstName) {
        return user.value.firstName[0].toUpperCase();
    }

    return '';
});

const listCart = async () => {
    const { carts } = await CartService.listCart({ id: user.value!.id });
    cartList.value = carts;
};

onMounted(async () => {
    if (user.value) {
        await listCart();
    }
});
</script>
