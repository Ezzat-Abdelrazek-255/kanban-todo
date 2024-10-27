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
import { PRIORITY_FILTER_OPTIONS, STATE_FILTER_OPTIONS } from "@/constants";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/features/todos/todosSlice";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Loader, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { PostgrestError } from "@supabase/supabase-js";

type FormFields = ReturnType<typeof addTodo>["payload"];

const TodoCreate = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>();

  const dispatch = useDispatch();
  const [error, setError] = useState<PostgrestError | null>(null);

  const submitHandler = async function(data: FormFields) {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.getUser();
    if (error || !authData?.user) {
      redirect("/login");
    }

    const { data: userData } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", authData.user.id);

    const { error: insertError } = await supabase
      .from("todos")
      .insert({
        title: data.title,
        description: data.description,
        priority: data.priority,
        user_id: authData.user.id,
        owner_username: userData && userData[0].username,
        state: data.state, // default state
      })
      .select()
      .single();
    if (insertError) {
      return setError(insertError);
    }
    dispatch(addTodo(data));
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-black/50 fixed inset-0 w-full h-full"></div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-black z-10 w-[40rem] p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 border-muted border-[1px] rounded-[8px]"
      >
        <div className="w-[21.875rem] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-sans text-xl leading-[85%]">
              Title
            </label>
            <Input
              id="title"
              placeholder="Finish Landing Page"
              className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs"
              {...register("title", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="font-sans text-base leading-[85%]"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Finish Landing Page"
              className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs"
              {...register("description", { required: true })}
            />
          </div>
          {/* <div className="flex flex-col gap-2"> */}
          {/*   <label */}
          {/*     htmlFor="cover-image" */}
          {/*     className="font-sans text-base leading-[85%]" */}
          {/*   > */}
          {/*     Cover Image */}
          {/*   </label> */}
          {/*   <Input */}
          {/*     type="file" */}
          {/*     id="cover-image" */}
          {/*     placeholder="Finish Landing Page" */}
          {/*     className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs" */}
          {/*     {...register("coverImgUrl", { required: true })} */}
          {/*   /> */}
          {/* </div> */}
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        <div className="self-end flex flex-col items-end">
          <Button type="submit">{isSubmitting ? <Loader /> : "Submit"}</Button>
          <p className="font-serif text-red-500 text-sm">{error?.message}</p>
        </div>
        <button
          type="button"
          className="rounded-full absolute top-6 right-6 w-[1.5rem] h-[1.5rem] bg-foreground text-background z-20 grid place-content-center"
          onClick={() => setIsOpen(false)}
        >
          <X size="14" />
        </button>
      </form>
    </>
  );
};

export default TodoCreate;
