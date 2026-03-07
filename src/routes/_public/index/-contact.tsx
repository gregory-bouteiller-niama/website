import { cva } from "class-variance-authority";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/adapted/card";
import { Section } from "@/components/section";
import { createContact } from "@/functions/form";
import { useAppForm } from "@/hooks/form";
import { zContactCreateValues } from "@/lib/domain";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const CONTACT = {
  card: cva("w-full max-w-xl"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexContact() {
  const data = {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    title: "Et arpentez le chemin...",
  };

  const form = useAppForm({
    defaultValues: { email: "", forename: "", message: "", surname: "" },
    onSubmit: async ({ value }) => {
      await createContact({ data: value });

      form.reset();
      toast.success("Merci de votre intérêt ! Je vous recontacte très bientôt.");
    },
  });

  return (
    <Section id="contact" {...data} withSeparator>
      <Card className={CONTACT.card()}>
        <CardContent>
          <form
            className="flex w-full flex-col items-end gap-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <form.AppField name="forename" validators={{ onChange: zContactCreateValues.shape.forename }}>
                {({ InputField }) => <InputField label="Prénom" type="text" />}
              </form.AppField>
              <form.AppField name="surname" validators={{ onChange: zContactCreateValues.shape.surname }}>
                {({ InputField }) => <InputField label="Nom" type="text" />}
              </form.AppField>
              <form.AppField name="email" validators={{ onChange: zContactCreateValues.shape.email }}>
                {({ InputField }) => <InputField label="Courriel" type="email" />}
              </form.AppField>
              <form.AppField name="message" validators={{ onChange: zContactCreateValues.shape.message }}>
                {({ TextareaField }) => <TextareaField label="Message" />}
              </form.AppField>
              <form.Submit />
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
