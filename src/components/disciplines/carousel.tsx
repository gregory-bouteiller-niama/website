import { cva } from "class-variance-authority";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/adapted/carousel";
import { ItemDescription, ItemMedia, ItemTitle } from "@/components/adapted/item";
import { SpotlightItem } from "@/components/adapted/spotlight-item";
import { Logo } from "@/components/logo";
import { ItemContent } from "@/components/ui/item";
import type { Disciplines } from "@/functions/disciplines";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const DISCIPLINES = {
  base: cva("w-full sm:px-12"),
  carousel: cva("flex w-full flex-col justify-center"),
  carouselControl: cva("hidden cursor-pointer sm:inline-flex"),
  carouselItem: cva("@container basis-full lg:basis-1/2 2xl:basis-1/2"),
  item: cva("h-full @lg:flex-row flex-col gap-6 bg-card p-6"),
  itemContent: cva("gap-1"),
  itemDescription: cva("line-clamp-none text-pretty text-center @lg:text-start font-light text-base text-foreground"),
  itemMedia: cva("self-center!"),
  itemTitle: cva("mb-3 @lg:self-start self-center font-bold font-heading text-3xl"),
  logo: cva("w-32"),
  mobileControl: cva("translate-0 static cursor-pointer"),
  mobileControls: cva("mt-4 flex w-32 justify-between self-center rounded-full border p-2 sm:hidden"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function DisciplinesCarousel({ items }: DisciplinesCarouselProps) {
  return (
    <div className={DISCIPLINES.base()}>
      <Carousel className={DISCIPLINES.carousel()} opts={{ loop: true }} plugins={[Autoplay({ delay: 10_000 })]}>
        <CarouselContent>
          {items.map((item) => (
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
  );
}
export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };
