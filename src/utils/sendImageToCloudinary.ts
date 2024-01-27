const sendImageToCloudinary = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "smartphone-management");
    formData.append("cloud_name", "dxljyilvl");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxljyilvl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return result?.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default sendImageToCloudinary;
