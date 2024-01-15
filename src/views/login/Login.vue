<template>
    <v-container class="fill-height d-flex align-center">
        <v-row justify="center">
            <v-card
                min-width="360px"
                rounded
            >
                <v-card-title class="my-3">
                    {{ t('login.title') }}
                </v-card-title>

                <v-card-text>
                    <v-form validate-on="input">
                        <!-- Email -->
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="form.username.value.value"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    :error-messages="form.username.errorMessage.value"
                                    :label="t('login.input_label_username')"
                                    autocomplete="username"
                                    hide-details="auto"
                                    variant="outlined"
                                    autofocus
                                    required
                                />
                            </v-col>
                        </v-row>

                        <!-- Password -->
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="form.password.value.value"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :error-messages="form.password.errorMessage.value"
                                    :label="t('login.input_label_password')"
                                    autocomplete="current-password"
                                    hide-details="auto"
                                    variant="outlined"
                                    required
                                    @keyup.enter="onSubmit()"
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-divider />

                <v-card-actions>
                    <v-btn
                        rounded="xs"
                        block
                        :loading="loading"
                        type="submit"
                        @click="onSubmit()"
                    >
                        {{ t('login.button_login') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {
    useField,
    useForm,
} from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

import { AuthService } from '@/api/auth';
import { useAuthStore } from '@/store/auth';
import { useNotifierStore } from '@/store/notifier';
import { Auth } from '@/types/auth';

const { t } = useI18n();
const notifierStore = useNotifierStore();
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);

const { handleSubmit } = useForm<Auth.Login.Request>({
    validationSchema: yup.object({
        username: yup
            .string()
            .required(t('input.error_required')),
        password: yup
            .string()
            .required(t('input.error_required')),
    }),
});

const form = {
    username: useField('username'),
    password: useField('password'),
};

const doLogin = async (data: Auth.Login.Request) => {
    try {
        const user = await AuthService.login(data);

        // set token
        authStore.setToken(user.token);

        // set storage user
        authStore.setUser(user);

        // change route
        router.push('/');
    } catch (err) {
        notifierStore.error({
            content: t('login.message_login_fail'),
        });
    }
};

const onSubmit = handleSubmit(async (data) => {
    loading.value = true;
    await doLogin(data);
    loading.value = false;
});
</script>
