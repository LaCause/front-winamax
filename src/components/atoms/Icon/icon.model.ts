export type IconName =
  | 'home'
  | 'homeInactive'
  | 'readme'
  | 'readMeInactive'
  | 'login';

export interface IconProps {
  name: IconName;
  className?: string;
}
