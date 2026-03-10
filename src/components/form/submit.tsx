import { useRef } from "react";
import { Button } from "@/components/adapted/button";
import { LoadingSwap } from "@/components/adapted/loading-swap";
import { useFormContext } from "@/hooks/form-context";

export default function Submit() {
  const form = useFormContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button className="cursor-pointer text-base" ref={buttonRef} size="lg" type="submit">
          <LoadingSwap isLoading={isSubmitting}>Envoyer</LoadingSwap>
        </Button>
      )}
    </form.Subscribe>
  );
}
