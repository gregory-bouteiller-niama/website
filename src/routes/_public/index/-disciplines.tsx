import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/adapted/carousel";
import { Item, ItemDescription, ItemMedia, ItemTitle } from "@/components/adapted/item";
import { Logo } from "@/components/logo";
import { Section } from "@/components/section";
import { ItemContent } from "@/components/ui/item";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexDisciplines() {
  const data = {
    title: "Choisissez votre voie",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    items: [
      {
        discipline: "yog'art",
        key: "yogart",
        title: "Yog'art",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        discipline: "anima",
        key: "anima",
        title: "Hypnose spirituelle",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        discipline: "animus",
        key: "animus",
        title: "Hormèse subtile",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ] as const,
  };

  return (
    <Section id="les-voies" {...data} withSeparator>
      <div className="w-full sm:px-12">
        <Carousel className="@container flex w-full flex-col justify-center" opts={{ loop: true }}>
          <CarouselContent>
            {data.items.map((item) => (
              <CarouselItem className="basis-full lg:basis-1/2 2xl:basis-1/3" key={item.key}>
                <Item className="flex-col gap-6 bg-muted sm:flex-row" variant="outline">
                  <ItemMedia className="self-center!">
                    <Logo className="w-32" discipline={item.discipline} variant={item.key} />
                  </ItemMedia>
                  <ItemContent className="gap-4">
                    <ItemTitle className="font-bold font-heading text-3xl">{item.title}</ItemTitle>
                    <ItemDescription className="line-clamp-7 text-base text-foreground">{item.description}</ItemDescription>
                  </ItemContent>
                </Item>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
          <aside className="mt-4 flex w-32 justify-between self-center rounded-full border p-2 sm:hidden">
            <CarouselPrevious className="translate-0 static" />
            <CarouselNext className="translate-0 static" />
          </aside>
        </Carousel>
      </div>
    </Section>
  );
}
