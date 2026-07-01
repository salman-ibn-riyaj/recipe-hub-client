'use client'
import {LayoutSideContentLeft, Plus, Briefcase, Gear, House, Magnifier, Person, LayoutHeaderSideContent, MagnifierPlus, Bookmark, Flame, CreditCard, FileExclamation, Heart} from "@gravity-ui/icons";
import {Avatar, Button, Card, Drawer} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userNavLinks = [
  { icon: LayoutHeaderSideContent,      label: "Dashboard",    href: "/userDashboard" },
  { icon: MagnifierPlus, label: "Add Recipe",         href: "/userDashboard/addRecipe" },
  { icon: Bookmark,  label: "My Recipes",   href: "/userDashboard/myRecipes" },
  { icon: CreditCard,      label: "My Purchased", href: "/userDashboard/myPurchased" },
  { icon: Heart,    label: "Favorites",      href: "/userDashboard/favorites" },
  { icon: Person,          label: "Profile",     href: "/userDashboard/profile" },
];

const adminNavLinks = [
  { icon: LayoutHeaderSideContent, label: "Dashboard",  href: "/adminDashboard" },
  { icon: Person,                  label: "Users",      href: "/adminDashboard/users" },
  { icon: Flame,                label: "Recipes",  href: "/adminDashboard/recipes" },
  { icon: FileExclamation,               label: "Reports",       href: "/adminDashboard/reports" },
  { icon: CreditCard,              label: "Transactions",   href: "/adminDashboard/transactions" },
];

const navLinkMappings = {
  user : userNavLinks,
  admin: adminNavLinks
}

const DashboardLayout = ({user}) => {
  const pathname = usePathname();
  if(!user?.role) return null;
  const navItems = navLinkMappings[user?.role] ?? [];
  
  const navLinksList = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive 
                ? "bg-mint text-primary shadow-sm" 
                : "text-muted-foreground hover:bg-mint/50 hover:text-primary"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen">
      {}
      <aside className="hidden md:flex flex-col justify-between bg-surface border-r border-border h-full w-72 shadow-sm relative z-20">
        
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {}
          <div className="p-6 sticky top-0 bg-surface/95 backdrop-blur-sm z-10">
            <Link href={'/'} className="inline-block transition-transform hover:scale-105">
              <Image
                src={'/images/recipehub_logo_2.png'}
                width={200}
                height={100}
                alt="RecipeHub"
                className="w-32 h-auto"
              />
            </Link>
          </div>

          {}
          <div className="flex-1">
            {navLinksList}
          </div>
        </div>
       
        {}
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface shadow-sm border border-border/50 hover:border-primary/20 transition-colors">
            <Avatar
              name={user.name}
              size="md"
              className="shrink-0 ring-2 ring-primary/20"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm text-foreground truncate capitalize">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
            <div className="ml-auto flex items-center justify-center bg-mint text-primary text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">
              {user.role}
            </div>
          </div>
        </div>
      </aside>

      {}
      <Drawer>
        <Button 
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-primary text-white shadow-lg px-6 py-3 rounded-full hover:-translate-y-1 transition-transform font-medium" 
        >
          <LayoutSideContentLeft className="w-5 h-5" />
          Menu
        </Button>
        
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-surface w-72 max-w-[80vw]"> 
            <Drawer.Dialog>
              <Drawer.CloseTrigger className="absolute top-4 right-4 p-2 bg-mint text-primary rounded-full hover:bg-primary hover:text-white transition-colors" />
              <Drawer.Body className="p-0 overflow-y-auto">
                <div className="p-6">
                   <Link href={'/'}>
                    <Image
                      src={'/images/recipehub_logo_2.png'}
                      width={160}
                      height={80}
                      alt="RecipeHub"
                      className="w-28 h-auto"
                    />
                  </Link>
                </div>
                {navLinksList}
                <div className="mt-auto p-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold capitalize">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                  </div>
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default DashboardLayout;