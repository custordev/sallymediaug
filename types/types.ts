/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoCategory } from "@prisma/client";
export interface ExtendedClient {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  eventDate: Date;
  imageUrl: string | null;
  youtubeUrl: string | null;
  galleryImages: string[];
  categoryId: string;
  category?: Category;
  photos?: Photo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  youtubeUrl: string | undefined;
  categoryId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id(
    id: string,
    arg1: {
      photos: Photo[];
      title: string;
      eventDate: string;
      description: string;
      imageUrl: string;
    }
  ): unknown;
  photos: never[];
  title: string;
  eventDate: string;
  description: string;
  imageUrl: string;
}
export interface Photo {
  id: string;
  src: string;
  category: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  photos: Photo[];
  clients?: ExtendedClient[];
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
  {
    id: "highlights",
    title: "Highlights",
    photos: [
      {
        src: "/denis-prossy/highlights/N77A8605.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8619.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8623.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8645.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8646.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9197.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9204.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8604.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8669.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9641.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9096.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9181.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9186.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9398.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9399.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9428.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9435w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9429w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9252.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9254.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9274.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9272.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A9252.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8681.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8656.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8657.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8602.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/highlights/N77A8698.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    name: "Highlights",
  },

  {
    id: "church",
    name: "Church",
    photos: [
      {
        src: "/denis-prossy/church/N77A8538.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8558.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8558.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8570.jpg",
        id: "",
        category: "",
        url: "",
      },
      // { src: "/denis-prossy/church/N77A8574.jpg" },
      {
        src: "/denis-prossy/church/N77A8582.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8594.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8547.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/church/N77A8555.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
  {
    id: "decor",
    name: "Décor",
    photos: [
      {
        src: "/denis-prossy/decor/N77A8500.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8509.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8505w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8509.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8492w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8529.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8491.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8497.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8507w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8499w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8491.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8496w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8497.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8522w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/decor/N77A8499.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
  {
    id: "men",
    name: "Men",
    photos: [
      {
        src: "/denis-prossy/men/0K4A7692w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7694w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7702w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7704w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7694w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7721w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7706w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7686w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7688w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7677w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7663w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7650w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7648w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7643w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/men/0K4A7641w.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
  {
    id: "gifts",
    name: "Gifts",
    photos: [
      {
        src: "/denis-prossy/gifts/0K4A7556w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7558w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7616w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7607w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7603w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7590w.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/gifts/0K4A7458w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7570w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7568w.jpg",
        id: "",
        category: "",
        url: "",
      },
      // { src: "/denis-prossy/gifts/0K4A7486w.jpg" },
      {
        src: "/denis-prossy/gifts/0K4A7562w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7560w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7578w.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/gifts/0K4A7544w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7541w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7632w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7622w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7615w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7599w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7587w.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/gifts/0K4A7441w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7449w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7536w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7463w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7573w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7477w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7479w.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/gifts/0K4A7485w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7492w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7499w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7503w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7550w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7505w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7511w.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/gifts/0K4A7514w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7519w.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/gifts/0K4A7530w.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
  {
    id: "greetings",
    name: "Greetings",
    photos: [
      {
        src: "/denis-prossy/greetings/N77A8743.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8749.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8771.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8803.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8864.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9450.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9011.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9025.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9024.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9445.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9018.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A9007.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/greetings/N77A8858.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8861.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8799.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8784.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8802.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8808.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8813.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8817.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8826.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8874.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8879.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8895.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8903.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8886.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8943.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8951.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8932.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8919.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/greetings/N77A8969.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
  {
    id: "function",
    name: "Function",
    photos: [
      {
        src: "/denis-prossy/function/N77A9074.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9075.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9077.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9080.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9100.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9106.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9107.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9121.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9135.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9160.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/function/N77A9263.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9131.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9131.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9115.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9118.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9103.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9090.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/function/N77A9042.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9246.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9058.jpg",
        id: "",
        category: "",
        url: "",
      },

      {
        src: "/denis-prossy/function/N77A9040.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9050.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9265.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9041.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A8971.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A8973.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A8982.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9000.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9053.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9056.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9292.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9340.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9360.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9366.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9380.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9407.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9456.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9458.jpg",
        id: "",
        category: "",
        url: "",
      },
      // { src: "/denis-prossy/function/N77A9464.jpg" },
      {
        src: "/denis-prossy/function/N77A9480.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9483.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9453.jpg",
        id: "",
        category: "",
        url: "",
      },
      // { src: "/denis-prossy/function/N77A9428.jpg" },
      {
        src: "/denis-prossy/function/N77A9472.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9486.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9511.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9542.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9545.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9569.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9552.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9558.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9563.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9582.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9505.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9518.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9526.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9529.jpg",
        id: "",
        category: "",
        url: "",
      },
      {
        src: "/denis-prossy/function/N77A9558.jpg",
        id: "",
        category: "",
        url: "",
      },
    ],
    title: "",
  },
];

// export const clientsData: Category[] = [
// {

//   {
//     id: "highlights",
//     name: "Highlights",
//     photos: [
//       {
//         src: "/denis-prossy/highlights/N77A8605.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8619.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8623.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8645.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8646.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9197.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9204.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8604.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8669.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9641.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9096.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9181.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9186.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9398.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9399.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9428.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9435w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9429w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9252.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9254.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9274.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9272.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A9252.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8681.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8656.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8657.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8602.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/highlights/N77A8698.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "church",
//     name: "Church",
//     photos: [
//       {
//         src: "/denis-prossy/church/N77A8538.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8558.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8558.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8570.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       // { src: "/denis-prossy/church/N77A8574.jpg" },
//       {
//         src: "/denis-prossy/church/N77A8582.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8594.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8547.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/church/N77A8555.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "decor",
//     name: "Décor",
//     photos: [
//       {
//         src: "/denis-prossy/decor/N77A8500.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8509.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8505w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8509.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8492w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8529.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8491.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8497.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8507w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8499w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8491.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8496w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8497.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8522w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/decor/N77A8499.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "men",
//     name: "Men",
//     photos: [
//       {
//         src: "/denis-prossy/men/0K4A7692w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7694w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7702w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7704w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7694w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7721w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7706w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7686w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7688w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7677w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7663w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7650w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7648w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7643w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/men/0K4A7641w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "gifts",
//     name: "Gifts",
//     photos: [
//       {
//         src: "/denis-prossy/gifts/0K4A7556w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7558w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7616w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7607w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7603w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7590w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/gifts/0K4A7458w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7570w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7568w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       // { src: "/denis-prossy/gifts/0K4A7486w.jpg" },
//       {
//         src: "/denis-prossy/gifts/0K4A7562w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7560w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7578w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/gifts/0K4A7544w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7541w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7632w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7622w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7615w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7599w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7587w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/gifts/0K4A7441w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7449w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7536w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7463w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7573w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7477w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7479w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/gifts/0K4A7485w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7492w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7499w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7503w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7550w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7505w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7511w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/gifts/0K4A7514w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7519w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/gifts/0K4A7530w.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "greetings",
//     name: "Greetings",
//     photos: [
//       {
//         src: "/denis-prossy/greetings/N77A8743.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8749.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8771.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8803.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8864.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9450.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9011.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9025.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9024.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9445.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9018.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A9007.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/greetings/N77A8858.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8861.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8799.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8784.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8802.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8808.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8813.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8817.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8826.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8874.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8879.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8895.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8903.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8886.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8943.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8951.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8932.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8919.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/greetings/N77A8969.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   },
//   {
//     id: "function",
//     name: "Function",
//     photos: [
//       {
//         src: "/denis-prossy/function/N77A9074.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9075.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9077.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9080.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9100.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9106.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9107.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9121.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9135.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9160.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/function/N77A9263.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9131.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9131.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9115.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9118.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9103.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9090.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/function/N77A9042.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9246.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9058.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },

//       {
//         src: "/denis-prossy/function/N77A9040.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9050.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9265.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9041.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A8971.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A8973.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A8982.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9000.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9053.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9056.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9292.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9340.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9360.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9366.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9380.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9407.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9456.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9458.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       // { src: "/denis-prossy/function/N77A9464.jpg" },
//       {
//         src: "/denis-prossy/function/N77A9480.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9483.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9453.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       // { src: "/denis-prossy/function/N77A9428.jpg" },
//       {
//         src: "/denis-prossy/function/N77A9472.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9486.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9511.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9542.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9545.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9569.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9552.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9558.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9563.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9582.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9505.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9518.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9526.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9529.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//       {
//         src: "/denis-prossy/function/N77A9558.jpg",
//         id: "",
//         category: "",
//         url: "",
//       },
//     ],
//     title: "",
//   }},
// ];

// export const clientsData: any = [
//   {
//     id: "65234f1a8d1b4b001c3a9f01",
//     name: "intoductions",
//     clients: [
//       {
//         id: "65234f1a8d1b4b001c3a9f10",
//         title: "DENIS + PROSSY",
//         slug: "denis-prossy",
//         description: "This is denis and prossy .",
//         eventDate: new Date("2024-11-23"),
//         imageUrl: "/denis-prossy/highlights/N77A8605.jpg",
//         youtubeUrl: "https://youtu.be/LrIXxSMqS98?si=HsIhh9Yi7tvQQLY8",
//         photos: [
//           {
//             id: "highlights",

//             photos: [
//               {
//                 src: "/denis-prossy/highlights/N77A8605.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8619.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8623.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8645.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8646.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9197.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9204.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8604.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8669.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9641.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9096.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9181.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9186.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9398.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9399.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9428.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9435w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9429w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9252.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9254.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9274.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9272.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A9252.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8681.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8656.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8657.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8602.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/highlights/N77A8698.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//           },
//           {
//             id: "church",
//             name: "Church",
//             photos: [
//               {
//                 src: "/denis-prossy/church/N77A8538.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8558.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8558.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8570.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               // { src: "/denis-prossy/church/N77A8574.jpg" },
//               {
//                 src: "/denis-prossy/church/N77A8582.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8594.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8547.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/church/N77A8555.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//           {
//             id: "decor",
//             name: "Décor",
//             photos: [
//               {
//                 src: "/denis-prossy/decor/N77A8500.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8509.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8505w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8509.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8492w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8529.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8491.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8497.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8507w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8499w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8491.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8496w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8497.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8522w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/decor/N77A8499.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//           {
//             id: "men",
//             name: "Men",
//             photos: [
//               {
//                 src: "/denis-prossy/men/0K4A7692w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7694w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7702w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7704w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7694w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7721w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7706w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7686w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7688w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7677w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7663w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7650w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7648w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7643w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/men/0K4A7641w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//           {
//             id: "gifts",
//             name: "Gifts",
//             photos: [
//               {
//                 src: "/denis-prossy/gifts/0K4A7556w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7558w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7616w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7607w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7603w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7590w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/gifts/0K4A7458w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7570w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7568w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               // { src: "/denis-prossy/gifts/0K4A7486w.jpg" },
//               {
//                 src: "/denis-prossy/gifts/0K4A7562w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7560w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7578w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/gifts/0K4A7544w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7541w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7632w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7622w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7615w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7599w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7587w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/gifts/0K4A7441w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7449w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7536w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7463w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7573w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7477w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7479w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/gifts/0K4A7485w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7492w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7499w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7503w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7550w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7505w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7511w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/gifts/0K4A7514w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7519w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/gifts/0K4A7530w.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//           {
//             id: "greetings",
//             name: "Greetings",
//             photos: [
//               {
//                 src: "/denis-prossy/greetings/N77A8743.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8749.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8771.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8803.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8864.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9450.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9011.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9025.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9024.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9445.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9018.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A9007.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/greetings/N77A8858.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8861.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8799.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8784.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8802.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8808.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8813.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8817.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8826.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8874.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8879.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8895.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8903.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8886.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8943.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8951.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8932.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8919.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/greetings/N77A8969.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//           {
//             id: "function",
//             name: "Function",
//             photos: [
//               {
//                 src: "/denis-prossy/function/N77A9074.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9075.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9077.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9080.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9100.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9106.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9107.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9121.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9135.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9160.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/function/N77A9263.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9131.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9131.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9115.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9118.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9103.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9090.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/function/N77A9042.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9246.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9058.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },

//               {
//                 src: "/denis-prossy/function/N77A9040.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9050.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9265.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9041.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A8971.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A8973.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A8982.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9000.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9053.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9056.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9292.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9340.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9360.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9366.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9380.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9407.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9456.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9458.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               // { src: "/denis-prossy/function/N77A9464.jpg" },
//               {
//                 src: "/denis-prossy/function/N77A9480.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9483.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9453.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               // { src: "/denis-prossy/function/N77A9428.jpg" },
//               {
//                 src: "/denis-prossy/function/N77A9472.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9486.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9511.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9542.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9545.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9569.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9552.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9558.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9563.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9582.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9505.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9518.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9526.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9529.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//               {
//                 src: "/denis-prossy/function/N77A9558.jpg",
//                 id: "",
//                 category: "",
//                 url: "",
//               },
//             ],
//             title: "",
//           },
//         ],
//         categoryId: "65234f1a8d1b4b001c3a9f01",
//         // createdAt: new Date(),
//         // updatedAt: new Date(),
//       },
//     ],
//   },
// ];

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export interface Photo {
  id: string;
  src: string;
  alt?: string;
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

export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};
export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};

export type ClientUpdateData = {
  photos: boolean;
  slug: any;
  imageUrl: any;
  categoryId: any;
  title: string;
  eventDate: string;
  description?: string;
  youtubeUrl?: string;
};

export type CategoryUpdateData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  title: string;
};

export type PhotoUpdateData = {
  title: string;
  category: string;
};

export interface Category {
  id: string;
  title: string;
}

export interface Photo {
  id: string;
  src: string;
  category: string;
  url: string;
}

export type { PhotoCategory };
