import { v2 as cloudinary } from 'cloudinary';

// Disable SSL verification for development (only if you have certificate issues)
// WARNING: Remove this in production!
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

console.log('Cloudinary credentials check:', {
  cloudName: cloudName || 'MISSING',
  apiKey: apiKey || 'MISSING',
  apiSecret: apiSecret ? `${apiSecret.substring(0, 4)}...` : 'MISSING',
});

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;
