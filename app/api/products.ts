export type Product = {
  id: string;
  name: string;
  img: string;
  stopDate: number;
  bid: number;
};

export function getProducts() {
  // return mock
  //   .map(({ id, name }, i) => ({
  //     id: id + i,
  //     name: name + i,
  //     ...randomFields(),
  //   }))
  //   .slice(0, 21);
  return fetch("https://api.coingecko.com/api/v3/nfts/list")
    .then((res) => res.json())
    .then<Product[]>((res: { id: string; name: string }[]) =>
      res.map(({ id, name }) => ({
        id,
        name,
        ...randomFields(),
      })),
    );
}

const now = Date.now();
const MS_IN_DAY = 24 * 60 * 60 * 1000;

function randomFields() {
  return {
    img: `/img/${Math.round(randomNum(1, 5))}.jpg`,
    stopDate: Math.round(randomNum(now, now + MS_IN_DAY)),
    bid: +randomNum(0.5, 20).toFixed(2),
  };
}

function randomNum(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const mock = [
  {
    id: "autoglyphs",
    name: "Autoglyphs",
    img: "/img/2.jpg",
    stopDate: 1770615892622,
    bid: 8.91,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "20Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
  {
    id: "meebits",
    name: "20Meebits",
    img: "/img/2.jpg",
    stopDate: 1770641953820,
    bid: 10.01,
  },
];
