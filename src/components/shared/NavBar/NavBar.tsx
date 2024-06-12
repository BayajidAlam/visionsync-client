import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


const NavBar = () => {
  // @ts-ignore
  const { user, logOutUser } = useContext(AuthContext);
  const [expand, setExpand] = useState(false);


  const handleLogOut = () => {
    logOutUser()
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const components: { title: string; href?: string }[] = [
    {
      title: "Create types",
      href: "/create-types",
    },
    {
      title: "Change password",
      href: "/change-password",
    },
    {
      title: "Logout",
    },
  ];

  return (
    <div className="border-b-2 py-2 px-2 bg-smartErpMain relative w-full list-none">
      <div className="container mx-auto md:flex justify-between items-center hidden">
        <Link to="/">
          <h1 className="text-green font-bold uppercase text-xl">Mahlun</h1>
        </Link>

        <div className="flex justify-end items-center">
          <div className="flex justify-end items-center gap-4 text-lg text-green mr-1">
            <Link to={"/"}>Home</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>

          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex justify-center items-center gap-4">
                  <IoSettings className="text-2xl text-black" />
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[160px]  p-3 md:w-[160px] md:grid-cols-1 lg:w-[160px]">
                  {components.map((component) => {
                    if (component.title === "Logout") {
                      return (
                        <button
                          key={component.title}
                          onClick={handleLogOut}
                          className="text-left"
                        >
                          {component.title}
                        </button>
                      );
                    } else {
                      return (
                        <Link key={component.title} to={component.href || ""}>
                          {component.title}
                        </Link>
                      );
                    }
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </div>

      <div className="container mx-auto md:hidden justify-between items-center flex">
        <h1 className="text-green font-bold uppercase text-xl">Mahlun</h1>
        <div onClick={() => setExpand(!expand)} className="text-3xl">
          <IoMenu />
        </div>
      </div>
      {expand && (
        <div className="flex flex-col justify-end items-center text-lg text-green absolute top-0 left-0 w-full z-50 bg-slate-500  rounded md:hidden animate-in duration-1000">
          <Link
            className="text-xl text-center bg-black w-full p-1 mx-auto text-white"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="text-xl text-center bg-black w-full p-1 mx-auto text-white"
            to={"/dashboard"}
          >
            Dashboard
          </Link>
          <Link
            className="text-xl text-center bg-black w-full p-1 mx-auto text-white"
            to={"/create-types"}
          >
            Create types
          </Link>
          <Link
            className="text-xl text-center bg-black w-full p-1 mx-auto text-white"
            to={"/change-password"}
          >
            Change password
          </Link>

          <button
            onClick={handleLogOut}
            className="text-xl bg-black w-full p-2 mx-auto text-white"
          >
            Logout
          </button>
          <button
            className="text-3xl bg-black w-full p-2 mx-auto"
            onClick={() => setExpand(!expand)}
          >
            <RxCross2 className="text-center w-full text-white " />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
