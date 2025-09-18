export interface Project {
  title: string;
  description?: string;
  path?: string;
  meta: {
    name?: string;
    period?: string;
    descriptionShort?: string;
    image?: string;
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
}
