import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Body() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: "body",
  });

  function handleInputChange(index) {
    // Check if index is already selected
    if (!fields[index]?.selected) {
      setValue(`body.${index}.selected`, true);
      if (index === fields.length - 1) {
        append({ selected: false, key: "", type: "text", value: "" });
      }
    }
  }

  function handleInsertNewIndex(index) {
    insert(index + 1, { selected: false, key: "", type: "text", value: "" });
  }

  function handleDeleteIndex(index) {
    if (fields.length <= 1) {
      return;
    }
    remove(index);
  }

  function checkAllKeys(e) {
    fields.forEach((_, index) => {
      setValue(`body.${index}.selected`, e);
    });
  }

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input placeholder="Search keys..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-2 flex justify-center items-center gap-2 ">
              <DotsHorizontalIcon className="h-4 w-4" />
              <p>Bulk Edit</p>
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox onCheckedChange={checkAllKeys} />
              </TableHead>
              <TableHead>Key</TableHead>
              <TableHead/>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">
                  <Controller
                    control={control}
                    name={`body.${index}.selected`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    control={control}
                    name={`body.${index}.key`}
                    render={({ field }) => (
                      <Input
                        placeholder="Key"
                        onChange={(e) => {
                          handleInputChange(index);
                          field.onChange(e.target.value);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    control={control}
                    name={`body.${index}.type`}
                    render={({ field }) => (
                      <Select
                        className="w-[180px] relative"
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Type</SelectLabel>
                            {["text", "file"].map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </TableCell>
                <TableCell>
                  {watch(`body.${index}.type`) === "file" ? (
                    <Controller
                      control={control}
                      name={`body.${index}.value`}
                      render={({ field: { value, onChange, ...field } }) => (
                        <Input
                          {...field}
                          className="dark:file:text-foreground"
                          type="file"
                          onChange={(e) => {
                            onChange(e.target.files[0]);
                          }}
                          value={value?.fileName}
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      control={control}
                      name={`body.${index}.value`}
                      render={({ field }) => (
                        <Input
                          placeholder="Value"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          value={field.value}
                        />
                      )}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 ">
                    <PlusIcon
                      onClick={() => handleInsertNewIndex(index)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <TrashIcon
                      onClick={() => handleDeleteIndex(index)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
