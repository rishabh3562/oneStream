import getAws from "@/helpers/init/getAws";

// Upload a file to S3
export const uploadFileToS3 = async (file) => {
  const { s3 } = getAws();
  const fileKey = process.env.NEXT_PUBLIC_AWS_FILE_KEY + `/${Date.now()}-${file.name}`;

  try {
    const s3Response = await s3
      .upload({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file,
        ContentType: file.type,
        ACL: process.env.NEXT_PUBLIC_AWS_ACL_TYPE, // Adjust ACL as per your requirements
      })
      .promise();

    console.log("s3Response", s3Response);
    return s3Response;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("File upload failed");
  }
};

// Delete a file from S3
export const deleteFileFromS3 = async (fileKey) => {
  const { s3 } = getAws();

  try {
    const deleteParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileKey,
    };

    const deleteResponse = await s3.deleteObject(deleteParams).promise();
    console.log("deleteResponse", deleteResponse);
    return deleteResponse;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("File deletion failed");
  }
};

// Fetch list of files from S3


// Fetch list of files from S3
export const listFilesFromS3 = async () => {
  const { s3 } = getAws();

  try {
    const listParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    };

    const listResponse = await s3.listObjectsV2(listParams).promise();
    console.log("listResponse", listResponse);
    return listResponse.Contents.map(item => item.Key); // Return only the keys
  } catch (error) {
    console.error("Error fetching file list from S3:", error);
    throw new Error("File list retrieval failed");
  }
};


// Fetch a file from S3
export const fetchFileFromS3 = async (fileKey) => {
  const { s3 } = getAws();

  try {
    const getParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileKey,
    };

    const getResponse = await s3.getObject(getParams).promise();
    console.log("getResponse", getResponse);
    return getResponse.Body;
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    throw new Error("File retrieval failed");
  }
};
