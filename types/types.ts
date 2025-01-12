export interface Photo {
  src: string;
}

export interface Category {
  id: string;
  name: string;
  photos: Photo[];
}

export interface galleryCategory {
  id: string;
  name: string;
  slug: string;
}

export interface galleryPhoto {
  id: string;
  title: string;
  date: string;
  src: string;
  category: string;
  slug: string;
  description?: string;
}

export const categories: Category[] = [
  // ... (keep the existing categories data here)
  {
    id: "highlights",
    name: "Highlights",
    photos: [
      { src: "/denis-prossy/highlights/N77A8605.jpg" },
      { src: "/denis-prossy/highlights/N77A8619.jpg" },
      { src: "/denis-prossy/highlights/N77A8623.jpg" },
      { src: "/denis-prossy/highlights/N77A8645.jpg" },
      { src: "/denis-prossy/highlights/N77A8646.jpg" },
      { src: "/denis-prossy/highlights/N77A9197.jpg" },
      { src: "/denis-prossy/highlights/N77A9204.jpg" },
      { src: "/denis-prossy/highlights/N77A8604.jpg" },
      { src: "/denis-prossy/highlights/N77A8669.jpg" },
      { src: "/denis-prossy/highlights/N77A9641.jpg" },
      { src: "/denis-prossy/highlights/N77A9096.jpg" },
      { src: "/denis-prossy/highlights/N77A9181.jpg" },
      { src: "/denis-prossy/highlights/N77A9186.jpg" },
      { src: "/denis-prossy/highlights/N77A9398.jpg" },
      { src: "/denis-prossy/highlights/N77A9399.jpg" },
      { src: "/denis-prossy/highlights/N77A9428.jpg" },
      { src: "/denis-prossy/highlights/N77A9435w.jpg" },
      { src: "/denis-prossy/highlights/N77A9429w.jpg" },
      { src: "/denis-prossy/function/N77A9252.jpg" },
      { src: "/denis-prossy/highlights/N77A9254.jpg" },
      { src: "/denis-prossy/highlights/N77A9274.jpg" },
      { src: "/denis-prossy/highlights/N77A9272.jpg" },
      { src: "/denis-prossy/highlights/N77A9252.jpg" },
      { src: "/denis-prossy/highlights/N77A8681.jpg" },
      { src: "/denis-prossy/highlights/N77A8656.jpg" },
      { src: "/denis-prossy/highlights/N77A8657.jpg" },
      { src: "/denis-prossy/highlights/N77A8602.jpg" },
      { src: "/denis-prossy/highlights/N77A8698.jpg" },
    ],
  },

  {
    id: "church",
    name: "Church",
    photos: [
      { src: "/denis-prossy/church/N77A8538.jpg" },
      { src: "/denis-prossy/church/N77A8558.jpg" },
      { src: "/denis-prossy/church/N77A8558.jpg" },
      { src: "/denis-prossy/church/N77A8570.jpg" },
      // { src: "/denis-prossy/church/N77A8574.jpg" },
      { src: "/denis-prossy/church/N77A8582.jpg" },
      { src: "/denis-prossy/church/N77A8594.jpg" },
      { src: "/denis-prossy/church/N77A8547.jpg" },
      { src: "/denis-prossy/church/N77A8555.jpg" },
    ],
  },
  {
    id: "decor",
    name: "Décor",
    photos: [
      { src: "/denis-prossy/decor/N77A8500.jpg" },
      { src: "/denis-prossy/decor/N77A8509.jpg" },
      { src: "/denis-prossy/decor/N77A8505w.jpg" },
      { src: "/denis-prossy/decor/N77A8509.jpg" },
      { src: "/denis-prossy/decor/N77A8492w.jpg" },
      { src: "/denis-prossy/decor/N77A8529.jpg" },
      { src: "/denis-prossy/decor/N77A8491.jpg" },
      { src: "/denis-prossy/decor/N77A8497.jpg" },
      { src: "/denis-prossy/decor/N77A8507w.jpg" },
      { src: "/denis-prossy/decor/N77A8499w.jpg" },
      { src: "/denis-prossy/decor/N77A8491.jpg" },
      { src: "/denis-prossy/decor/N77A8496w.jpg" },
      { src: "/denis-prossy/decor/N77A8497.jpg" },
      { src: "/denis-prossy/decor/N77A8522w.jpg" },
      { src: "/denis-prossy/decor/N77A8499.jpg" },
    ],
  },
  {
    id: "men",
    name: "Men",
    photos: [
      { src: "/denis-prossy/men/0K4A7692w.jpg" },
      { src: "/denis-prossy/men/0K4A7694w.jpg" },
      { src: "/denis-prossy/men/0K4A7702w.jpg" },
      { src: "/denis-prossy/men/0K4A7704w.jpg" },
      { src: "/denis-prossy/men/0K4A7694w.jpg" },
      { src: "/denis-prossy/men/0K4A7721w.jpg" },
      { src: "/denis-prossy/men/0K4A7706w.jpg" },
      { src: "/denis-prossy/men/0K4A7686w.jpg" },
      { src: "/denis-prossy/men/0K4A7688w.jpg" },
      { src: "/denis-prossy/men/0K4A7677w.jpg" },
      { src: "/denis-prossy/men/0K4A7663w.jpg" },
      { src: "/denis-prossy/men/0K4A7650w.jpg" },
      { src: "/denis-prossy/men/0K4A7648w.jpg" },
      { src: "/denis-prossy/men/0K4A7643w.jpg" },
      { src: "/denis-prossy/men/0K4A7641w.jpg" },
    ],
  },
  {
    id: "gifts",
    name: "Gifts",
    photos: [
      { src: "/denis-prossy/gifts/0K4A7556w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7558w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7616w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7607w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7603w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7590w.jpg" },

      { src: "/denis-prossy/gifts/0K4A7458w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7570w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7568w.jpg" },
      // { src: "/denis-prossy/gifts/0K4A7486w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7562w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7560w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7578w.jpg" },

      { src: "/denis-prossy/gifts/0K4A7544w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7541w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7632w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7622w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7615w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7599w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7587w.jpg" },

      { src: "/denis-prossy/gifts/0K4A7441w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7449w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7536w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7463w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7573w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7477w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7479w.jpg" },

      { src: "/denis-prossy/gifts/0K4A7485w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7492w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7499w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7503w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7550w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7505w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7511w.jpg" },

      { src: "/denis-prossy/gifts/0K4A7514w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7519w.jpg" },
      { src: "/denis-prossy/gifts/0K4A7530w.jpg" },
    ],
  },
  {
    id: "greetings",
    name: "Greetings",
    photos: [
      { src: "/denis-prossy/greetings/N77A8743.jpg" },
      { src: "/denis-prossy/greetings/N77A8749.jpg" },
      { src: "/denis-prossy/greetings/N77A8771.jpg" },
      { src: "/denis-prossy/greetings/N77A8803.jpg" },
      { src: "/denis-prossy/greetings/N77A8864.jpg" },
      { src: "/denis-prossy/greetings/N77A9450.jpg" },
      { src: "/denis-prossy/greetings/N77A9011.jpg" },
      { src: "/denis-prossy/greetings/N77A9025.jpg" },
      { src: "/denis-prossy/greetings/N77A9024.jpg" },
      { src: "/denis-prossy/greetings/N77A9445.jpg" },
      { src: "/denis-prossy/greetings/N77A9018.jpg" },
      { src: "/denis-prossy/greetings/N77A9007.jpg" },

      { src: "/denis-prossy/greetings/N77A8858.jpg" },
      { src: "/denis-prossy/greetings/N77A8861.jpg" },
      { src: "/denis-prossy/greetings/N77A8799.jpg" },
      { src: "/denis-prossy/greetings/N77A8784.jpg" },
      { src: "/denis-prossy/greetings/N77A8802.jpg" },
      { src: "/denis-prossy/greetings/N77A8808.jpg" },
      { src: "/denis-prossy/greetings/N77A8813.jpg" },
      { src: "/denis-prossy/greetings/N77A8817.jpg" },
      { src: "/denis-prossy/greetings/N77A8826.jpg" },
      { src: "/denis-prossy/greetings/N77A8874.jpg" },
      { src: "/denis-prossy/greetings/N77A8879.jpg" },
      { src: "/denis-prossy/greetings/N77A8895.jpg" },
      { src: "/denis-prossy/greetings/N77A8903.jpg" },
      { src: "/denis-prossy/greetings/N77A8886.jpg" },
      { src: "/denis-prossy/greetings/N77A8943.jpg" },
      { src: "/denis-prossy/greetings/N77A8951.jpg" },
      { src: "/denis-prossy/greetings/N77A8932.jpg" },
      { src: "/denis-prossy/greetings/N77A8919.jpg" },
      { src: "/denis-prossy/greetings/N77A8969.jpg" },
    ],
  },
  {
    id: "function",
    name: "Function",
    photos: [
      { src: "/denis-prossy/function/N77A9074.jpg" },
      { src: "/denis-prossy/function/N77A9075.jpg" },
      { src: "/denis-prossy/function/N77A9077.jpg" },
      { src: "/denis-prossy/function/N77A9080.jpg" },
      { src: "/denis-prossy/function/N77A9100.jpg" },
      { src: "/denis-prossy/function/N77A9106.jpg" },
      { src: "/denis-prossy/function/N77A9107.jpg" },
      { src: "/denis-prossy/function/N77A9121.jpg" },
      { src: "/denis-prossy/function/N77A9135.jpg" },
      { src: "/denis-prossy/function/N77A9160.jpg" },

      { src: "/denis-prossy/function/N77A9263.jpg" },
      { src: "/denis-prossy/function/N77A9131.jpg" },
      { src: "/denis-prossy/function/N77A9131.jpg" },
      { src: "/denis-prossy/function/N77A9115.jpg" },
      { src: "/denis-prossy/function/N77A9118.jpg" },
      { src: "/denis-prossy/function/N77A9103.jpg" },
      { src: "/denis-prossy/function/N77A9090.jpg" },

      { src: "/denis-prossy/function/N77A9042.jpg" },
      { src: "/denis-prossy/function/N77A9246.jpg" },
      { src: "/denis-prossy/function/N77A9058.jpg" },

      { src: "/denis-prossy/function/N77A9040.jpg" },
      { src: "/denis-prossy/function/N77A9050.jpg" },
      { src: "/denis-prossy/function/N77A9265.jpg" },
      { src: "/denis-prossy/function/N77A9041.jpg" },
      { src: "/denis-prossy/function/N77A8971.jpg" },
      { src: "/denis-prossy/function/N77A8973.jpg" },
      { src: "/denis-prossy/function/N77A8982.jpg" },
      { src: "/denis-prossy/function/N77A9000.jpg" },
      { src: "/denis-prossy/function/N77A9053.jpg" },
      { src: "/denis-prossy/function/N77A9056.jpg" },
      { src: "/denis-prossy/function/N77A9292.jpg" },
      { src: "/denis-prossy/function/N77A9340.jpg" },
      { src: "/denis-prossy/function/N77A9360.jpg" },
      { src: "/denis-prossy/function/N77A9366.jpg" },
      { src: "/denis-prossy/function/N77A9380.jpg" },
      { src: "/denis-prossy/function/N77A9407.jpg" },
      { src: "/denis-prossy/function/N77A9456.jpg" },
      { src: "/denis-prossy/function/N77A9458.jpg" },
      // { src: "/denis-prossy/function/N77A9464.jpg" },
      { src: "/denis-prossy/function/N77A9480.jpg" },
      { src: "/denis-prossy/function/N77A9483.jpg" },
      { src: "/denis-prossy/function/N77A9453.jpg" },
      // { src: "/denis-prossy/function/N77A9428.jpg" },
      { src: "/denis-prossy/function/N77A9472.jpg" },
      { src: "/denis-prossy/function/N77A9486.jpg" },
      { src: "/denis-prossy/function/N77A9511.jpg" },
      { src: "/denis-prossy/function/N77A9542.jpg" },
      { src: "/denis-prossy/function/N77A9545.jpg" },
      { src: "/denis-prossy/function/N77A9569.jpg" },
      { src: "/denis-prossy/function/N77A9552.jpg" },
      { src: "/denis-prossy/function/N77A9558.jpg" },
      { src: "/denis-prossy/function/N77A9563.jpg" },
      { src: "/denis-prossy/function/N77A9582.jpg" },
      { src: "/denis-prossy/function/N77A9505.jpg" },
      { src: "/denis-prossy/function/N77A9518.jpg" },
      { src: "/denis-prossy/function/N77A9526.jpg" },
      { src: "/denis-prossy/function/N77A9529.jpg" },
      { src: "/denis-prossy/function/N77A9558.jpg" },
    ],
  },
];

