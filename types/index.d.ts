export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    instance: string;
    password: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;  
}