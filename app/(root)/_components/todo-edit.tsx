import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import {
  PRIORITY_FILTER_OPTIONS,
  STATE_FILTER_OPTIONS,
  SUPABASE_IMAGES_BASE_URL,
} from "@/constants";
import { Button } from "@/components/ui/button";
import { addTodo, updateTodo } from "@/lib/features/todos/todosSlice";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Loader, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { PostgrestError } from "@supabase/supabase-js";
import { ImageMetadata, TodoItem } from "@/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "./todo-image-upload";

// Type for form fields, excluding auto-generated or computed fields
type FormFields = Omit<
  ReturnType<typeof addTodo>["payload"],
  "ownerUsername" | "coverImgUrl" | "isOpen"
>;

// Validation schema for the todo form
const schema: yup.ObjectSchema<FormFields> = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  state: yup
    .string()
    .oneOf(["todo", "doing", "done"] as const)
    .required(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"] as const)
    .required(),
  id: yup.string().required(),
});

const TodoEdit = ({
  setIsEditOpen,
  todo,
}: {
  setIsEditOpen: (isOpen: boolean) => void;
  todo: TodoItem;
}) => {
  // Initialize form with react-hook-form, including validation and default values
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      state: todo.state,
    },
    mode: "onChange",
  });

  // State management for image upload and error handling
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState<PostgrestError | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState(todo.coverImgUrl);

  // Handle form submission - updates both Supabase and Redux store
  const submitHandler = async function(data: FormFields) {
    // Verify user authentication
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.getUser();
    if (error || !authData?.user) {
      redirect("/login");
    }

    // Update todo in Supabase
    const { error: updateError } = await supabase
      .from("todos")
      .update({ ...data, cover_img_url: coverImgUrl })
      .eq("id", todo.id);

    if (updateError) {
      return setError(updateError);
    }

    // Update todo in Redux store
    dispatch(
      updateTodo({
        id: todo.id,
        updates: {
          title: data.title,
          description: data.description,
          state: data.state,
          priority: data.priority,
          coverImgUrl,
        },
      }),
    );
    setIsEditOpen(false);
  };

  // Handle successful image upload
  const onUploadComplete = function(imageMetaData: ImageMetadata) {
    setCoverImgUrl(`${SUPABASE_IMAGES_BASE_URL}${imageMetaData.path}`);
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="bg-black/50 fixed inset-0 w-full h-full"></div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-black z-50 w-[40rem] p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 border-muted border-[1px] rounded-[8px]"
      >
        <div className="w-[21.875rem] flex flex-col gap-4">
          {/* Title input field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-sans text-xl leading-[85%]">
              Title
            </label>
            <Input
              defaultValue={todo.title}
              id="title"
              placeholder="Finish Landing Page"
              className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs"
              {...register("title", { required: true })}
            />
          </div>

          {/* Description textarea */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="font-sans text-base leading-[85%]"
            >
              Description
            </label>
            <Textarea
              defaultValue={todo.description}
              id="description"
              placeholder="Finish Landing Page"
              className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs"
              {...register("description", { required: true })}
            />
          </div>

          {/* Image upload section */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cover-image"
              className="font-sans text-base leading-[85%]"
            >
              Cover Image
            </label>
            <ImageUpload
              setUploading={setUploading}
              uploading={uploading}
              onUploadComplete={onUploadComplete}
            />
            {uploading && (
              <p className="font-serif text-xs">
                Uploading your image please wait
              </p>
            )}
          </div>

          {/* Priority select with controller for form integration */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="priority"
              className="font-sans text-base leading-[85%]"
            >
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  defaultValue={todo.priority}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="bg-black">
                    <SelectValue placeholder="Select a Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_FILTER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* State select with controller for form integration */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="state"
              className="font-sans text-base leading-[85%]"
            >
              State
            </label>
            <Controller
              name="state"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  defaultValue={todo.state}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="bg-black">
                    <SelectValue placeholder="Select a State" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATE_FILTER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Submit button and error display */}
        <div className="self-end flex flex-col items-end font-sans">
          <Button
            disabled={isSubmitting || uploading}
            type="submit"
            className="uppercase"
          >
            {isSubmitting || uploading ? <Loader /> : "Save"}
          </Button>
          <p className="font-serif text-red-500 text-sm">{error?.message}</p>
        </div>

        {/* Close button */}
        <button
          type="button"
          className="rounded-full absolute top-6 right-6 w-[1.5rem] h-[1.5rem] bg-foreground text-background z-20 grid place-content-center"
          onClick={() => setIsEditOpen(false)}
        >
          <X size="14" />
        </button>
      </form>
    </>
  );
};

export default TodoEdit;
