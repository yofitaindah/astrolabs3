// pages/api/openai/edit-image.js
import formidable, { errors as formidableErrors } from "formidable";
import fs from "fs";
import path from "path";
import sharp from "sharp";

import { Writable } from "stream";
import FormData from "form-data";

// pages/api/join-event.js
import openAi from "@/lib/util";
import axios from "axios";

const formidableConfig = {
  keepExtensions: true,
};

function formidablePromise(req, opts = [0]) {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}

const fileConsumer = (acc) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

const modifyFileProperty = (file, newLastModifiedDate) => {
  // Use the existing file data
  const modifiedFile = new File([file], file.newFilename, {
    type: file.mimetype,
    lastModified: newLastModifiedDate.getTime(), // Pass a timestamp for lastModified
  });

  return modifiedFile;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { base64Image, prompt } = req.body;
    if (!base64Image || !prompt) {
      return res
        .status(400)
        .json({ error: "Base64 image and prompt are required." });
    }

    // Decode the Base64 image
    const buffer = Buffer.from(base64Image, "base64");
    const filePath = path.join(process.cwd(), "uploads", "uploaded_image.png");
    // Save the image temporarily
    fs.writeFileSync(filePath, buffer);

    // Send the image to OpenAI
    const response = await openAi.images.edit({
      image: fs.createReadStream(filePath),
      prompt,
      n: 1,
      size: "1024x1024",
    });
    // console.log(response.data);
    const imageUrl = response.data[0].url;
    // Cleanup: Delete the temporary file
    fs.unlinkSync(filePath);
    
    res.status(200).json({ url: imageUrl });
  } catch (err) {
    // example to check for a very specific error
    if (err.code === formidableErrors.maxFieldsExceeded) {
    }
    console.error(err);
    res.status(err.httpCode || 400).json({ error: err.message });
    return;
  }
}