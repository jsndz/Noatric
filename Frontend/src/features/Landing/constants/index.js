import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../../../assets";
import alien from "../../../assets/category/alien.png";
import suit from "../../../assets/category/astronaut.png";
import weapon from "../../../assets/category/rifle.png";
import bot from "../../../assets/category/space-robot.png";
import ufo from "../../../assets/category/ufo.png";

import axios from "../../../assets/tech/axios.svg";
import express from "../../../assets/tech/express.png";
import mongo from "../../../assets/tech/mongo.png";
import node from "../../../assets/tech/nodejs.png";
import react from "../../../assets/tech/physics.png";
import redux from "../../../assets/tech/redux.png";
import stripe from "../../../assets/tech/stripe.png";
import tailwind from "../../../assets/tech/tailwind-css.svg";
export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [
  { img: alien, name: "Alien Tech" },
  { img: ufo, name: " Spacecraft" },
  { img: suit, name: " Spacesuits" },
  { img: weapon, name: " Alien Arsenal" },
  { img: bot, name: " Robotics" },
];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Backend and Database setup",
    text: "Implement robust backend infrastructure and database systems to support Noatric's dynamic Kinetic Wonders, ensuring seamless performance and data management.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Frontend Integration",
    text: "Integrate captivating frontend elements to enhance the visual appeal of Noatric's Kinetic Wonders, providing users with an immersive and interactive experience.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Designing of Website",
    text: "Craft visually stunning website designs that showcase the uniqueness of Noatric's Kinetic Wonders, captivating visitors and inviting them to explore further.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Hosting and Deployment",
    text: "Implement efficient hosting and deployment strategies to ensure Noatric's Kinetic Wonders are accessible and performant across various platforms, maximizing reach and impact.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Noatric's innovative collaboration is powered by automation and top-notch security, perfect for teams seeking an elevated experience.";

export const collabContent = [
  {
    id: "0",
    title: "Integrated Payment Solutions",
    text: "",
  },
  {
    id: "1",
    title: "Interactive Frontend Experience",
    text: "",
  },
  {
    id: "2",
    title: "Scalable Backend Architecture",
    text: "",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "React",
    icon: react,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Redux",
    icon: redux,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Axios",
    icon: axios,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Mongodb",
    icon: mongo,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Tailwind-css",
    icon: tailwind,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Stripe",
    icon: stripe,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Node.js",
    icon: node,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Express.js",
    icon: express,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Experience Sci-Fi Marvels",
    text: "Step into a world of sci-fi marvels with our collection of temperature-responsive objects. Explore cutting-edge designs inspired by the imagination of science fiction.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: "./src/assets/benfit/thermometer.png",
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Enhance Your Space with Futuristic Designs",
    text: "Immerse yourself in futuristic designs that blur the line between reality and imagination. Elevate your space with kinetic creations inspired by the wonders of sci-fi tech.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: "./src/assets/benfit/kinetic-energy.png",
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Connect Anywhere with Futuristic Innovations",
    text: "Connect with futuristic innovations from anywhere, on any device. Our collection of temperature-responsive objects brings the future to your fingertips, no matter where you are.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: "./src/assets/benfit/bot.png",
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Efficient Assistance for Sci-Fi Enthusiasts",
    text: "Get fast responses and efficient assistance for all your sci-fi inquiries. Dive deep into the world of science fiction with our curated collection of kinetic wonders.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: "./src/assets/benfit/test-tube.png",
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Discover Unique Sci-Fi Marvels",
    text: "Explore a diverse collection of temperature-responsive objects inspired by the realms of science fiction. Elevate your space with unique designs that push the boundaries of imagination.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: "./src/assets/benfit/flask.png",
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Stay Informed with Sci-Fi Technology",
    text: "Experience the wonders of sci-fi technology with our innovative collection of kinetic wonders. Stay informed and inspired as you explore the possibilities of the future.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: "./src/assets/benfit/lightbulb.png",
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
