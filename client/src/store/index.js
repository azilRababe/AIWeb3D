import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  color: "#000",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./Cat.png",
  fullDecal: "./Cat.png",
});
