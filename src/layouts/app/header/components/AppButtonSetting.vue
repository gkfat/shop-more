<template>
    <v-tooltip bottom>
        <template #activator="{ on, attrs }">
            <v-btn
                icon
                class="px-0 px-md-2"
                v-bind="attrs"
                v-on="on"
                @click="appStore.toggleSettingDrawer()"
            >
                <v-icon> mdi-dots-vertical </v-icon>
            </v-btn>
        </template>
    </v-tooltip>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>
