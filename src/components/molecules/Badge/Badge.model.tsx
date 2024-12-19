export interface BadgeProps {
  title: string;
  valueRef: React.MutableRefObject<{ min: number; max: number }>;
  field: 'min' | 'max';
}
