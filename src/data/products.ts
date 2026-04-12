export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: "Coffee" | "Non-Coffee" | "Food";
  description: string;
}
export const products: Product[] = [
  {
    id: "c1",
    name: "Caffè Latte",
    slug: "caffe-latte",
    price: 35000,
    image: "/product/coffee/latte.jpg",
    category: "Coffee",
    description: "Perpaduan sempurna antara espresso pekat dan susu segar yang dikukus, memberikan tekstur lembut berbusa.",
  },
  {
    id: "c2",
    name: "Americano",
    slug: "americano",
    price: 25000,
    image: "/product/coffee/americano.jpg",
    category: "Coffee",
    description: "Sajian klasik espresso berkualitas tinggi yang dicampur dengan air panas terekstraksi sempurna.",
  },
  {
    id: "c3",
    name: "Kopi Susu Gula Aren",
    slug: "kopi-susu-gula-aren",
    price: 28000,
    image: "/product/coffee/kopi-susu-gula-aren.jpg",
    category: "Coffee",
    description: "Kopi susu signature kami yang dipadukan dengan gula aren murni, menciptakan rasa manis yang khas.",
  },
  {
    id: "c4",
    name: "Caramel Macchiato",
    slug: "caramel-macchiato",
    price: 45000,
    image: "/product/coffee/caramel-macchiato.jpg",
    category: "Coffee",
    description: "Susu vanilla dengan siraman espresso segar dan sentuhan saus karamel di atasnya.",
  },
  {
    id: "nc1",
    name: "Matcha Latte",
    slug: "matcha-latte",
    price: 38000,
    image: "/product/non-coffee/matcha-latte.jpg",
    category: "Non-Coffee",
    description: "Bubuk matcha premium Jepang asli dicampur dengan susu creamy.",
  },
  {
    id: "nc2",
    name: "Signature Chocolate",
    slug: "signature-chocolate",
    price: 35000,
    image: "/product/non-coffee/chocolate.jpg",
    category: "Non-Coffee",
    description: "Cokelat pekat premium dengan perpaduan susu, disajikan hangat atau dingin.",
  },
  {
    id: "f1",
    name: "Butter Croissant",
    slug: "butter-croissant",
    price: 20000,
    image: "/product/food/croissant.jpg",
    category: "Food",
    description: "Croissant berlapis butter khas Prancis, renyah di luar dan lembut di dalam.",
  },
  {
    id: "f2",
    name: "Choco Chip Cookie",
    slug: "choco-chip-cookie",
    price: 15000,
    image: "/product/food/cookie.jpg",
    category: "Food",
    description: "Kue klasik dengan tekstur chewy dan taburan coklat kualitas terbaik.",
  },
];
