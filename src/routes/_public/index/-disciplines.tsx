import { cva } from "class-variance-authority";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/adapted/carousel";
import { ItemDescription, ItemMedia, ItemTitle } from "@/components/adapted/item";
import { SpotlightItem } from "@/components/adapted/spotlight-item";
import { Logo } from "@/components/logo";
import { Section } from "@/components/section";
import { ItemContent } from "@/components/ui/item";
import { disciplines } from "@/data/disciplines";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const DISCIPLINES = {
  carousel: cva("flex w-full flex-col justify-center"),
  carouselControl: cva("hidden sm:inline-flex"),
  carouselItem: cva("@container basis-full lg:basis-1/2 2xl:basis-1/2"),
  item: cva("h-full @lg:flex-row flex-col gap-6 bg-card p-6"),
  itemContent: cva("gap-1"),
  itemDescription: cva("line-clamp-none text-pretty text-center @lg:text-start font-light text-base text-foreground"),
  itemMedia: cva("self-center!"),
  itemTitle: cva("mb-3 @lg:self-start self-center font-bold font-heading text-3xl"),
  logo: cva("w-32"),
  mobileControl: cva("translate-0 static"),
  mobileControls: cva("mt-4 flex w-32 justify-between self-center rounded-full border p-2 sm:hidden"),
  wrapper: cva("w-full sm:px-12"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexDisciplines() {
  const data = {
    title: "Choisissez votre voie",
    description:
      "Nous vous proposons différentes pistes sur lesquelles sillonner. Aucune n'est exclusive ou ne détient à elle seule la vérité. Optez simplement pour celle avec laquelle votre Être résonne dans le moment présent et sentez vous libre d'en explorer d'autres par la suite.",
  };

  return (
    <Section id="les-voies" {...data} withSeparator>
      <div className={DISCIPLINES.wrapper()}>
        <Carousel className={DISCIPLINES.carousel()} opts={{ loop: true }} plugins={[Autoplay({ delay: 10_000 })]}>
          <CarouselContent>
            {disciplines.map((item) => (
              <CarouselItem className={DISCIPLINES.carouselItem()} key={item.slug}>
                <SpotlightItem className={DISCIPLINES.item()} color={item.color} variant="outline">
                  <ItemMedia className={DISCIPLINES.itemMedia()}>
                    <Logo className={DISCIPLINES.logo()} discipline={item.name} variant={item.slug} />
                  </ItemMedia>
                  <ItemContent className={DISCIPLINES.itemContent()}>
                    <ItemTitle className={DISCIPLINES.itemTitle()}>{item.title}</ItemTitle>
                    {item.description.map((sentence) => (
                      <ItemDescription className={DISCIPLINES.itemDescription()} key={sentence}>
                        {sentence}
                      </ItemDescription>
                    ))}
                  </ItemContent>
                </SpotlightItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={DISCIPLINES.carouselControl()} />
          <CarouselNext className={DISCIPLINES.carouselControl()} />
          <aside className={DISCIPLINES.mobileControls()}>
            <CarouselPrevious className={DISCIPLINES.mobileControl()} />
            <CarouselNext className={DISCIPLINES.mobileControl()} />
          </aside>
        </Carousel>
      </div>
    </Section>
  );
}
