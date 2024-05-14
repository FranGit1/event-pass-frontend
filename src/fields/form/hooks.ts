import { useController, useFormContext } from "react-hook-form";

export function useFormError(name: string): string | null {
  const { control } = useFormContext();
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return error?.message ?? null;
}

export function useFormField(name: string) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });
  return field;
}
