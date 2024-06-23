import Editor from "@/components/Editor";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
import TopBarLoader from "@/components/ui/TopBarLoader";

const getMethodClassName = (method) => {
  switch (method) {
    case "get":
      return "text-green-400 focus:text-green-400";
    case "post":
      return "text-orange-400 focus:text-orange-400";
    case "put":
      return "text-yellow-400 focus:text-yellow-400";
    case "patch":
      return "text-violet-400 focus:text-violet-400";
    case "delete":
      return "text-red-400 focus:text-red-400";
    case "head":
      return "text-green-400 focus:text-green-400";
    case "options":
      return "text-pink-400 focus:text-pink-400";
    default:
      return "text-green-400 focus:text-green-400";
  }
};

export default function Root() {
  const methods = useForm({
    defaultValues: {
      method: "get",
      params: [{ selected: false, key: "", value: "" }],
      body: [{ selected: false, key: "", type: "text", value: "" }],
      headers: [{ selected: false, key: "", value: "" }],
      url: "",
    },
  });

  const { toast } = useToast();

  const [resValue, setResValue] = useState();

  const url = useRef();
  const method = useRef();

  methods.watch("params").forEach((param, index) => {
    const url = methods.getValues("url");
    const urlValues = url.split("?");
    const baseUrl = urlValues[0];
    const queryParams = urlValues.length > 1 ? urlValues[1].split("&") : [];

    if (param.selected) {
      if (index < queryParams.length) {
        const [key, value] = queryParams[index].split("=");
        queryParams[index] = `${param.key}=${param.value}`;
      } else {
        queryParams.push(`${param.key}=${param.value}`);
      }
    } else {
      // Remove the key-value pair from queryParams if param is unselected
      if (index < queryParams.length) {
        queryParams.splice(index, 1);
      }
    }

    const updatedUrl =
      baseUrl + (queryParams.length > 0 ? "?" + queryParams.join("&") : "");
    methods.setValue("url", updatedUrl);
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const apiUrl = url.current;
      return await axios[method.current](apiUrl, data);
    },
    onMutate: (req) => {
      console.log(req);
    },
    onError: (res) => {
      toast({
        variant: "destructive",
        title: res.response.data.message || "Uh oh! Something went wrong.",
        description: res.message || "There was a problem with your request.",
      });
    },
    onSuccess: (res) => {
      toast({
        variant: "outline",
        title: res.data.message || "Success",
      });
    },
    onSettled: (res) => {
      const formattedRes = JSON.stringify(res.data, null, 2);
      setResValue(formattedRes);
    },
  });

  function onSubmit(data) {
    const bodyData = {};

    console.log(data);

    let containFiles = false;

    data.body.forEach((body) => {
      if (body.selected) {
        bodyData[body.key] = body.value;
      }
      if(body.type === "file"){
        containFiles = true;
      }
    });

    data.headers.forEach((header) => {
      if (header.selected) {
        axios.defaults.headers.common[header.key] = header.value;
      }
    });

    url.current = data.url;
    method.current = data.method;

    const contentType = containFiles
      ? "multipart/form-data"
      : "application/json";

    axios.defaults.headers.post["Content-Type"] = contentType;
    axios.defaults.headers.put["Content-Type"] = contentType;
    axios.defaults.headers.delete["Content-Type"] = contentType;
    
    if (data.authorization) {
      axios.defaults.headers.common.Authorization = `Bearer ${data.authorization}`;
    }
      
    mutate(bodyData);
  }
  return (
    <>
      {isPending && <TopBarLoader />}
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
                    <SelectTrigger
                      className={`w-[180px] ${getMethodClassName(field.value)}`}
                    >
                      <SelectValue placeholder="HTTP Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Methods</SelectLabel>
                        {[
                          "get",
                          "post",
                          "put",
                          "patch",
                          "delete",
                          "head",
                          "options",
                        ].map((method) => (
                          <SelectItem
                            key={method}
                            value={method}
                            className={getMethodClassName(method)}
                          >
                            {method.toUpperCase()}
                          </SelectItem>
                        ))}
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
        <Editor content={resValue} />
      </div>
    </>
  );
}
