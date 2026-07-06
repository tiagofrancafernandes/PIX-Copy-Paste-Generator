## Deploy to Vercel

This project is configured as a **monorepo** with a client built by Vite and a serverless API located in the `api` folder.

1. **Install the Vercel CLI** (if you haven't already):
   ```bash
   npm i -g vercel
   ```
2. **Login / Link your project**:
   ```bash
   vercel login               # Authenticate with your Vercel account
   vercel link                # Choose or create a Vercel project for this repo
   ```
3. **Deploy**:
   ```bash
   vercel                    # Deploys the current branch
   ```
   The CLI will automatically detect the `vercel.json` configuration, build the client into the `dist` directory and expose the API under `/api/*`.

### Environment Variables
*No environment variables are required for the default demo.* If you decide to add any (e.g., a secret PIX key), add them in the Vercel dashboard under **Settings → Environment Variables**.

### Preview Deployments
Every push to a Git branch will create a preview deployment. You can view the preview URL in the Vercel dashboard or in the CLI output.

### Important notes
- The API code lives in `api/pix/generate.ts` and delegates the business logic to the helper functions located in `server/src/utils/pix-helpers.ts`.
- The `vercel.json` file rewrites all non‑API routes to `index.html` so the Vue SPA works with client‑side routing.
- Vercel uses the `nodejs18.x` runtime for the serverless function.

Now you can push the repository to GitHub (or any Git remote) and let Vercel handle the CI/CD pipeline automatically.
