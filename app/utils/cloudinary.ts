interface CloudinaryImageOptions {
  width: number;
  blur?: boolean;
}

const RASTER_EXTENSION = /\.(?:png|jpe?g)(?=($|[?#]))/i;

export const getCloudinaryImageUrl = (
  source: string,
  { width, blur = false }: CloudinaryImageOptions
) => {
  const transform = blur ? 'q_10,w_32,e_blur:300' : `q_50,w_${width}`;

  return source
    .replace('upload/', `upload/c_scale,${transform}/`)
    .replace(RASTER_EXTENSION, '.webp');
};

export const getCloudinarySrcset = (source: string, widths: number[]) =>
  widths
    .map(
      (width) => `${getCloudinaryImageUrl(source, { width })} ${width}w`
    )
    .join(',\n    ');