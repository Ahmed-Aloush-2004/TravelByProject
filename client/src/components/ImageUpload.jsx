import React from "react";

function ImageUpload({ setPostImage }) {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlerFileUpload = async (e) => {  
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };

  return (
    <form>
      <input
        type="file"
        label="image"
        accept=".jpeg,.png,.jpg,.webp"
        onChange={handlerFileUpload}
      />
    </form>
  );
}

export default ImageUpload;
