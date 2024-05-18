// helpers/appwriteHelper.js
import getAppwrite from '@/helpers/init/getAppwrite';

//works fine 
export const uploadFileToAppwrite = async (file) => {
  const { storage ,ID} = getAppwrite();

  try {
    const response = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_VIDEOS,  ID.unique(), file);
    console.log("upload response", response);
   
    return response;
  } catch (error) {
    console.error("Error uploading file to Appwrite:", error);
    throw new Error("File upload to Appwrite failed");
  }
};
