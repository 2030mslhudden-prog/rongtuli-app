import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest py-16 border-t border-outline-variant mt-section-gap">
      <div className="flex flex-col items-center justify-center gap-8 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="text-headline-sm font-headline-sm font-bold text-primary">
          <Image
            alt="Rongtuli Logo"
            className="h-12 w-auto"
            src="/images/logo.png"
            width={150}
            height={48}
          />
        </Link>
        <div className="flex flex-wrap justify-center gap-8 text-body-sm font-body-sm text-on-surface-variant">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors font-medium">
            Privacy Policy
          </Link>
          <Link href="/return-refund-policy" className="hover:text-primary transition-colors font-medium">
            Return & Refund Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors font-medium">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:text-primary transition-colors font-medium">
            Contact Us
          </Link>
          <Link href="#" className="hover:text-primary transition-colors font-medium">
            About Us
          </Link>
        </div>
        <p className="text-body-sm font-body-sm text-on-surface-variant mt-4">
          © 2024 Rongtuli Marketplace. Art of Imagination.
        </p>
      </div>
    </footer>
  );
}
