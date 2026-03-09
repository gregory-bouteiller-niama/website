import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/adapted/select";
import { useFieldContext } from "@/hooks/form-context";
import { Field } from "./field";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export default function SelectField({ defaultValue, items, label, placeholder }: SelectFieldProps) {
  const { handleChange, name, state } = useFieldContext<string>();

  return (
    <Field label={label}>
      {(isInvalid) => (
        <Select items={items} name={name} onValueChange={(v) => handleChange(v ?? defaultValue)} value={state.value}>
          <SelectTrigger aria-invalid={isInvalid} className="min-w-[120px]" id={name}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
}
export type SelectFieldProps = { defaultValue: string; items: { label: string; value: string }[]; label: string; placeholder: string };
