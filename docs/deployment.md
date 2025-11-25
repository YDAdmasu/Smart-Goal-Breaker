# Deployment Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:
- GitHub account with your repository
- Groq API key (free at [groq.com](https://groq.com))
- Accounts on deployment platforms (Vercel, Render, or Railway)

## Backend Deployment

### Option 1: Render (Recommended)

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Name: `smart-goal-db`
   - Plan: Free
   - Click "Create Database"
   - Copy the "Internal Database URL"

3. **Deploy Backend Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `smart-goal-backend`
     - **Root Directory:** `backend`
     - **Environment:** `Docker`
     - **Plan:** Free
   
4. **Set Environment Variables**
   ```
   DATABASE_URL=<paste your internal database URL>
   GROQ_API_KEY=<your groq api key>
   GROQ_MODEL=llama3-8b-8192
   BACKEND_HOST=0.0.0.0
   BACKEND_PORT=8000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL (e.g., `https://smart-goal-backend.onrender.com`)

### Option 2: Railway

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway automatically creates `DATABASE_URL` variable

4. **Configure Backend Service**
   - Click on your service
   - Settings → Root Directory: `backend`
   - Add environment variables (same as Render)

5. **Deploy**
   - Railway auto-deploys on push
   - Get your backend URL from Settings → Domains

## Frontend Deployment

### Vercel (Recommended)

1. **Create Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Set Environment Variables**
   - Go to "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=<your backend URL>
     ```
   - Example: `https://smart-goal-backend.onrender.com`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

### Netlify (Alternative)

1. **Create Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

4. **Environment Variables**
   - Site settings → Environment variables
   - Add `NEXT_PUBLIC_API_URL`

5. **Deploy**
   - Click "Deploy site"

## Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `GROQ_API_KEY` | Your Groq API key | `gsk_...` |
| `GROQ_MODEL` | Model to use | `llama3-8b-8192` |
| `BACKEND_HOST` | Server host | `0.0.0.0` |
| `BACKEND_PORT` | Server port | `8000` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.example.com` |

## Post-Deployment

### 1. Test Your Deployment

**Backend Health Check:**
```bash
curl https://your-backend-url.com/docs
```
You should see the Swagger UI.

**Frontend Check:**
- Visit your frontend URL
- Try creating a goal
- Verify results display correctly

### 2. Update README

Update your README with production URLs:
```markdown
## Live Demo
- Frontend: https://your-app.vercel.app
- API Docs: https://your-backend.onrender.com/docs
```

### 3. Configure Custom Domain (Optional)

**Vercel:**
- Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Render:**
- Settings → Custom Domain
- Add domain and configure DNS

### 4. Set Up Monitoring

**Vercel Analytics:**
- Enable in project settings
- Track page views and performance

**Render Logs:**
- View logs in dashboard
- Set up alerts for errors

## Troubleshooting

### Backend Issues

**Database Connection Failed**
```
Error: could not connect to server
```
**Solution:** 
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure firewall allows connections

**Groq API Errors**
```
Error: Groq API call failed
```
**Solution:**
- Verify `GROQ_API_KEY` is valid
- Check API quota/limits
- Falls back to local stub if API fails

**Port Already in Use**
```
Error: Address already in use
```
**Solution:**
- Change `BACKEND_PORT` in environment variables
- Default is 8000

### Frontend Issues

**API Calls Fail**
```
Failed to fetch
```
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS is configured correctly

**Build Fails**
```
Type error: Cannot find module
```
**Solution:**
- Run `npm install` locally first
- Check all imports are correct
- Verify TypeScript types

**Environment Variables Not Working**
**Solution:**
- Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Clear build cache and redeploy

### Database Issues

**Tables Not Created**
**Solution:**
- Backend automatically creates tables on startup
- Check logs for migration errors
- Manually run: `docker exec -it backend python -c "from db import init_db; init_db()"`

**Data Not Persisting**
**Solution:**
- Verify using managed database, not ephemeral
- Check volume mounts in Docker
- Ensure database has write permissions

## Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Build**
   - Vercel/Render detects push
   - Runs build automatically
   - Deploys if successful

3. **Rollback if Needed**
   - Both platforms keep deployment history
   - Can rollback to previous version instantly

### GitHub Actions (Optional)

The project includes CI/CD workflows:
- `.github/workflows/backend-ci.yml` - Backend linting
- `.github/workflows/frontend-ci.yml` - Frontend build

These run on every push and PR.

## Cost Estimates

### Free Tier Limits

**Render:**
- Free tier sleeps after 15 min inactivity
- 750 hours/month free
- PostgreSQL: 90 days free, then $7/month

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Free SSL

**Railway:**
- $5 free credit/month
- ~500 hours of usage

### Recommended for Production

- **Hobby:** Render ($7/month) + Vercel (Free)
- **Professional:** Railway ($20/month) or Render Pro ($25/month)

## Security Checklist

Before going live:

- [ ] All API keys in environment variables
- [ ] CORS configured for production domain only
- [ ] Database has strong password
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)
- [ ] Rate limiting configured (consider adding)
- [ ] Error messages don't expose sensitive info
- [ ] Dependencies up to date (`npm audit`)

## Next Steps

After successful deployment:

1. **Monitor Performance**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Track user analytics

2. **Scale as Needed**
   - Upgrade to paid tier for better performance
   - Add Redis caching
   - Consider CDN for assets

3. **Backup Strategy**
   - Enable automatic database backups
   - Export data regularly
   - Document recovery procedures

## Support

If you encounter issues:
- Check deployment platform docs
- Review application logs
- Open an issue on GitHub
- Consult the [Architecture Documentation](./architecture.md)
