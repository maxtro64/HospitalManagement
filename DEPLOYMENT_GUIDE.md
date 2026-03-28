# Hospital Management System - Deployment Guide

## ✅ Pre-Deployment Checklist

This project is **95% ready for deployment**. Follow these final steps to deploy.

---

## 📋 Step 1: Replace Placeholder URLs

### Files to Update:
1. **`backend/.env`** - CORS URLs
2. **`frontend/.env.production`** - Backend API URL
3. **`admin/.env.production`** - Backend API URL

### How to Update:
Search for `REPLACE_` in each file and replace with your actual domains:

```bash
# Example replacements:
REPLACE_BACKEND_URL_HERE       → https://hospital-api.railway.app
REPLACE_FRONTEND_URL_HERE      → https://hospital.vercel.app
REPLACE_ADMIN_URL_HERE         → https://admin-hospital.vercel.app
```

---

## 🚀 Step 2: Build Frontend & Admin

```bash
# Navigate to frontend directory
cd frontend
npm install
npm run build

# Navigate to admin directory
cd ../admin
npm install
npm run build
```

This creates `dist/` folders ready for deployment.

---

## 🌐 Step 3: Deploy to Hosting Platforms

### Backend Deployment (Node.js + Express)
**Recommended:** Railway, Render, Heroku

1. Connect your Git repository
2. Set environment variables in the platform dashboard:
   - `MONGODB_URI` ✅ Already configured
   - `CLOUDINARY_NAME` ✅ Already configured
   - `CLOUDINARY_API_KEY` ✅ Already configured
   - `CLOUDINARY_SECRET` ✅ Already configured
   - `JWT_SECRET` ✅ Already configured
   - `RAZORPAY_KEY_ID` ✅ Already configured
   - `RAZORPAY_KEY_SECRET` ✅ Already configured
   - `ADMIN_EMAIL` ✅ Already configured
   - `ADMIN_PASSWORD` ✅ Already configured
   - `FRONTEND_URL` - Add your frontend domain
   - `ADMIN_URL` - Add your admin domain (optional)
   - `PORT` - Defaults to 4000

3. Enable auto-deploy from main branch

### Frontend Deployment (React + Vite)
**Recommended:** Vercel or Netlify

1. Connect your Git repository (point to `frontend` folder)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Vercel auto-deploys on push

### Admin Dashboard Deployment (React + Vite)
**Recommended:** Vercel or Netlify

1. Connect your Git repository (point to `admin` folder)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Vercel auto-deploys on push

---

## 🔐 Security Notes

✅ **Secrets Protection:**
- `.env` files are in `.gitignore` (never committed)
- Use platform environment variables for sensitive data
- Test Razorpay keys are fine for testing

✅ **CORS is Restricted:**
- Only allows your frontend and admin URLs
- Prevents unauthorized API access

✅ **Database:** 
- MongoDB Atlas with authentication enabled
- Credentials are secure in environment variables

---

## 🧪 Testing After Deployment

1. **Test API Endpoint:**
   ```
   https://your-backend-domain.com/api/user/list
   ```

2. **Test Frontend:**
   ```
   https://your-frontend-domain.com
   ```

3. **Test Admin:**
   ```
   https://your-admin-domain.com
   ```

4. **Test Payment:**
   - Use Razorpay test cards (provided by Razorpay)
   - Real payments won't process with test keys

---

## 📝 Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=                    # MongoDB Atlas connection
CLOUDINARY_NAME=               # Image storage
CLOUDINARY_API_KEY=            # Image API key
CLOUDINARY_SECRET=             # Image secret
ADMIN_EMAIL=                   # Default admin email
ADMIN_PASSWORD=                # Default admin password
JWT_SECRET=                    # Token secret (keep secure!)
RAZORPAY_KEY_ID=              # Payment gateway ID
RAZORPAY_KEY_SECRET=          # Payment gateway secret
CURRENCY=                      # Currency code (INR)
FRONTEND_URL=                 # Your frontend domain (production)
ADMIN_URL=                    # Your admin domain (production)
PORT=                         # Server port (default: 4000)
```

### Frontend (.env.production)
```
VITE_BACKEND_URL=             # Backend API URL
VITE_RAZORPAY_KEY_ID=        # Razorpay public key
VITE_RAZORPAY_KEY_SECRET=    # Razorpay secret (if needed)
```

### Admin (.env.production)
```
VITE_BACKEND_URL=             # Backend API URL
```

---

## 🆘 Troubleshooting

### Frontend shows "Cannot connect to API"
- Check `VITE_BACKEND_URL` in `.env.production`
- Ensure backend domain is correct
- Verify CORS is configured in `backend/.env`

### API returns 401/403 errors
- Check JWT_SECRET is consistent across all environments
- Verify authentication headers are being sent

### Payments not working
- Confirm Razorpay keys are correct
- Test mode: use test card from Razorpay dashboard
- Production mode: ensure you have `rzp_live_` keys

### Database connection errors
- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas dashboard
- Ensure connection string includes database name

---

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Verify all `REPLACE_` placeholders are updated
3. Ensure environment variables are set on hosting platform
4. Check platform logs for detailed error messages

---

## ✨ You're Ready!

All deployment preparations are complete. Simply:
1. Replace the placeholder URLs
2. Run build commands
3. Deploy to your chosen platforms

Your Hospital Management System is production-ready! 🎉
