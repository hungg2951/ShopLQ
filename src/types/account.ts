interface TAccount {
  code: string;
  title: string;
  description?: string;
  game?: string;
  price: number;
  discount?: number;
  isSold?: boolean;
  buyerId?: string;
  loginInfo?: string;
  rank?: string;
  highestRank?: string;
  champions?: number;
  skins?: number;
  runes?: number;
  winRate?: number;
  renameCards?: number;
  gold?: number;
  matches?: number;
  reputation?: number;
  impressions?: number;
  image?: string;
  bagImages?: string[];
  skinImages?: string[];
  champImages?: string[];
  runeImages?: string[];
  note?: string;
}
