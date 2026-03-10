import { blurhashToCssGradientString } from "@unpic/placeholder";

export const allImages = [
  {
    alt: "Eliana Corré",
    blurhash: "UAGH;w^PM^~C009[0i9u-4NM%LDjyE=]^N-:",
    height: 2731,
    slug: "eliana-corre",
    src: "https://ik.imagekit.io/niamafr/eliana-corre.png",
    width: 2731,
  },
  {
    alt: "Grégory Bouteiller",
    blurhash: "U5DR+p4:00~UQ-58x[Rk=r%fS5IV0hWU=wxa",
    height: 2169,
    slug: "gregory-bouteiller",
    src: "https://ik.imagekit.io/niamafr/gregory-bouteiller.png",
    width: 2168,
  },
] as const;

export const imageFrom = ({ alt, blurhash, height, src, width }: Images["Entry"]) => ({
  alt,
  background: blurhashToCssGradientString(blurhash),
  height,
  src,
  width,
});

export const readImageBySlug = (slug: Images["Entry"]["slug"]) => {
  const entry = allImages.find((image) => image.slug === slug);
  if (!entry) throw new Error(`Image not found: ${slug}`);
  return imageFrom(entry);
};

export const readImagesBySlugs = (slugs: Images["Entry"]["slug"][]) => allImages.filter(({ slug }) => slugs.includes(slug)).map(imageFrom);

export type Images = { Entity: ReturnType<typeof imageFrom>; Entry: (typeof allImages)[number] };
