<script setup lang="ts">
import SecurityBanner from './components/SecurityBanner.vue';
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex flex-col">
        <!-- Header -->
        <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="text-xl">⚡</span>
                    <span class="font-semibold text-slate-800 text-sm tracking-wide uppercase">PIX Generator</span>
                </div>
                <nav class="flex space-x-1">
                    <router-link
                        to="/"
                        class="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 transition-colors"
                        active-class="bg-slate-100 !text-slate-900"
                    >
                        Generator
                    </router-link>
                    <router-link
                        to="/receivers"
                        class="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 transition-colors"
                        active-class="bg-slate-100 !text-slate-900"
                    >
                        Receivers
                    </router-link>
                </nav>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
            <router-view />
        </main>

        <!-- Footer -->
        <footer class="bg-slate-100 border-t border-slate-200 py-6">
            <div class="max-w-4xl mx-auto px-4">
                <SecurityBanner />
            </div>
        </footer>
    </div>
</template>
