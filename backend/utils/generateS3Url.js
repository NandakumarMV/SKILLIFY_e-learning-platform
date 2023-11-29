import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3BucketConfig.js";

const generateUrl = async (key) => {
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 60000 });
  return url;
};

export default generateUrl;
