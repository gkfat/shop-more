<template>
    <v-app>
        <router-view />
        <Notifier />
    </v-app>
</template>

<script lang="ts" setup>
import {
    computed,
    onMounted,
    watch,
} from 'vue';

import { useTheme } from 'vuetify';

import Notifier from '@/components/notifier/Notifier.vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const theme = useTheme();
const currentTheme = computed(() => (appStore.state.darkTheme ? 'dark' : 'light'));

const setTheme = (themeValue: 'dark' | 'light') => {
    document.documentElement.setAttribute('data-color-theme', themeValue);

    theme.global.name.value = themeValue;
};

watch((currentTheme), () => setTheme(currentTheme.value));

onMounted(async () => {
    // Set theme on App init
    setTheme(currentTheme.value);
});
</script>
