export interface Color {
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
}

export interface Highlight {
  title: string;
  items: string[];
}

export interface Page {
  path: string;
  title: string;
  description?: string;
  name?: string;
  meta: {
    period?: string;
    descriptionShort?: string;
    highlights?: Highlight[];
    image?: string;
    visit?: string;
    color?: Color;
    items?: { src: string; alt: string; rounded: boolean }[];
  };
}
