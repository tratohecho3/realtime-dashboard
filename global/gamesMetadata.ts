export interface GameAnalytics {
  name: string;
  id: string;
  counter?: number;
}

export const GAMES: GameAnalytics[] = [
  {
    name: "Far Cry 5",
    id: "497078",
    counter: 0
  },
  {
    name: "Rainbow Six Siege",
    id: "460630",
    counter: 0
  },
  {
    name: "Assassin’s Creed Odyssey",
    id: "506274",
    counter: 0
  }
];
