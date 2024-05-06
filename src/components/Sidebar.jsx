"use client";

import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  MenuIcon,
  HomeIcon,
  Package2,
  User2,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTrigger,SheetTitle,SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
const SideBarItem = ({ isOpen, isActive, onClick, icon, label }) => {
  return (
    <div
      className={`flex gap-1 justify-start items-start hover:cursor-pointer hover:bg-offwhite
       w-full p-2 rounded-xl 
       transition-all duration-1000
       ${isActive ? "bg-offwhite" : ""}`}
      onClick={onClick}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive
                  ? "bg-gray1 text-accent-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              {icon}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p
        className={`${isOpen ? "flex" : "hidden"} ${
          isActive ? "font-bold" : ""
        } transition-all duration-75`}
      >
        {label}
      </p>
    </div>
  );
};

const Sidebar = ({alreadyInNavbar}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
    
     {!alreadyInNavbar && <Sheet className="border-2 rounded-xl p-2 ">
        <SheetTrigger asChild className="mt-2 flex items-center justify-center">
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden group flex h-9 w-9 shrink-0 items-center hover:cursor-pointer justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <MenuIcon className="h-5 w-5" />
     
          </Button>
        </SheetTrigger>
       
        <SheetContent side="left" className="sm:max-w-xs">
        <SheetHeader>
      <SheetTitle className="flex justify-start px-6 py-2 m-2">Logo</SheetTitle>
      <SheetDescription>
       
      </SheetDescription>
    </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
          <section className="flex flex-col p-2 gap-4 tems-start justify-start w-full transition-all duration-1000">
            <SideBarItem
              isOpen={true}
              isActive={activeItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
            />
            <SideBarItem
              isOpen={true}
              isActive={activeItem === "orders"}
              onClick={() => handleItemClick("orders")}
              icon={<ShoppingCart className="h-5 w-5" />}
              label="Orders"
            />
            <SideBarItem
              isOpen={true}
              isActive={activeItem === "products"}
              onClick={() => handleItemClick("products")}
              icon={<Package className="h-5 w-5" />}
              label="Products"
            />

            {/* Add other menu items similarly */}
          </section>
          </nav>
        </SheetContent>
      </Sheet>}

      <aside
        className={` hidden sm:flex md:min-h-screen left-0 ${
          isOpen ? "w-[400px]" : "w-16"
        } flex-col border-r bg-background sm:flex transition-all duration-500`}
      >
        <nav className="hidden sm:flex flex-col items-start gap-4 px-1 sm:py-5 w-full ">
          <div className="flex w-full border-2 rounded-xl p-2 justify-start items-center gap-2">
            <div
              className="group flex h-9 w-9 shrink-0 items-center hover:cursor-pointer justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            <p className={`${isOpen ? "" : "hidden"}`}>logo</p>
          </div>
          <Separator />
          <section className="flex flex-col p-2 gap-4 tems-start justify-center w-full transition-all duration-1000">
            <SideBarItem
              isOpen={isOpen}
              isActive={activeItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
            />
            <SideBarItem
              isOpen={isOpen}
              isActive={activeItem === "orders"}
              onClick={() => handleItemClick("orders")}
              icon={<ShoppingCart className="h-5 w-5" />}
              label="Orders"
            />
            <SideBarItem
              isOpen={isOpen}
              isActive={activeItem === "products"}
              onClick={() => handleItemClick("products")}
              icon={<Package className="h-5 w-5" />}
              label="Products"
            />

            {/* Add other menu items similarly */}
          </section>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
/*
<div
      className={`flex gap-1 justify-start items-center hover:cursor-pointer hover:bg-offwhite
       w-full  rounded-xl 
       transition-all duration-1000
       ${(activeItem === "dashboard")? "bg-offwhite" : "" }`
      }
      onClick={()=>handleItemClick("dashboard")}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                (activeItem === "dashboard") ? "bg-gray1 text-accent-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
             <Home className="h-5 w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">      Dashboard</TooltipContent>
        </Tooltip>
      <p className={`${isOpen ? "flex" : "hidden"} ${(activeItem === "dashboard") ? "font-bold" : ""} transition-all duration-75`}>
      Dashboard
      </p>
      </TooltipProvider>
    </div>


*/
