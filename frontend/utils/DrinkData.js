export const getDrinkImage = (name) => {
  switch (name.toLowerCase()) {
    case "Airen".toLowerCase():
      return require("../assets/drinks/Airen.png");
    case "BudLight".toLowerCase():
      return require("../assets/drinks/BudLight.png");
    case "CabernetSauvignon".toLowerCase():
      return require("../assets/drinks/CabernetSauvignon.png");
    case "CoronaExtra".toLowerCase():
      return require("../assets/drinks/CoronaExtra.png");
    case "DryMartini".toLowerCase():
      return require("../assets/drinks/DryMartini.png");
    case "FianodiAvellino".toLowerCase():
      return require("../assets/drinks/FianodiAvellino.png");
    case "GreenLabel".toLowerCase():
      return require("../assets/drinks/GreenLabel.png");
    case "HeinekenLager".toLowerCase():
      return require("../assets/drinks/HeinekenLager.png");
    case "JD".toLowerCase():
      return require("../assets/drinks/JD.png");
    case "legent".toLowerCase():
      return require("../assets/drinks/legent.png");
    case "Longbranch".toLowerCase():
      return require("../assets/drinks/Longbranch.png");
    case "manhattan".toLowerCase():
      return require("../assets/drinks/manhattan.png");
    case "margarita".toLowerCase():
      return require("../assets/drinks/margarita.png");
    case "Merlot".toLowerCase():
      return require("../assets/drinks/Merlot.png");
    case "Old-Fashioned".toLowerCase():
      return require("../assets/drinks/Old-Fashioned.png");
    case "StellaArtois".toLowerCase():
      return require("../assets/drinks/StellaArtois.png");
    default:
      return require("../assets/drinks/Old-Fashioned.png");
  }
};

export const DrinkData = [
  {
    title: "Cocktail",
    data: [
      {
        name: "Margarita",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/margarita.png"),
      },
      {
        name: "Manhattan",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/manhattan.png"),
      },
      {
        name: "Old Fashioned",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/Old-Fashioned.png"),
      },
      {
        name: "Dry Martini",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/DryMartini.png"),
      },
    ],
  },
  {
    title: "Beer",
    data: [
      {
        name: "Bud Light",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/BudLight.png"),
      },
      {
        name: "Corona Extra",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/CoronaExtra.png"),
      },
      {
        name: "Stella Artois",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/StellaArtois.png"),
      },
      {
        name: "Heineken Lager",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/HeinekenLager.png"),
      },
    ],
  },
  {
    title: "Wine",
    data: [
      {
        name: "Cabernet Sauvignon",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/CabernetSauvignon.png"),
      },
      {
        name: "Merlot",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/Merlot.png"),
      },
      {
        name: "Airén",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/Airen.png"),
      },
      {
        name: "Fiano di Avellino",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/FianodiAvellino.png"),
      },
    ],
  },
  {
    title: "Whiskey",
    data: [
      {
        name: "Green Label",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/GreenLabel.png"),
      },
      {
        name: "Legent Bourbon Whiskey",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/legent.png"),
      },
      {
        name: "Wild Turkey Longbranch",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/Longbranch.png"),
      },
      {
        name: "Jack Daniel's",
        marketPrice: 10,
        guaranteedPrice: 10,
        currentPrice: 10,
        image: require("../assets/drinks/JD.png"),
      },
    ],
  },
];
