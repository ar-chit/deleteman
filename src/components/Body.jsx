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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function Body() {
  const { control, setValue } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: "body",
  });

  function handleChange(index) {
    // Check if index is already selected
    if (!fields[index]?.selected) {
      setValue(`body.${index}.selected`, true);
      append({ key: "", value: "" });
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Filter keys..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-2 flex justify-center items-center gap-2 ">
              <DotsHorizontalIcon className="h-4 w-4" />
              <p>Bulk Edit</p>
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox />
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
                          handleChange(index);
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
