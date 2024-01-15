<template>
    <v-app-bar
        extended
    >
        <v-app-bar-title
            class="text-center"
        >
            <v-btn
                variant="plain"
                class="text-h5"
                @click="router.push('/')"
            >
                {{ t('app.title') }}
            </v-btn>
        </v-app-bar-title>

        <template #extension>
            <v-app-bar-nav-icon
                @click="appStore.toggleNavDrawer()"
            />

            <v-spacer />

            <!-- Not login -->
            <v-btn
                v-if="!user"
                variant="flat"
                color="warning"
                :text="t('app.button_login')"
                @click="router.push('/login')"
            />
            <AppButtonAvatar />
        </template>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';

import AppButtonAvatar from './components/AppButtonAvatar.vue';

const appStore = useAppStore();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const user = computed(() => authStore.state.user);
</script>
