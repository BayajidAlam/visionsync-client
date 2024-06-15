import { Input } from "@/components/ui/input";
import { createEntrySchema } from "@/schemas/createEntry";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadVideo = () => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };

  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof createEntrySchema>) {}

  return (
    <div>
      <div className="m-5">
        <Form className="w-1/2 mt-2" {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col  items-start gap-1 mt-2">
              <Label htmlFor="username" className="text-right">
                Upload Video
              </Label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Video files only (e.g., MP4, MOV)
                    </p>
                  </div>

                  <Input
                    id="dropzone-file"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    {...register("video")}
                  />
                </label>
              </div>
              {errors.video && (
                <p className="text-red-500">{errors.video.message}</p>
              )}
            </div>
            <div className="flex flex-col  items-start gap-1 mt-2">
              <Label htmlFor="username" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                placeholder="New Bangle Song"
                className="col-span-3"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col  items-start gap-1 mt-2">
              <Label htmlFor="username" className="text-right">
                Category
              </Label>
              <Input
                id="name"
                placeholder="New Bangle Song"
                className="col-span-3"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <div className="tags-input-container">
                <Label htmlFor="username" className="text-right">
                  Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <button
                        className="bg-gray-200 p-1 rounded-lg my-2"
                        onClick={() => handleDeleteTag(tag)}
                      >
                        {tag} x
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type and press enter to add tags"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-1 mt-2">
              <Label htmlFor="username" className="text-right">
                Upload Thumbnail
              </Label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file-thumbnail"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Image files only (e.g., JPG, PNG)
                    </p>
                  </div>

                  <Input
                    id="dropzone-file-thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("thumbnail")}
                  />
                </label>
              </div>
              {errors.thumbnail && (
                <p className="text-red-500">{errors.thumbnail.message}</p>
              )}
            </div>

            <div className="flex flex-col  items-start gap-1 mt-2">
              <Label htmlFor="username" className="text-right">
                Video Description
              </Label>
              <ReactQuill
                className="w-full h-16"
                theme="snow"
                value={value}
                onChange={setValue}
              />
              ;
              {errors.remarks && (
                <p className="text-red-500">{errors.remarks.message}</p>
              )}
            </div>

            <div className="text-end mt-5">
              <Button>Upload</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UploadVideo;
