/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#0d9488',
                    600: '#0f766e',
                    700: '#115e59',
                    800: '#134e4a',
                    900: '#115e59',
                },
            },
        },
    },
    plugins: [],
};
