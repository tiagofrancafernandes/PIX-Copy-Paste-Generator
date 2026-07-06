<template>
    <div class="space-y-4 text-slate-500">
        <div
            class="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-md text-xs leading-relaxed"
        >
            <span class="text-base select-none mt-0.5">🛡️</span>
            <div class="space-y-2">
                <p class="font-medium text-slate-700">Data Privacy &amp; Security Statement</p>
                <p>
                    Your data is completely safe. All PIX keys and receiver configurations are stored only in your
                    browser using
                    <code class="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-mono">LocalStorage</code>
                    . Nothing is sent to our servers except during code generation.
                </p>
                <p>
                    The API endpoint receives only the values required to construct the payload, dynamically builds the
                    PIX EMV code, and immediately returns the payload without persisting any parameters.
                </p>
            </div>
        </div>

        <div class="flex justify-between items-center text-xs">
            <span class="font-medium">PIX Copy &amp; Paste Generator v1.0.0</span>
            <a
                href="https://github.com/tiagofrancafernandes/PIX-Copy-Paste-Generator"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 hover:text-primary-700 hover:underline flex items-center space-x-1 transition-colors"
            >
                <span>GitHub Repository</span>
                <span class="text-[10px]">↗</span>
            </a>
        </div>
    </div>
</template>
