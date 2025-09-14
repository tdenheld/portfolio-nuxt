export interface CarouselEntry {
  meta: {
    name?: string;
    period?: string;
    descriptionShort?: string;
    color?: {
      fg: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      bg: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
  };
  title: string;
  path?: string;
}
