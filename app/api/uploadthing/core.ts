/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImage: f({
    image: { maxFileSize: "2MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
  staffImage: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  patientProfileImage: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  studentProfileImage: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  parentProfileImage: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  schoolLogo: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  fileUploads: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    pdf: { maxFileSize: "2MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "2MB", maxFileCount: 4 }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "2MB",
      maxFileCount: 4,
    }, // .docx
    "application/vnd.ms-excel": { maxFileSize: "2MB", maxFileCount: 4 }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "2MB",
      maxFileCount: 4,
    }, // .xlsx
    "application/vnd.ms-powerpoint": { maxFileSize: "2MB", maxFileCount: 4 }, // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "2MB", maxFileCount: 4 }, // .pptx
    "text/plain": { maxFileSize: "2MB", maxFileCount: 4 }, // .txt

    // Archive types
    "application/gzip": { maxFileSize: "2MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "2MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
  mailAttachments: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    pdf: { maxFileSize: "2MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "2MB", maxFileCount: 4 }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "2MB",
      maxFileCount: 4,
    }, // .docx
    "application/vnd.ms-excel": { maxFileSize: "2MB", maxFileCount: 4 }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "2MB",
      maxFileCount: 4,
    }, // .xlsx
    "application/vnd.ms-powerpoint": { maxFileSize: "2MB", maxFileCount: 4 }, // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "2MB", maxFileCount: 4 }, // .pptx
    "text/plain": { maxFileSize: "2MB", maxFileCount: 4 }, // .txt

    // Archive types
    "application/gzip": { maxFileSize: "2MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "2MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
