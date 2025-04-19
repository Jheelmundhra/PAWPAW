# Cloudinary Image Upload Setup

This application uses Cloudinary for image storage instead of saving files locally. This provides several benefits:

- Faster image loading through Cloudinary's CDN
- Automatic image optimization and transformations
- No need to manage server storage space
- Simplified deployment (no need to handle file uploads on server)

## Setup Instructions

### 1. Create a Cloudinary account

- Go to [Cloudinary's website](https://cloudinary.com/) and sign up for a free account
- Once registered, access your dashboard to get your account credentials

### 2. Add Cloudinary credentials to environment variables

Create or update your `.env` file in the backend root directory with the following variables:

```
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with the values from your Cloudinary dashboard.

### 3. How Image Uploads Work

The application uses multer-storage-cloudinary to handle file uploads directly to Cloudinary:

1. When a user submits a form with an image file:

   - The file is sent from the browser to your backend server
   - The backend middleware (multer with cloudinary storage) intercepts the file
   - The file is automatically uploaded to your Cloudinary account
   - Cloudinary returns a URL that is stored in your database

2. The image is then accessible via the Cloudinary URL stored in the database.

### 4. Image Transformations

Cloudinary allows you to transform images on-the-fly by modifying the URL. For example:

- Resize an image: `https://res.cloudinary.com/your-cloud-name/image/upload/w_500,h_300/image-id.jpg`
- Crop an image: `https://res.cloudinary.com/your-cloud-name/image/upload/c_crop,g_face/image-id.jpg`
- Apply filters: `https://res.cloudinary.com/your-cloud-name/image/upload/e_sepia/image-id.jpg`

See the [Cloudinary documentation](https://cloudinary.com/documentation/image_transformations) for more transformation options.

### 5. Testing

To test if your Cloudinary setup is working correctly:

1. Start your backend server: `npm run dev`
2. Try uploading an image through your application
3. Check that the URL returned starts with `https://res.cloudinary.com/`
4. Verify the image is accessible by opening the URL in a browser

### 6. Troubleshooting

If you encounter issues:

- Verify your Cloudinary credentials are correct in the `.env` file
- Check the server logs for any specific error messages
- Ensure you have set up the correct folder paths in `config/cloudinary.js`
- Make sure your Cloudinary account has sufficient credits (free tier allows plenty for small to medium applications)
