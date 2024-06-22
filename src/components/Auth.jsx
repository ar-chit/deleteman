import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function Auth() {
  const { register } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="auth">JWT Token</Label>
      <Input
        type="text"
        id="auth"
        placeholder="Token"
        {...register("authorization")}
      />
    </div>
  );
}
