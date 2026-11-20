import type { ComponentType } from "react";
import { HeroCoconut } from "./hero";
import { ShakeTable } from "./shake";
import { ShopExterior } from "./exterior";
import { ShopInterior } from "./interior";
import { Counter } from "./counter";
import { MenuBoard } from "./menuboard";
import { BenefitWall } from "./benefitwall";
import { FruitShelves } from "./shelves";

export {
  HeroCoconut,
  ShakeTable,
  ShopExterior,
  ShopInterior,
  Counter,
  MenuBoard,
  BenefitWall,
  FruitShelves,
};

export const SCENES: Record<string, ComponentType<{ className?: string }>> = {
  "hero-coconut": HeroCoconut,
  "shake-table": ShakeTable,
  "shop-exterior": ShopExterior,
  "shop-interior": ShopInterior,
  counter: Counter,
  "menu-board": MenuBoard,
  "benefit-wall": BenefitWall,
  "fruit-shelves": FruitShelves,
};

export type SceneName = keyof typeof SCENES;

export function Scene({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Comp = SCENES[name] ?? HeroCoconut;
  return <Comp className={className} />;
}
