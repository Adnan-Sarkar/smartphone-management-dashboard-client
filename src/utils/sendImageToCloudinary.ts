const sendImageToCloudinary = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "smartphone-management");
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result?.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default sendImageToCloudinary;
