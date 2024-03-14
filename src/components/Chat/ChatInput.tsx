"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useChatStore } from "@/app/zustand/ChatStore";
import addPrompt from "@/app/actions/addPrompt";
import { useCallback } from "react";

const formSchema = z.object({
  prompt: z.string().min(2).max(100),
});

export default function ChatInput() {
  const { history, addHistory, addResponse } = useChatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      addHistory(values.prompt);
      const res = await addPrompt(history, values.prompt);
      if (res) {
        form.reset();
        addResponse(res?.role as string, res?.content as string);

        /**
         * To set the input on focus after the response
         */
        setTimeout(() => {
          form.setFocus("prompt");
        }, 50);
      }
    },
    [history]
  );

  return (
    <Form {...form}>
      <form
        className="h-full items-center flex gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-1 h-full flex items-center">
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name="prompt"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormControl>
                  <Input placeholder="Enter your prompt" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="h-full flex items-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
