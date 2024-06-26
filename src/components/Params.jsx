import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Params() {
  const { control, setValue } = useFormContext();

  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: "params",
  });

  function handleInputChange(index) {
    // Check if index is already selected
    if (!fields[index]?.selected) {
      setValue(`params.${index}.selected`, true);
      if (index === fields.length - 1) {
        append({ selected: false, key: "", value: "" });
      }
    }
  }

  function handleInsertNewIndex(index) {
    insert(index + 1, { selected: false, key: "", value: "" });
  }

  function handleDeleteIndex(index) {
    if (fields.length <= 1) {
      return;
    }
    remove(index);
  }

  function checkAllKeys(e) {
    fields.forEach((_, index) => {
      setValue(`params.${index}.selected`, e);
    });
  }

  return (
    <div className="w-full py-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox onCheckedChange={checkAllKeys} />
              </TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">
                  <Controller
                    control={control}
                    name={`params.${index}.selected`}
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
                    name={`params.${index}.key`}
                    render={({ field }) => (
                      <Input
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
                    name={`params.${index}.value`}
                    render={({ field }) => (
                      <Input
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        value={field.value}
                      />
                    )}
                  />
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
