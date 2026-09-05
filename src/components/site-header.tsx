"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategoryAccent, getCategoryIcon } from "@/lib/category-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const FEATURED_CATEGORY_SLUGS = [
  "pdf-tools",
  "image-tools",
  "video-tools",
  "developer-tools",
  "text-tools",
  "calculators",
  "ai-tools",
  "security-tools",
];

const featuredCategories = TOOL_CATEGORIES.filter((category) =>
  FEATURED_CATEGORY_SLUGS.includes(category.slug)
);

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="px-3 pt-3 sm:px-4 sm:pt-4">
      <header className="sticky top-3 z-40 mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-2xl border bg-background/85 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70 sm:top-4 sm:px-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Toolspica"
              width={32}
              height={28}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="flex flex-col items-start gap-1">
            <Link
              href="/"
              className="py-0.5 text-lg font-semibold leading-tight tracking-tight"
            >
              Toolspica
            </Link>
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-0.5 text-[10px] leading-tight text-muted-foreground hover:text-brand"
            >
              by {SITE.parentBrand}
            </a>
          </div>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 gap-1 p-3">
                  {featuredCategories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category.slug);
                    const accent = getCategoryAccent(category.slug);
                    return (
                      <NavigationMenuLink
                        key={category.slug}
                        render={<Link href={`/${category.slug}`} />}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-accent"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
                            accent
                          )}
                        >
                          <CategoryIcon className="size-4" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium">
                            {category.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {category.tools.length} tools
                          </span>
                        </span>
                      </NavigationMenuLink>
                    );
                  })}
                </div>
                <div className="border-t p-2">
                  <NavigationMenuLink
                    render={<Link href="/categories" />}
                    className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand hover:bg-accent"
                  >
                    View all {TOOL_CATEGORIES.length} categories
                    <ChevronRight className="size-3.5" />
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/pdf-tools" />}
                className={cn(
                  "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-accent"
                )}
              >
                PDF Tools
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/image-tools" />}
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-accent"
              >
                Image Tools
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/about" />}
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-accent"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/search" />}
            nativeButton={false}
            aria-label="Search tools"
            className="hidden sm:inline-flex"
          >
            <Search className="size-[1.1rem]" />
          </Button>
          <Button
            render={<Link href="/categories" />}
            nativeButton={false}
            className="hidden sm:inline-flex"
          >
            Browse all tools
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85vw] max-w-xs flex-col gap-0 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="size-3.5" />
                  </span>
                  Toolspica
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 p-4">
                <Button
                  variant="outline"
                  render={<Link href="/search" onClick={() => setMobileOpen(false)} />}
                  nativeButton={false}
                  className="justify-start"
                >
                  <Search className="size-4" />
                  Search tools
                </Button>
                <Button
                  render={<Link href="/categories" onClick={() => setMobileOpen(false)} />}
                  nativeButton={false}
                  className="justify-start"
                >
                  Browse all tools
                </Button>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
                <p className="px-3 pb-1.5 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Categories
                </p>
                <div className="flex flex-col gap-0.5">
                  {TOOL_CATEGORIES.map((category) => {
                    const CategoryIcon = getCategoryIcon(category.slug);
                    const accent = getCategoryAccent(category.slug);
                    return (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                      >
                        <span
                          className={`flex size-7 shrink-0 items-center justify-center rounded-md ${accent}`}
                        >
                          <CategoryIcon className="size-3.5" />
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {category.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {category.tools.length}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <SheetFooter className="gap-1 border-t p-2">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent"
                >
                  About
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="size-3.5 text-muted-foreground" />
                    Contact
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </Link>
                <a
                  href={SITE.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 pt-2 text-xs text-muted-foreground hover:text-brand"
                >
                  Toolspica by {SITE.parentBrand}
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}
