"use client";

import Link from "next/link";

const uiKitCards = [
  { id: "ui-kit-1", title: "SaaS Dashboard Pro", price: "$24", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkangWzcvZTs-IQelI8OB846Zr3VvbQfU0I2-8ap93kyDdbd-ffTZJHjaiMBG01FoSD1ECzF3VqOoFhUbwDVa3E_iv1SH84iaJFiH-jqSdPieND8OolVlwwo0D3K6qDsApm9YvlqZEVSyMUJ9O7HE_ovd4NSPi2mQyeRbwu0gReEyZbDDrN05-Oe_-pjJLqGzRYoOQHsHhvWEbAviODUgR9vbt7J0cvgHDw_mapHFISACvvhBWio-b" },
  { id: "ui-kit-2", title: "E-commerce App UI", price: "$29", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAli_HfEnPL4LsqC70irD5yC78BWlxDoRDbctJfmaKJUdpIhFhvr2yXG02m0GHL5go0d_t1_dTUrH4hVixQ7oCs0BEYcu84NrgOySZbgL5UBtsmtM5c5oIbAC7m35KbTwGQN3WU_xYSDXXICvJcN2_XcM1u0m9jkwd_518DzmK1F7Dp5_5XJp8gfQP0zRkzSQ5jr07HxUk9j3CN5Vp2fx-d7GHyKrLdRi0i5eQevDfLgOAHVXauVk-2" },
  { id: "ui-kit-3", title: "Fintech Wireframes", price: "$19", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkIGs4_9YuIqhYIVrucFlsoVQWzD9Fm3q_tQfLWeC1BDN_VFcgJ9KJkUG0LgNxUQpaG-1Y5DI3jkmg-kBitApjqX0qbQMXqUhDF-zoRuloOUKusztaw-rWx97lVR0G003mbM4unghlZ7SlkyWDQF4tNmhM6mnL0aTXhciQq2d6PBK33B6oLe6dwrPwEYwyzPCWm730RnqKsRzsDplEYQ2EG9U8xkhrgeQIyrcJ6qK9gAP-_BDNDdsK" },
  { id: "ui-kit-4", title: "Analytics Admin Panel", price: "$35", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQMrnZcNOyM1vZnJy1-MUicewOg2tmCa4Jydekyoe6GTpOHMKfUXGteyMDRnD7P7mxvOPKmnZ2PX5AYZo_b4gZ5k1cQG6IH-ReS-5NsVJShqkI04sfOYsB1CKhzp8_uC_s1CxJ1c63w7tPoRN0Aoi02uEc0ByzpCrsdUI0HrrDWWEqBelcVtiINqNzrBNw8VkiiNIAwKldoa3xSW0fUqVwdP9GKp8vK5PQrmO9fni4qMC1LAq2nxr1" },
  { id: "ui-kit-5", title: "Medical Web App UI", price: "$22", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgWJsDJ-GhlvYYKrpI0T9oz_MQ0cnj_SM-VYTS4V1iV5FZzw17nl6-eYVo4Hm3XK0farcEHgVh6v4ocQmTD4TW7uonaPnFxafUFdlCGxPaDBkQ0p103bt-Z4FycHRygGE6OpUMK99imdwD-lpJ5S6exYOwEjiX_ejQQ3nEcc0P95htnf8EU4iA7Q-J3FipctVnEkKHyk6y618QpdcZXUg2tzYDlcnX9jjDxWklXRffmoJpcS8YRTPz" },
];

const vectorCards = [
  { id: "vec-1", title: "Abstract Shapes Pack", price: "$15", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa8pRzrlhs-R-oU7J_kSPbRYvqVlPIigd-i8NYFG93Bb_7Zf5usIuXDvlqJv9hp9XMfDRIGkhIzhqZiy2-SkrYSX9CDzolTyVbTWIa4hNd6yOqus4xgqYTWtWFqOuXKb3puMLXu6wyri8LcaY3YysqdR7yDa--p5lAmVNuIG7MMKBflUBg8AzhCZAOrAXu-BvO3rPYYS5VxgEONHtvvhTqjZB72im4QHBq1Y3RmOn8TwzZuR8lRpT-" },
  { id: "vec-2", title: "3D Concept Elements", price: "$28", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB1dNuBaYj3po0_3jbGu76hfQRBrni27CDqKXvUG9EyVi3D8eCumv370hdSCvhQvkG5A25koMrDLnnWuEUqy501yAdahfQjHTCyYX1ITo1mnMnkmCbPLFJJLqJFMEsUzMwWQ7C-mT76aJBxb2ylag-ohI6MnHexfvHV7IQWtMxjyql3vNPpTs2PsbREr8i4B9tWo9e4w1Wp3svj5kdkAvVvge_LiiMDYm6n1gyX1Ti9a_Chyjd-XCF" },
  { id: "vec-3", title: "Nature Line Art", price: "$12", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5b16YmT2gZ7LwJTwYtvysZyfZtnTvR_ZlihWH_xuur1aQuRaObq5LHhXpCkctu9Aj_NDRPcAA2DiLZ1fTC_Edo6-VDsS4m0AtMIEoIzR_8vxqAtQFot-Gucd2eCItk5PShlhe2cPjS9Lvq56tiX4-IzxZ4qBpuV9Sp7rQSKJuH8QrnQGJd-De3nq8WpR9-4VqXNKt9BLtc5MbVcXfDE0bpTqM0nevRGc5T4hvd9uQb90BDPtVWvVR" },
  { id: "vec-4", title: "Memphis Style Patterns", price: "$18", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAny-X1SydsvAGdzf-MQaIbNPtS1untARml6_ffZnLG0Bg4z0X5-Y_S2RSbVcXT-dQ1X4mSQ38OKzLyvOubFw9sb91LuoEBOXZG23nrSlV-vEvL7upC3xPmWZKcm5_zzbunDCXZ002iGa6-7gar0NSOdUfpASjusvkBWB4POsyuAGrHpMFoFki5t-7KjTwRpQFmBcyMW43DCG8ENW9mgK4G7oC6-uRb6lu36FNdqFB5WgVxDor7vA_H" },
  { id: "vec-5", title: "Tech Isometric Vectors", price: "$25", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNxZ_yn33jeiA3vfC58y1rqFhpCj7vDloGwMNrTDYllU3oSE3uT1damfzIGjj6VryAXTCiRpOPvFs8NatJqrTHjeanPP0P8lyI4M8NasH-vhJf3JQ1BTV84Yyszw0IKWPQb_FC3QuOdXCwyrep-y14TEf_9246_ucc7DIJKsnaDazmtvzQmgLKdML0BDjdnFg3_pbwbkU94_PdYjENCvgdYIZJ2mP2xn-92fN0pyi06fQ4WqQ6ZdZG" },
];

const featuredCards = [
  { id: "feat-1", title: "Modern Dashboard Kit", price: "$24", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRqc_TpWMxMFP4kFj6n4XWWga6eV7O76pt-Sph7KRyuDKk4M7iZEeOsIpDtGM3EaxVgJ8svx47KcZQQmGVF-PiMTcfDR319vqwd2ANBWbZDqzkhc8h82rLA9E74eMf9an-CopGNdG9jazbRp2lYYC_r3XH8S5S9H8-beWeITrixl2aMR-j435LCMmeg2siF9knhvyehCfgAEEz_dkP5LmK0ezXMYbeHV6DlYpssrFn07cNitY7LxX-" },
  { id: "feat-2", title: "Vector Illustration Pack", price: "$18", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZwZLoL-b_DV6SRJTVqOmfa_hx28HIX998WNHd7-V6r7EEkuTP2a8aVuwcgkXnagzS3Ocoi-kBeqgvYHVDETpq0OBUtTMfLAd8BqqZihwYdB8ATDWiFL80fqZqIeumlX8CjZauMvEmat5yh4BW4nZJMVY2n7TbfQQKar1uwRJDPxmi_Tsdb5uzFwM4EcstJ8IGt-fP_kCNlxrglp8h4w58EPDtsa-EKsdEbzqBsMdN_ami9-wVjlfo" },
  { id: "feat-3", title: "Elegant Serif Font", price: "$35", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZjY2xpvOq28Tmx0JJMbhuYCKO6TjnamafcLoCsLpaEIL2A1CX0XUdeclv-Hb6sfK9UV8-c1zJNg4iMT3e19vICe_6NSPWf-0IG2yuj9-jzw0GavwA0h2VeOe6oAZ5SciZ_2suD9IK5OKEWlpClKtcKrjACLDLvQVMQ_u1uBeLk36J0fOg8wj_ZNvqkV-RMOnFgPyhZRBURj1oV-eZz68BpW0zTQPGXkufK9qIFp2i18Ua7ibDsPmh" },
  { id: "feat-4", title: "App Wireframe Kit", price: "$29", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBctqc_COjeVtUCbgBvWgz7RiKiOPgGZG9Z97sY6Ac_XEFzhs1zc8ZicKdkJxKovNyQcO3uS2aW11urb158lXT_KmOkXmHSAHsT9ZqF0PLSbrDXFrcR98q6fvR3NUw0ntglqMze2cyDuTtDYtf4XwLTw_XA6YpR8B4kaSuwQJklSrha3UsDIjBDymvAXCYMeEbeqVXAIfEamJGJhjam60FT4rTv5Pm_dTWUpH1DhIv0MHi21Zfq1onO" },
  { id: "feat-5", title: "Brand Strategy Deck", price: "$21", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9vJ2h0m-7bNYnDgRjKc5WJe7N2pm3kyrb3_2sM0s3wV3t1Bq4JmI5YNvJbS1bgYb1M7cpwZQCHCaXH0-9YwS1RzW11M6i74Baf1jMJg91k3I8m2IYbjm677rPNtP2g2-Kh7psuYg7r7jvGmMWAaru1s-UO7z4GYjn7d4vVhP_i6-Lp3JZg7J1T7nSVz0dM2mlyw-6x7nDg" },
  { id: "feat-6", title: "Poster System Kit", price: "$16", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6V3YBqsj-Nn5-8PgTw0qWljmJkWqvV7T4h86AeI7lZq4U8J5qG9QDP0VdRvbJ7-bY8VgEoZu0nQr1S1MrHqsRcLxJbpxM4Q0t5hE9VgY6rOC6aYHDeq5YCV2Ir0B1Yj5F0v3d7S7A1_h3nFQ8rM2nCJx9jPv0nMj4Hkk01AImwXGmiq5S5e0m5JbYIeKp3v3ZQdG8U" },
];

export default function HomePage() {
  return (
    <main className="bg-background text-on-background font-body-md antialiased transition-colors duration-300">
      <header className="bg-surface/80 backdrop-blur-md border-outline-variant w-full sticky top-0 z-50 transition-shadow hover:shadow-sm">
        <div className="flex justify-between items-center w-full px-margin-desktop py-0 max-w-container-max mx-auto md:px-margin-desktop px-margin-mobile">
          <div className="flex items-center">
            <Link href="#" aria-label="Rongtuli home">
              <img
                alt="Rongtuli Logo"
                className="h-[70px] w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGkXqF25_oaRZgM5Ln3ThRd3DNCm1osJ4jOuWGOM2swbqFZDzAxRuIhLH8oKKzJdryUGwQI2R9-IOyq1iS8eaDcJiallkRc8LxhcFr4ULkLV1vrY_UKJPkCAAhd7f5DGOi9PVPwi00RvVKq1bauzxzkdjM9wFrK568UBryLeoDzh07AIkmXTd3tMd6da1JtfNMQHNYl-9I_BQU1X1v_PkITqdG4uLw9V3tp9D2dbAmxNdAbRLT6NUf4ajOrezWXLb2Hw"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6 py-4">
            <Link href="#" className="bg-primary text-white px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider hover:bg-primary-container hover:scale-105 transition-all shadow-sm hover:shadow uppercase">
              Free
            </Link>
            <Link href="#" className="hover:text-primary transition-colors hidden md:block font-medium">
              My account
            </Link>
            <Link href="#" className="hover:text-primary transition-colors hidden md:block font-medium">
              Checkout
            </Link>
            <Link href="#" className="hover:text-primary transition-colors flex items-center relative group">
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">shopping_cart</span>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">2</span>
            </Link>
            <button className="md:hidden p-2 text-on-surface-variant" type="button" aria-label="Open menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at top right, #d3151a 0%, transparent 40%), radial-gradient(circle at bottom left, #005C3D 0%, transparent 40%)" }} />
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <div className="mb-6 flex justify-center animate-fade-in-up">
              <img
                alt="Rongtuli Logo"
                className="h-40 md:h-56 w-auto object-contain hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDY2LCYFQlcaktjEme46O6syLn0rrr3niLJdB1zFKnGYSe4rMWz7AO5WC3NMtXAmtbzZT_rxnmpLSmdP0lPNm6wz-KC88tHqLW7ypjgRAmSKfAp1Coch-BtPg2unsG-xTka6JCrv3yPhXAzLelQO9IW0PtcfblL2b736zF3Tgg8BAONEpj9vMDOZX1PzGuu1o5XA-vydmf82szAY3eld6i_eph2zr1ExF6ur4bf20axZsa_t6qkBnhr6WSZ6jnTml7A"
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto animate-fade-in-up-delay-1">
              <div className="flex items-center bg-surface-container-lowest w-full md:w-[600px] rounded-full px-6 py-4 border border-outline-variant focus-within:border-primary shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-body-lg w-full text-on-surface placeholder:text-on-surface-variant outline-none" placeholder="Discover UI kits, fonts, templates..." type="text" />
                <button className="bg-primary text-on-primary px-8 py-2.5 rounded-full text-label-md font-label-md hover:bg-primary-container transition-all hover:shadow-md ml-2" type="button">
                  Search
                </button>
              </div>
            </div>

            <ul className="flex flex-wrap justify-center items-center space-x-8 pt-6 font-label-md w-full animate-fade-in-up-delay-1">
              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105">
                  Print Templates
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left transition-all group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Calendars</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Banners &amp; Flyers</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Posters</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Business Cards</Link>
                </div>
              </li>

              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105 font-bengali tracking-wide">
                  MAHFIL
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Main Stage Banners</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Street &amp; Wall Posters</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Social Media &amp; YouTube</Link>
                </div>
              </li>

              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105">
                  Madrasah &amp; School
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Admission &amp; Registration</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">ID Cards &amp; Lanyards</Link>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-surface border-y border-outline-variant overflow-hidden animate-fade-in-up-delay-2">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8">
            <h2 className="text-headline-lg font-headline-lg text-[#0F172A]">Most Sold Products</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">Trending assets across top categories.</p>
          </div>

          <div className="mb-12">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">web</span>
              <h3 className="text-headline-md font-headline-md text-[#0F172A]">UI Kits &amp; Templates</h3>
            </div>
            <div className="scroll-track-container">
              <div className="scroll-track">
                {[...uiKitCards, ...uiKitCards].map((card, index) => (
                  <Link key={`${card.id}-${index}`} href={`/product/${card.id}`} className="group block w-[300px] flex-shrink-0 relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-sm">
                    <img alt={card.title} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105" src={card.image} />
                    <div className="p-4">
                      <h4 className="font-headline-md text-[18px] text-[#0F172A] truncate">{card.title}</h4>
                      <p className="text-body-sm text-primary font-bold mt-1">{card.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">brush</span>
              <h3 className="text-headline-md font-headline-md text-[#0F172A]">Vectors &amp; Illustrations</h3>
            </div>
            <div className="scroll-track-container">
              <div className="scroll-track reverse">
                {[...vectorCards, ...vectorCards].map((card, index) => (
                  <Link key={`${card.id}-${index}`} href={`/product/${card.id}`} className="group block w-[300px] flex-shrink-0 relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-sm">
                    <img alt={card.title} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105" src={card.image} />
                    <div className="p-4">
                      <h4 className="font-headline-md text-[18px] text-[#0F172A] truncate">{card.title}</h4>
                      <p className="text-body-sm text-primary font-bold mt-1">{card.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest rounded-[2rem] shadow-sm my-12 animate-fade-in-up-delay-2">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-[#0F172A] mb-3">Featured Design Assets</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">Fresh drops from top creators, curated daily.</p>
            </div>
            <Link href="#" className="text-secondary font-label-md text-label-md hover:text-tertiary-container flex items-center gap-1 transition-colors font-bold tracking-wide">
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-0">
            {featuredCards.map((card) => (
              <Link key={card.id} href={`/product/${card.id}`} className="group relative flex flex-col gap-4 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(27,107,75,0.12)] cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl transition-all duration-500 border border-surface-variant">
                  <img className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.03]" src={card.image} alt={card.title} />
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full text-label-sm font-label-md text-on-surface flex items-center gap-1.5 shadow-sm border border-white/20">
                    <span className="material-symbols-outlined text-[14px]">print</span>
                    Print Available
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-headline-md font-headline-md text-[#0F172A] text-[20px]">{card.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-body-sm font-body-sm text-on-surface-variant">Starts from</span>
                    <span className="text-body-lg font-headline-md text-primary font-bold">{card.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </main>
  );
}
