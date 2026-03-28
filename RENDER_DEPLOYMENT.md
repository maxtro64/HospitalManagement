# Render Deployment Guide - Hospital Management System

## Prerequisites
- Render account (https://render.com)
- GitHub account with repository pushed
- Your MongoDB Atlas connection string
- Cloudinary credentials

---

## Step 1: Push to GitHub

```bash
cd c:\Personal\webdev\fullstackproject\hospitalmanagement

# Initialize git (if not already)
git init
git add .
git commit -m "Hospital management system - ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hospitalmanagement.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### Create Backend Service:

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in:
   - **Name**: `hospital-management-backend`
   - **Environment**: `Node`
   - **Region**: Pick closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Add Environment Variables:
Click **"Environment"** and add:

```
MONGODB_URI=mongodb+srv://shivam2110207:Shivam6393@cluster0.a5g7yxk.mongodb.net/?appName=Cluster0
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
PORT=3000
CLOUDINARY_NAME=dbnwgxuvi
CLOUDINARY_API_KEY=392424693984583
CLOUDINARY_SECRET=DiLvf-lhDeuLW9G98OjE7ZCxavU
RAZORPAY_KEY_ID=rzp_test_dbaCGd4lflsP8n
RAZORPAY_KEY_SECRET=T5aGVFL87xLwPlJjDqxpmW7I
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=qwerty123
```

### Update Root Directory:
- **Root Directory**: `backend`

### Deploy: Click **"Create Web Service"**

**Wait for deployment to complete** (5-10 minutes). You'll get a URL like:
```
https://hospital-management-backend.onrender.com
```

---

## Step 3: Deploy Frontend to Render

### Create Frontend Static Site:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Fill in:
   - **Name**: `hospital-management-frontend`
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

### Deploy: Click **"Create Static Site"**

You'll get a URL like:
```
https://hospital-management-frontend.onrender.com
```

---

## Step 4: Update Frontend Backend URL

After backend is deployed, update frontend:

1. Go to **hospital-management-frontend** Render service
2. Click **"Environment"**
3. Add:
   ```
   VITE_BACKEND_URL=https://hospital-management-backend.onrender.com
   VITE_RAZORPAY_KEY_ID=rzp_test_dbaCGd4lflsP8n
   VITE_RAZORPAY_KEY_SECRET=T5aGVFL87xLwPlJjDqxpmW7I
   ```

4. Click **"Deploy"** to rebuild with new URL

---

## Step 5: Deploy Admin Panel to Render

### Create Admin Static Site:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Fill in:
   - **Name**: `hospital-management-admin`
   - **Branch**: `main`
   - **Build Command**: `cd admin && npm install && npm run build`
   - **Publish Directory**: `admin/dist`

### Add Environment Variables:
```
VITE_BACKEND_URL=https://hospital-management-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_dbaCGd4lflsP8n
VITE_RAZORPAY_KEY_SECRET=T5aGVFL87xLwPlJjDqxpmW7I
```

---

## Step 6: Update Backend CORS for Production

Your backend already has `origin: '*'` which works for Render, but for production you should update it.

Edit `backend/server.js`:

```javascript
const allowedOrigins = [
  'https://hospital-management-frontend.onrender.com',
  'https://hospital-management-admin.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))
```

---

## Step 7: Seed Database on Render

After backend is deployed:

1. SSH into Render backend service (via Dashboard → Shell tab)
2. Run:
   ```bash
   node insertDoctors.js
   ```

Or create a one-time script route in your backend to seed doctors.

---

## Deployment URLs

After all deployments:

- **Frontend**: https://hospital-management-frontend.onrender.com
- **Admin**: https://hospital-management-admin.onrender.com
- **Backend API**: https://hospital-management-backend.onrender.com

---

## Troubleshooting

### Backend won't start:
- Check **Logs** tab in Render dashboard
- Verify environment variables are set
- Check MongoDB connection string

### Frontend shows blank page:
- Verify `VITE_BACKEND_URL` environment variable
- Check browser console (F12) for errors
- Ensure backend URL is correct and reachable

### Booking not working:
- Verify backend URL in frontend
- Check doctor records exist in MongoDB
- Verify JWT_SECRET matches between frontend login and booking

### Cold starts (slow first request):
- Normal for free tier on Render
- Upgrade to paid plan to avoid cold starts

---

## Cost Estimate

- **Backend**: $7/month (paid instance)
- **Frontend**: Free (static site)
- **Admin**: Free (static site)
- **Total**: ~$7/month

Free tier available but services spin down after inactivity.

---

## Next Steps

1. Push code to GitHub
2. Follow deployment steps above
3. Test booking on deployed frontend
4. Monitor logs in Render dashboard
