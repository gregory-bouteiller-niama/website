import { Button } from "@/components/adapted/button";
import { LoadingSwap } from "@/components/adapted/loading-swap";
import { useFormContext } from "@/hooks/form-context";

export default function Submit({ ref }: { ref?: React.Ref<HTMLButtonElement> }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button ref={ref}>
          <LoadingSwap isLoading={isSubmitting}>Envoyer</LoadingSwap>
        </Button>
      )}
    </form.Subscribe>
  );
}
