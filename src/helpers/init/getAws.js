import AWS from "aws-sdk";
import { S3 } from "aws-sdk";


const getAws = () => {
    
    // Initialize AWS S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    
    return {s3}
}

export default getAws