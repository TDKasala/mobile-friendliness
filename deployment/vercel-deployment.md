
# Deploying ATSBoost to Vercel

This guide provides step-by-step instructions for deploying the ATSBoost application to Vercel.

## Prerequisites

1. A Vercel account (free or Pro)
2. A GitHub account with the ATSBoost repository
3. A Supabase project set up with all required tables and buckets
4. The following environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Deployment Steps

### 1. Connect Your GitHub Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Connect to your GitHub account if not already connected
4. Select the ATSBoost repository
5. Click "Import"

### 2. Configure Project Settings

#### General Settings

1. Enter a project name (e.g., "atsboost")
2. Select the framework preset: "Vite"
3. For the Root Directory, leave it as `.` (the project root)

#### Build Settings

1. Build Command: `npm run build`
2. Output Directory: `dist`
3. Install Command: `npm install`

#### Environment Variables

Add the following environment variables:

1. `VITE_SUPABASE_URL`: Your Supabase project URL
2. `VITE_SUPABASE_ANON_KEY`: Your Supabase project anon key

These can be found in your Supabase project dashboard under Project Settings > API.

### 3. Deploy Your Project

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide a URL for your application (e.g., `https://atsboost.vercel.app`)

### 4. Connect a Custom Domain (Optional)

To use a custom domain (e.g., `atsboost.co.za`):

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Click "Add"
4. Enter your domain name (e.g., `atsboost.co.za`)
5. Follow the instructions to verify and configure your domain

### 5. Post-Deployment Configuration

#### CORS Configuration in Supabase

To allow your Vercel-deployed frontend to communicate with Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Project Settings > API
3. Under "API Settings", add the following URLs to the "Additional allowed CORS origins":
   - `https://atsboost.vercel.app` (or your Vercel deployment URL)
   - `https://atsboost.co.za` (or your custom domain if applicable)

#### Authentication URL Configuration in Supabase

Configure the site URL and redirect URLs for authentication:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Set the Site URL to your production URL (e.g., `https://atsboost.co.za`)
4. Add the following redirect URLs:
   - `https://atsboost.vercel.app/login` (or your Vercel deployment URL)
   - `https://atsboost.co.za/login` (or your custom domain)
   - Repeat for `/reset-password` and any other authentication-related routes

### 6. Continuous Deployment

By default, Vercel sets up continuous deployment from your GitHub repository:

1. When you push changes to the main branch, Vercel automatically rebuilds and deploys your application
2. You can configure branch deployments in the Vercel dashboard under your project settings

### 7. Performance Monitoring

Monitor your application's performance using Vercel Analytics:

1. Go to your project in the Vercel dashboard
2. Click on "Analytics"
3. View metrics like:
   - Web Vitals (LCP, FID, CLS)
   - Page views
   - Visitor demographics

### 8. Environment Management

For different environments (development, staging, production):

1. In Vercel, navigate to your project settings
2. Go to "Environment Variables"
3. Add environment-specific variables using the environment tabs
4. For development, use the local `.env` file (which should be in your `.gitignore`)

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check the build logs in the Vercel dashboard
2. Verify that all dependencies are correctly listed in `package.json`
3. Ensure your code is compatible with the Node.js version used by Vercel

### Authentication Issues

If users can't log in or reset passwords:

1. Double-check the URL configuration in Supabase
2. Verify that the environment variables are correctly set
3. Test the authentication flow locally before deploying

### CORS Errors

If you see CORS errors in the browser console:

1. Verify that your Supabase project's CORS settings include your Vercel domain
2. Check that you're using the correct Supabase URL and anon key

## Best Practices

1. **Security**: Never commit sensitive information like API keys to your repository
2. **Environment Variables**: Use environment variables for all configuration
3. **Progressive Enhancement**: Ensure your app works without JavaScript for better SEO
4. **Optimization**: Keep your bundle size small for faster loading times
5. **Monitoring**: Regularly check your Vercel and Supabase dashboards for performance issues
6. **Backups**: Regularly back up your Supabase database

## Cost Management

### Vercel

* Free tier: Limited to hobby projects
* Pro plan (ZAR 4,320/year): Recommended for production use, includes:
  * Custom domains
  * Increased build minutes
  * Team collaboration
  * Advanced analytics

### Supabase

* Free tier: 500MB database, 1GB storage
* Consider upgrading if you exceed these limits

## Support

For issues related to:
* **Vercel deployment**: [Vercel Support](https://vercel.com/support)
* **Supabase**: [Supabase Support](https://supabase.com/support)
