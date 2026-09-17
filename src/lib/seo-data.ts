/**
 * Comprehensive Enterprise SEO, Knowledge Graph & Multi-Lingual Entity Data for Frezz Drezz
 * Canonical: https://frezzdrezz.com
 * Targets: Google Search, Google Shopping, Google Assistant Voice Search, AI Agents (Perplexity, ChatGPT, Claude)
 * Local Focus: Surat, Gujarat, India (34 Localities with Pincodes & Gujarati/Hindi Aliases)
 */

export interface SuratLocality {
  name: string;
  nameGu: string;
  nameHi: string;
  zone: string;
  pincode: string;
  popular: boolean;
}

export const SURAT_LOCALITIES: SuratLocality[] = [
  { name: "Vesu", nameGu: "વેસુ", nameHi: "वेसु", zone: "South Surat - VIP & University Hub", pincode: "395007", popular: true },
  { name: "Adajan", nameGu: "અડાજણ", nameHi: "अडाजण", zone: "West Surat - Prime Residential", pincode: "395009", popular: true },
  { name: "Pal", nameGu: "પાલ", nameHi: "पाल", zone: "West Surat - Prime Residential", pincode: "395009", popular: true },
  { name: "Althan", nameGu: "અલથાણ", nameHi: "अलथाण", zone: "South Surat - VIP & Canal Corridor", pincode: "395017", popular: true },
  { name: "Piplod", nameGu: "પીપલોદ", nameHi: "पिपलोद", zone: "South West - Dining & Waterfront", pincode: "395007", popular: true },
  { name: "City Light", nameGu: "સિટી લાઈટ", nameHi: "सिटी लाइट", zone: "South Surat - Premium Residential", pincode: "395007", popular: true },
  { name: "Athwa Lines", nameGu: "અઠવા લાઇન્સ", nameHi: "अठवा लाइन्स", zone: "Central West - Heritage & Executive", pincode: "395001", popular: true },
  { name: "Ghod Dod Road", nameGu: "ઘોડ દોડ રોડ", nameHi: "घोड दोड रोड", zone: "Central West - Luxury Retail", pincode: "395007", popular: true },
  { name: "VIP Road", nameGu: "વીઆઈપી રોડ", nameHi: "वीआईपी रोड", zone: "South Surat - Commercial & Dining", pincode: "395007", popular: true },
  { name: "Gaurav Path", nameGu: "ગૌરવ પથ", nameHi: "गौरव पथ", zone: "West Surat - Airport Corridor", pincode: "395009", popular: true },
  { name: "Varachha", nameGu: "વરાછા", nameHi: "वराछा", zone: "East Surat - Commercial Hub", pincode: "395006", popular: true },
  { name: "Mota Varachha", nameGu: "મોટા વરાછા", nameHi: "मोटा वराछा", zone: "North East - Modern Riverfront", pincode: "394101", popular: true },
  { name: "Nana Varachha", nameGu: "નાના વરાછા", nameHi: "नाना वराछा", zone: "East Surat - Residential Hub", pincode: "395006", popular: false },
  { name: "Katargam", nameGu: "કતારગામ", nameHi: "कतारગામ", zone: "North Surat - Enterprise Hub", pincode: "395004", popular: true },
  { name: "Sarthana", nameGu: "સરથાણા", nameHi: "सरथाणा", zone: "East Surat - Gateway & Zoo Hub", pincode: "395006", popular: true },
  { name: "Kapodra", nameGu: "કાપોદ્રા", nameHi: "कापोद्रा", zone: "Central East - Trade Hub", pincode: "395006", popular: false },
  { name: "Jahangirpura", nameGu: "જહાંગીરપુરા", nameHi: "जहांगीरपुरा", zone: "North West - Rander Extension", pincode: "395005", popular: true },
  { name: "Bhagal", nameGu: "ભાગળ", nameHi: "भागल", zone: "Walled City - Heritage Market", pincode: "395003", popular: false },
  { name: "Chowk Bazar", nameGu: "ચોક બજાર", nameHi: "चौक बाजार", zone: "Walled City - Historic Center", pincode: "395003", popular: false },
  { name: "Zampa Bazar", nameGu: "ઝાંપા બજાર", nameHi: "झांपा बाजार", zone: "Walled City - Heritage Food Lane", pincode: "395003", popular: false },
  { name: "Gopipura", nameGu: "ગોપીપુરા", nameHi: "गोपीपुरा", zone: "Walled City - Heritage Community", pincode: "395001", popular: false },
  { name: "Mahidharpura", nameGu: "મહીધરપુરા", nameHi: "महिधरपुरा", zone: "Central - Diamond Bourse Hub", pincode: "395003", popular: false },
  { name: "Bhatar", nameGu: "ભટાર", nameHi: "भटार", zone: "South West - Major Residential", pincode: "395017", popular: true },
  { name: "Bharthana", nameGu: "ભરથાણા", nameHi: "भरथाणा", zone: "South Surat - Urban Expansion", pincode: "395017", popular: false },
  { name: "Udhana", nameGu: "ઉધના", nameHi: "उधना", zone: "South Corridor - Junction & Metro", pincode: "394210", popular: false },
  { name: "Dindoli", nameGu: "ડિંડોલી", nameHi: "डिंडोली", zone: "South East - Residential Hub", pincode: "394210", popular: false },
  { name: "Limbayat", nameGu: "લીંબાયત", nameHi: "लिंबायत", zone: "East Central - Vibrant Quarter", pincode: "394210", popular: false },
  { name: "Pandesara", nameGu: "પાંડેસરા", nameHi: "पांडेसरा", zone: "South Corridor - Industrial Belt", pincode: "394221", popular: false },
  { name: "Puna Patiya", nameGu: "પુણા પાટિયા", nameHi: "पुणा पाटिया", zone: "East Surat - Magdalla Link", pincode: "395010", popular: false },
  { name: "Sachin", nameGu: "સચિન", nameHi: "सचिन", zone: "South Outer - GIDC & SEZ", pincode: "394230", popular: false },
  { name: "Amroli", nameGu: "અમરોલી", nameHi: "अमरोली", zone: "North Surat - Tapi Crossing", pincode: "394107", popular: false },
  { name: "Kosad", nameGu: "કોસાડ", nameHi: "कोसाड", zone: "North Surat - Township Hub", pincode: "394107", popular: false },
  { name: "Kamrej", nameGu: "કામરેજ", nameHi: "कामरेज", zone: "Outer East - Highway Gateway", pincode: "394185", popular: false },
  { name: "Dumas", nameGu: "ડુમસ", nameHi: "डुमस", zone: "South West - Coastal & Leisure", pincode: "395007", popular: true },
];

