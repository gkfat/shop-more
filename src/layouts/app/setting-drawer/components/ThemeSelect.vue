<template>
    <v-list-item
        prepend-icon="mdi-theme-light-dark"
        :title="t('app_setting.section_title_theme_setting')"
    />
    <v-radio-group
        hide-details
        :model-value="isDark"
    >
        <v-radio
            :value="true"
            @click="appStore.switchTheme(true)"
        >
            <template #label>
                <v-list-item
                    prepend-icon="mdi-weather-night"
                >
                    <v-list-item-title>{{ t('theme.darkmode') }}</v-list-item-title>
                </v-list-item>
            </template>
        </v-radio>
        <v-radio
            :value="false"
            @click="appStore.switchTheme(false)"
        >
            <template #label>
                <v-list-item
                    prepend-icon="mdi-white-balance-sunny"
                >
                    <v-list-item-title>
                        {{ t('theme.lightmode') }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-radio>
    </v-radio-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import { useAppStore } from '@/store/app';

const { t } = useI18n();
const appStore = useAppStore();
const isDark = computed(() => appStore.state.darkTheme);
</script>
