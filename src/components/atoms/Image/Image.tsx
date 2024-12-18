interface ImageOpts {
  folder: string;
}

interface ImageProps {
  height: number;
  width: number;
  src: string;
  opts?: ImageOpts;
  className?: string;
}

export const ImageComponent: React.FC<ImageProps> = ({
  width,
  height,
  src,
  className,
}) => {
  return <img className={className} src={src} width={width} height={height} />;
};
