import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-surface border-outline-variant w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-0 max-w-container-max mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image
              alt="Rongtuli Logo"
              className="h-[70px] w-auto object-contain"
              src="/images/logo.png"
              width={200}
              height={70}
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 py-4">
          <button className="md:hidden p-2 text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
