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

export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  //   const form = formidable({
  //     uploadDir: "./uploads",
  //     keepExtensions: true,
  //   });
  //   let fields;
  //   let files;
  try {
    const chunks = [];
    const { fields, files } = await formidablePromise(req, {
      ...formidableConfig,
      // consume this, otherwise formidable tries to save the file to disk
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });

    console.log(fields);
    console.log(files);
    const { image } = files;

    const fileData = Buffer.concat(chunks); // or is it from? I always mix these up
    console.log("file", JSON.stringify(image[0], null, 2));

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const modifiedFile = modifyFileProperty(image[0], today.toDateString());
    console.log('***modifiedFile', JSON.stringify(modifiedFile, null, 2));
    // const form = new FormData();
    // form.append("prompt", fields.prompt.toString());
    // form.append("image", fileData);
    // form.append("n", 1);
    // form.append("size", "1024x1024");

    // const response = await axios.post(
    //   "https://api.openai.com/v1/images/edits",
    //   form,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    //     },
    //   }
    // );

    // const response = await openAi.images.edit({
    //   image: image[0],
    //   prompt: fields.prompt.toString(),
    //   n: 1,
    //   size: "1024x1024",
    // });

    // const imageUrl = response.data.data[0].url;

    res.status(200).json({ url: "imageUrl" });
  } catch (err) {
    // example to check for a very specific error
    if (err.code === formidableErrors.maxFieldsExceeded) {
    }
    console.error(err);
    res.status(err.httpCode || 400).json({ error: err.message });
    return;
  }
}