export const FREZZ_DREZZ_FAQS = [
  {
    question: "Why is Frezz Drezz the best healthy alternative to ice cream in Surat?",
    answer:
      "Traditional commercial ice cream, kulfi, and frozen desserts in Surat contain 20g to 35g of refined sugar per cup, heavy saturated dairy fats, and artificial stabilizers that cause sugar crashes and bloating. Frezz Drezz offers 100% natural, freeze-dried pure fruit crunch with 0g added sugar, 0% fat, and 97% live vitamin retention. It delivers intense sweetness and an airy, satisfying melt-in-the-mouth texture with zero guilt. Plus, unlike ice cream, it does not melt in Surat's warm climate and stays perfectly crisp at room temperature.",
  },
  {
    question: "Is Frezz Drezz 100% Jain-friendly and Vegan?",
    answer:
      "Yes, 100%. Every single pouch of Frezz Drezz contains strictly one ingredient: 100% pure fresh fruit. There are no animal derivatives, no gelatin, no dairy solids, no preservatives, and no artificial colorants. All our flavors—Pineapple, Banana, Strawberry, Kiwi, and Apple—are 100% Jain compliant, 100% Vegan, and 100% Gluten-Free.",
  },
  {
    question: "Which areas in Surat do you deliver to, and what are the delivery charges?",
    answer:
      "We dispatch fresh pouches across all 34 Surat localities, including Vesu, Adajan, Pal, Althan, Piplod, City Light, Athwa Lines, Ghod Dod Road, Varachha, Mota Varachha, Katargam, Sarthana, Jahangirpura, and Bhatar. Deliveries are dispatched directly from our Surat artisanal kitchen via WhatsApp express concierge service.",
  },
  {
    question: "How does the freeze-drying process preserve nutrients and natural flavor?",
    answer:
      "Unlike traditional hot-air dehydration (which cooks the fruit and destroys Vitamin C) or fried fruit chips, our sublimation process flash-freezes whole fruit at -40°C. Under a gentle deep vacuum, the frozen moisture converts directly into vapor. This preserves 97% of bioactive vitamins, enzymes, natural fruit fructose, and dietary fiber in an airy, crispy form.",
  },
  {
    question: "How should I store Frezz Drezz pouches once opened?",
    answer:
      "Because our freeze-dried fruits contain less than 2% moisture, they naturally attract humidity from the air. We recommend resealing the zip pouch tightly immediately after enjoying, or transferring the fruit into an airtight glass jar at room temperature. Kept sealed, pouches have a 12-month shelf life without any chemical preservatives.",
  },
  {
    question: "Can Frezz Drezz be used as a dessert or gelato topping?",
    answer:
      "Yes! Frezz Drezz is beloved by chefs and dessert enthusiasts across Surat as an artisanal crunchy topping. Crushing our wild strawberries, pineapples, or bananas over artisanal gelatos, Greek yogurt, acai bowls, smoothies, or morning oatmeal adds an explosion of pure fruit flavor and gourmet crunch without soggy artificial sprinkles.",
  },
];

