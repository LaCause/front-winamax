import { BASENAME } from '../../../router';

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
  const url = `${BASENAME}/${src}`;

  return <img className={className} src={url} width={width} height={height} />;
};
