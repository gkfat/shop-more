<template>
    <v-navigation-drawer
        v-model="appStore.state.settingDrawer"
        temporary
        location="right"
    >
        <!-- User Avatar -->
        <v-container
            v-if="user"
            class="text-center"
        >
            <v-avatar
                color="primary"
                class="mb-2"
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

            <p class="text-primary">
                {{ user.firstName }} {{ user.lastName }}
            </p>
        </v-container>

        <v-divider />

        <v-list nav>
            <ThemeSelect />

            <v-divider class="my-1" />

            <!-- 購物車 -->
            <v-list-item
                prepend-icon="mdi-cart-outline"
                :title="t('app.button_cart')"
                @click="router.push('/user/cart');"
            />

            <v-divider class="my-1" />

            <!-- 登出 -->
            <v-list-item
                prepend-icon="mdi-logout-variant"
                :title="t('app.button_logout')"
                @click="logout()"
            />
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';

import ThemeSelect from './components/ThemeSelect.vue';

const appStore = useAppStore();
const authStore = useAuthStore();

const { t } = useI18n();

const router = useRouter();
const user = computed(() => authStore.state.user);

const avatarAlternative = computed(() => {
    if (user.value?.firstName) {
        return user.value.firstName[0].toUpperCase();
    }

    return '';
});

const logout = async () => {
    await authStore.logout();
    router.push('/login');
};
</script>

<style lang="scss" scoped>
.theme--dark.v-application {
    .v-navigation-drawer{
        background-color: rgb(39, 39, 39);
        border-color: rgb(39, 39, 39);
    }
}
</style>