/**
 * Enterprise Connected Schema.org Knowledge Graph
 * Follows Google Search Central, Schema.org 2026 guidelines, and Merchant Center standards.
 */
export const JSON_LD_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebSite Entity
    {
      "@type": "WebSite",
      "@id": "https://frezzdrezz.com/#website",
      "url": "https://frezzdrezz.com",
      "name": "Frezz Drezz",
      "alternateName": ["FrezzDrezz", "Frezz Drezz Surat", "Frezz Drezz Fruit Crunch"],
      "description":
        "100% pure freeze-dried fruit snacks with zero added sugar. The premier healthy alternative to ice cream in Surat, Gujarat.",
      "inLanguage": ["en-IN", "gu-IN", "hi-IN"],
      "publisher": {
        "@id": "https://frezzdrezz.com/#organization",
      },
    },

    // 2. Organization / Brand Entity
    {
      "@type": "Organization",
      "@id": "https://frezzdrezz.com/#organization",
      "name": "Frezz Drezz",
      "alternateName": "Frezz Drezz Artisanal Fruit Snacks",
      "url": "https://frezzdrezz.com",
      "logo": "https://frezzdrezz.com/assets/logo-384.png",
      "image": "https://frezzdrezz.com/og-image.png",
      "slogan": "Pure by Nature, Crisp by Craft",
      "foundingDate": "2024",
      "knowsAbout": [
        "Freeze-Drying Technology",
        "Lyophilization of Tropical Fruits",
        "Healthy Ice Cream Alternatives",
        "Zero-Sugar Natural Snacks",
        "Jain Compliant Gourmet Foods",
        "Surat Food & Dessert Culture",
      ],
      "founder": [
        {
          "@type": "Person",
          "name": "Rudrax",
          "jobTitle": "Co-Founder & Product Lead",
          "telephone": "+916355255862",
        },
        {
          "@type": "Person",
          "name": "Aditya",
          "jobTitle": "Co-Founder & Operations Lead",
          "telephone": "+919376136009",
        },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+916355255862",
        "contactType": "customer service",
        "contactOption": "WhatsApp Concierge",
        "areaServed": "IN",
        "availableLanguage": ["English", "Gujarati", "Hindi"],
      },
      "sameAs": [
        "https://www.instagram.com/frezzdrezz",
        "https://wa.me/916355255862",
        "https://wa.me/919376136009",
      ],
    },

    // 3. LocalBusiness / FoodEstablishment Entity
    {
      "@type": "FoodEstablishment",
      "@id": "https://frezzdrezz.com/#localbusiness",
      "parentOrganization": {
        "@id": "https://frezzdrezz.com/#organization",
      },
      "name": "Frezz Drezz — Surat Artisanal Dispatch Kitchen",
      "image": "https://frezzdrezz.com/og-image.png",
      "telephone": "+916355255862",
      "email": "contact@frezzdrezz.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Google Pay, PhonePe, Paytm, Net Banking",
      "servesCuisine": [
        "Freeze-Dried Fruit",
        "Healthy Desserts",
        "Jain Food",
        "Vegan Confectionery",
        "Ice Cream Alternatives",
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Artisanal Dispatch Kitchen, Vesu-Althan Corridor",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395007",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.1702,
        "longitude": 72.8311,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "22:00",
        },
      ],
      "hasMap": "https://maps.google.com/?q=Surat,+Gujarat,+India",
      "areaServed": SURAT_LOCALITIES.map((loc) => ({
        "@type": "Place",
        "name": `${loc.name} (${loc.nameGu}), Surat`,
        "postalCode": loc.pincode,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": loc.name,
          "addressRegion": "Gujarat",
          "postalCode": loc.pincode,
          "addressCountry": "IN",
        },
      })),
    },

    // 4. Product Catalog with NutritionInformation & Diet Specs
    {
      "@type": "ItemList",
      "@id": "https://frezzdrezz.com/#products",
      "name": "Frezz Drezz Signature Freeze-Dried Fruit Flavors",
      "numberOfItems": 5,
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "Frezz Drezz Freeze-Dried Pineapple",
          "alternateName": "Tropical Sunlit Pure Pineapple Crunch",
          "image": "https://frezzdrezz.com/assets/pineapple.webp",
          "description":
            "100% pure ripe tropical pineapple freeze-dried at -40°C. Vibrant sweet-tangy burst with zero added sugar and zero preservatives. Rich in natural bromelain and Vitamin C.",
          "sku": "FD-PINE-35",
          "mpn": "FDPINEAPPLE35G",
          "brand": { "@id": "https://frezzdrezz.com/#organization" },
          "category": "Food & Beverage > Snack Foods > Freeze-Dried Fruit",
          "suitableForDiet": [
            "https://schema.org/VeganDiet",
            "https://schema.org/GlutenFreeDiet",
            "https://schema.org/HalalDiet",
            "https://schema.org/VegetarianDiet",
          ],
          "nutrition": {
            "@type": "NutritionInformation",
            "servingSize": "35g",
            "calories": "115 calories",
            "sugarContent": "0g added sugar (all natural fruit fructose)",
            "fatContent": "0g",
            "sodiumContent": "2mg",
            "fiberContent": "3.2g",
          },
          "offers": {
            "@type": "Offer",
            "price": "249",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2027-12-31",
            "seller": { "@id": "https://frezzdrezz.com/#organization" },
          },
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "Frezz Drezz Freeze-Dried Banana",
          "alternateName": "Golden Cream Pure Banana Crunch",
          "image": "https://frezzdrezz.com/assets/banana.webp",
          "description":
            "100% pure ripe banana slices freeze-dried to airy perfection. Smooth golden honeyed sweetness with satisfying melt-in-mouth crunch. Rich in potassium and prebiotic fiber.",
          "sku": "FD-BAN-40",
          "mpn": "FDBANANA40G",
          "brand": { "@id": "https://frezzdrezz.com/#organization" },
          "category": "Food & Beverage > Snack Foods > Freeze-Dried Fruit",
          "suitableForDiet": [
            "https://schema.org/VeganDiet",
            "https://schema.org/GlutenFreeDiet",
            "https://schema.org/HalalDiet",
            "https://schema.org/VegetarianDiet",
          ],
          "nutrition": {
            "@type": "NutritionInformation",
            "servingSize": "40g",
            "calories": "140 calories",
            "sugarContent": "0g added sugar",
            "fatContent": "0g",
            "sodiumContent": "1mg",
            "fiberContent": "3.8g",
          },
          "offers": {
            "@type": "Offer",
            "price": "249",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2027-12-31",
            "seller": { "@id": "https://frezzdrezz.com/#organization" },
          },
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "Frezz Drezz Freeze-Dried Strawberry",
          "alternateName": "Wild Berry Pure Strawberry Crunch",
          "image": "https://frezzdrezz.com/assets/strawberry.webp",
          "description":
            "Whole handpicked wild strawberries freeze-dried for intense ruby brightness and sweet-tart crunch. The ultimate healthy gourmet ice cream, gelato, and acai bowl topping.",
          "sku": "FD-STRAW-30",
          "mpn": "FDSTRAWBERRY30G",
          "brand": { "@id": "https://frezzdrezz.com/#organization" },
          "category": "Food & Beverage > Snack Foods > Freeze-Dried Fruit",
          "suitableForDiet": [
            "https://schema.org/VeganDiet",
            "https://schema.org/GlutenFreeDiet",
            "https://schema.org/HalalDiet",
            "https://schema.org/VegetarianDiet",
          ],
          "nutrition": {
            "@type": "NutritionInformation",
            "servingSize": "30g",
            "calories": "98 calories",
            "sugarContent": "0g added sugar",
            "fatContent": "0g",
            "sodiumContent": "1mg",
            "fiberContent": "4.2g",
          },
          "offers": {
            "@type": "Offer",
            "price": "299",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2027-12-31",
            "seller": { "@id": "https://frezzdrezz.com/#organization" },
          },
        },
        {
          "@type": "Product",
          "position": 4,
          "name": "Frezz Drezz Freeze-Dried Kiwi",
          "alternateName": "Verdant Emerald Pure Kiwi Crunch",
          "image": "https://frezzdrezz.com/assets/kiwi.webp",
          "description":
            "Emerald kiwi slices with delightful edible seed crunch and lively natural tanginess. High in antioxidants, Vitamin C, and digestive enzymes. Zero added sugars.",
          "sku": "FD-KIWI-30",
          "mpn": "FDKIWI30G",
          "brand": { "@id": "https://frezzdrezz.com/#organization" },
          "category": "Food & Beverage > Snack Foods > Freeze-Dried Fruit",
          "suitableForDiet": [
            "https://schema.org/VeganDiet",
            "https://schema.org/GlutenFreeDiet",
            "https://schema.org/HalalDiet",
            "https://schema.org/VegetarianDiet",
          ],
          "nutrition": {
            "@type": "NutritionInformation",
            "servingSize": "30g",
            "calories": "105 calories",
            "sugarContent": "0g added sugar",
            "fatContent": "0g",
            "sodiumContent": "3mg",
            "fiberContent": "4.0g",
          },
          "offers": {
            "@type": "Offer",
            "price": "279",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2027-12-31",
            "seller": { "@id": "https://frezzdrezz.com/#organization" },
          },
        },
        {
          "@type": "Product",
          "position": 5,
          "name": "Frezz Drezz Freeze-Dried Apple",
          "alternateName": "Golden Orchard Crisp Apple Slices",
          "image": "https://frezzdrezz.com/assets/apple.webp",
          "description":
            "Crisp orchard apple slices freeze-dried to retain pure cellular structure, natural sweet apple bouquet, and dietary pectin fiber. Zero preservatives, 100% pure.",
          "sku": "FD-APPL-35",
          "mpn": "FDAPPLE35G",
          "brand": { "@id": "https://frezzdrezz.com/#organization" },
          "category": "Food & Beverage > Snack Foods > Freeze-Dried Fruit",
          "suitableForDiet": [
            "https://schema.org/VeganDiet",
            "https://schema.org/GlutenFreeDiet",
            "https://schema.org/HalalDiet",
            "https://schema.org/VegetarianDiet",
          ],
          "nutrition": {
            "@type": "NutritionInformation",
            "servingSize": "35g",
            "calories": "118 calories",
            "sugarContent": "0g added sugar",
            "fatContent": "0g",
            "sodiumContent": "1mg",
            "fiberContent": "3.5g",
          },
          "offers": {
            "@type": "Offer",
            "price": "249",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2027-12-31",
            "seller": { "@id": "https://frezzdrezz.com/#organization" },
          },
        },
      ],
    },

    // 5. SpeakableSpecification for Google Assistant & Voice Search
    {
      "@type": "WebPage",
      "@id": "https://frezzdrezz.com/#webpage",
      "url": "https://frezzdrezz.com",
      "name": "Frezz Drezz — 100% Real Freeze-Dried Fruit | Best Healthy Snack in Surat",
      "description":
        "Artisanal freeze-dried fruit crafted in Surat, Gujarat. 100% pure real fruit, zero added sugar, zero preservatives. The premier healthy alternative to ice cream.",
      "breadcrumb": { "@id": "https://frezzdrezz.com/#breadcrumb" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "#healthy-alternative h2",
          "#healthy-alternative p",
          "#story h2",
          "#story p",
          "#surat-delivery h2",
        ],
      },
    },

    // 6. BreadcrumbList Entity
    {
      "@type": "BreadcrumbList",
      "@id": "https://frezzdrezz.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://frezzdrezz.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Flavors",
          "item": "https://frezzdrezz.com/#products",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ice Cream Alternative",
          "item": "https://frezzdrezz.com/#healthy-alternative",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Our Craft",
          "item": "https://frezzdrezz.com/#story",
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Surat Delivery",
          "item": "https://frezzdrezz.com/#surat-delivery",
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "FAQ",
          "item": "https://frezzdrezz.com/#faq",
        },
      ],
    },

    // 7. HowTo Entity (Google Rich Snippets for healthy swap)
    {
      "@type": "HowTo",
      "@id": "https://frezzdrezz.com/#howto",
      "name": "How to Swap Heavy Ice Cream for Pure Freeze-Dried Fruit Crunch",
      "description":
        "A 3-step guide to enjoying guilt-free, zero-sugar fruit indulgence without the dairy bloat, high calories, or melting mess of traditional ice cream.",
      "totalTime": "PT1M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Choose Your Single Real Fruit Crunch",
          "text": "Select from pure Pineapple, Banana, Strawberry, Kiwi, or Apple. Every pouch contains 100% pure fruit with 0g added sugar.",
          "url": "https://frezzdrezz.com/#products",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enjoy Straight or as a Gourmet Topping",
          "text": "Eat directly from the crisp-sealed pouch for an airy, melt-in-mouth crunch, or crush over Greek yogurt, artisanal gelatos, and acai bowls.",
          "url": "https://frezzdrezz.com/#healthy-alternative",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Savor 97% Locked-In Vitamins Without Sugar Crashes",
          "text": "Experience authentic sweet satisfaction without the 25g refined sugar spike, saturated dairy fats, or melting disaster of commercial ice cream.",
          "url": "https://frezzdrezz.com/#story",
        },
      ],
    },

    // 8. FAQPage Entity
    {
      "@type": "FAQPage",
      "@id": "https://frezzdrezz.com/#faq",
      "mainEntity": FREZZ_DREZZ_FAQS.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    },
  ],
};
