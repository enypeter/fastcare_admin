import axios from 'axios';

const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;

export const uploadToCloudinary = async (file: File | undefined) => {
  console.log('uploadToCloudinary called with file:', file?.name, file?.size, file?.type);
  console.log('Cloudinary config:', {
    cloud_name: cloud_name ? 'SET' : 'MISSING',
    preset_key: preset_key ? 'SET' : 'MISSING'
  });

  if (!file) {
    const error = 'No file provided for upload';
    console.error(error);
    throw new Error(error);
  }

  // If Cloudinary is not configured, use a mock upload for testing
  if (!cloud_name || !preset_key) {
    console.warn('Cloudinary not configured, using mock upload for testing');

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Create a local URL for the image (for preview purposes)
    const localUrl = URL.createObjectURL(file);

    return {
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      format: file.type.split('/')[1] || 'jpg',
      url: localUrl, // This will work for preview but won't persist
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset_key);
  formData.append('folder', 'melon');

  console.log('Making request to Cloudinary...');
  console.log('URL:', `https://api.cloudinary.com/v1_1/${cloud_name}/upload`);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('Cloudinary response:', response.data);

    return {
      name: response.data.original_filename,
      format: response.data.format,
      url: response.data.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    }
    throw error;
  }
};
