export interface NavigationSchema {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
  order: number;
  is_active: boolean;
  icon?: string;
  type: string;
  target?: string;
  data?: JSON;
}