export const galleryCategories: galleryCategory[] = [
  { id: "all", name: "ALL", slug: "all" },
  { id: "baptism", name: "BAPTISM", slug: "baptism" },
  { id: "birthday", name: "BIRTHDAY", slug: "birthday" },
  { id: "couple", name: "COUPLE", slug: "couple" },
  { id: "events", name: "EVENTS", slug: "events" },
  { id: "family", name: "FAMILY", slug: "family" },
  { id: "give aways", name: "GIVE AWAYS", slug: "give-aways" },
  { id: "kukyala", name: "KUKYALA", slug: "kukyala" },
  { id: "weddings", name: "WEDDINGs", slug: "weddings" },
];

export const photos: galleryPhoto[] = [
  {
    id: "1",
    title: "BABRA'S OKUGAMBA OBUGYENYI",
    date: "JANUARY 4TH, 2025",
    src: "/denis-prossy/highlights/N77A8645.jpg",
    category: "weddings",
    slug: "babras-okugamba-obugyenyi",
    description:
      "A beautiful wedding celebration filled with joy and tradition.",
  },
  {
    id: "2",
    title: "CHRISTMAS GET-TOGETHER",
    date: "DECEMBER 25TH, 2024",
    src: "/denis-prossy/highlights/N77A8605.jpg",
    category: "events",
    slug: "christmas-get-together",
    description: "Family and friends celebrating the holiday season together.",
  },
  {
    id: "3",
    title: "CHRISTINE'S BIRTHDAY",
    date: "DECEMBER 25TH, 2024",
    src: "/denis-prossy/highlights/N77A8619.jpg",
    category: "birthday",
    slug: "christines-birthday",
    description: "A joyous birthday celebration with loved ones.",
  },
  {
    id: "4",
    title: "CHRISTINE'S BIRTHDAY",
    date: "DECEMBER 25TH, 2024",
    src: "/denis-prossy/highlights/N77A8619.jpg",
    category: "birthday",
    slug: "christines-birthday",
    description: "A joyous birthday celebration with loved ones.",
  },
  {
    id: "5",
    title: "CHRISTINE'S BIRTHDAY",
    date: "DECEMBER 25TH, 2024",
    src: "/denis-prossy/highlights/N77A8619.jpg",
    category: "weddings",
    slug: "christines-birthday",
    description: "A joyous birthday celebration with loved ones.",
  },
];

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export type workProps = {
  id: number;
  img: string;
  title: string;
  des: string;
};
export interface EmailTemplateProps {
  firstName: string;
  lastName?: string;
  email: string;
  subject: string;
  message: string;
}
export interface serviceProps {
  title: string;
  icon: React.ComponentType; // For React components, like icons
  description: string;
  image: string; // Path to the image
}
