import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
    const state = ref({
        navDrawer: false,
        settingDrawer: false,
        darkTheme: true,
    });

    const toggleNavDrawer = () => {
        state.value.navDrawer = !state.value.navDrawer;
    };

    const toggleSettingDrawer = () => {
        state.value.settingDrawer = !state.value.settingDrawer;
    };

    const switchTheme = (isDark: boolean) => {
        state.value.darkTheme = isDark;
    };

    return {
        state,
        toggleNavDrawer,
        toggleSettingDrawer,
        switchTheme,
    };
});
