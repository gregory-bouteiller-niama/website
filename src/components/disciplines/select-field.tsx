import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/adapted/select";
import { Field } from "@/components/form/field";
import { disciplines } from "@/data/disciplines";
import { useFieldContext } from "@/hooks/form-context";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export default function DisciplinesSelectField() {
  const { handleChange, name, state } = useFieldContext<string>();

  const items = [
    { label: "Voie non déterminée", value: "unknown" },
    { label: "Nouvelle voie", value: "new" },
    ...disciplines.map(({ slug: value, title: label }) => ({ label, value })),
  ];

  return (
    <Field label="Voie">
      {(isInvalid) => (
        <Select items={items} name={name} onValueChange={(value) => handleChange(value ?? "unknown")} value={state.value}>
          <SelectTrigger aria-invalid={isInvalid} className="min-w-[120px]" id={name}>
            <SelectValue placeholder="Voie" />
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
