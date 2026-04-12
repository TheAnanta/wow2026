import { defineConfig } from 'next-intl/config';

export default defineConfig({
    // This points to the request file we created earlier
    i18n: './src/i18n/request.ts'
});