import { cva } from "class-variance-authority";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/adapted/card";
import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@/components/adapted/field";
import { Section } from "@/components/section";
import { createContact } from "@/functions/form";
import { useAppForm } from "@/hooks/form";
import { defaultContactCreateValues, zContactCreateValues } from "@/lib/domain";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const CONTACT = {
  card: cva("@container w-full max-w-xl"),
  description: cva("italic"),
  form: cva("flex w-full flex-col items-center gap-4"),
  legend: cva(""),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexContact() {
  const data = {
    description:
      "Notre portail, actuellement à ses prémices, est amené lui aussi à grandir en vous proposant plus de choix et de fonctionnalités. N'hésitez pas à nous contacter si vous souhaitez entamer un parcours, proposer votre voie ou devenir vous-même accompagnant. Sentez-vous libres de nous faire part de vos remarques ou poser vos questions.",
    title: "Et arpentez le chemin...",
  };

  const subjects = [
    { label: "Commencer mon parcours", value: "discipline" },
    { label: "Devenir accompagnant", value: "attendant" },
    { label: "Poser une question", value: "question" },
  ];

  const form = useAppForm({
    defaultValues: defaultContactCreateValues,
    onSubmit: async ({ value }) => {
      await createContact({ data: value });
      form.reset();
      toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.");
    },
  });

  return (
    <Section id="contact" {...data} withSeparator>
      <Card className={CONTACT.card()}>
        <CardContent>
          <form
            className={CONTACT.form()}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend className={CONTACT.legend()}>Votre demande</FieldLegend>
                  <FieldDescription className={CONTACT.description()}>- tous les champs sont obligatoires -</FieldDescription>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <form.AppField name="forename" validators={{ onChange: zContactCreateValues.shape.forename }}>
                      {({ InputField }) => <InputField label="Prénom" type="text" />}
                    </form.AppField>
                    <form.AppField name="surname" validators={{ onChange: zContactCreateValues.shape.surname }}>
                      {({ InputField }) => <InputField label="Nom" type="text" />}
                    </form.AppField>
                  </div>
                  <form.AppField name="email" validators={{ onChange: zContactCreateValues.shape.email }}>
                    {({ InputField }) => <InputField label="Courriel" type="email" />}
                  </form.AppField>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <form.AppField name="subject" validators={{ onChange: zContactCreateValues.shape.subject }}>
                      {({ SelectField }) => <SelectField defaultValue="discipline" items={subjects} label="Sujet" placeholder="Sujet" />}
                    </form.AppField>
                    <form.AppField name="discipline" validators={{ onChange: zContactCreateValues.shape.discipline }}>
                      {({ DisciplinesSelectField }) => <DisciplinesSelectField />}
                    </form.AppField>
                  </div>
                  <form.AppField name="message" validators={{ onChange: zContactCreateValues.shape.message }}>
                    {({ TextareaField }) => <TextareaField label="Message" />}
                  </form.AppField>
                </FieldSet>
              </FieldGroup>
              <form.Submit />
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
