import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Editor from "@monaco-editor/react";

export default function Root() {
  const methods = useForm({
    defaultValues: {
      params: [{ selected: false, key: "", value: "" }],
      body: [{ selected: false, key: "", value: "" }],
    },
  });

  const [resValue, setResValue] = useState();

  const url = useRef();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const apiUrl = url.current;
      return await axios.get(apiUrl);
    },
    onSuccess: (res) => {
      setResValue(JSON.stringify(res));
    },
  });

  function onSubmit(data) {
    url.current = data.url;
    mutate();
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 my-52 justify-center"
        >
          <div className="flex w-full  max-w-5xl items-center space-x-2">
            <Controller
              control={methods.control}
              name={"method"}
              render={({ field }) => (
                <Select
                  className="w-[180px] relative"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="HTTP Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Methods</SelectLabel>
                      <SelectItem defaultValue value="GET">
                        GET
                      </SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="HEAD">HEAD</SelectItem>
                      <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              {...methods.register("url")}
              type="text"
              placeholder="Enter Url"
            />
            <Button type="submit">Connect</Button>
          </div>
          <NavBar />
        </form>
      </FormProvider>
      {resValue && (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
          <Editor
            height="85vh"
            width={`100%`}
            language={"json"}
            value={resValue}
            theme="vs-dark"
            defaultValue="// some comment"
            // onChange={handleEditorChange}
          />
        </div>
      )}
    </div>
  );
}
