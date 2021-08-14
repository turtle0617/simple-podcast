export interface Podcast {
  image: Record<"link" | "title" | "url", string>;
  title: string;
  description: string;
  link: string;
  copyright: string;
  items: Episode[];
}

export interface Episode {
  guid: string;
  content: string;
  ["content:encoded"]: string;
  ["content:encodedSnippet"]: string;
  contentSnippet: string;
  creator: string;
  ["dc:creator"]: string;
  link: string;
  pubDate: string;
  title: string;
  enclosure?: {
    length: string;
    type: string;
    url: string;
  };
  itunes?: {
    author: string;
    duration: string;
    episode: string;
    explicit: string;
    image: string;
    season: string;
    summary: string;
  };
}

export enum AudioStatus {
  PLAY = "play",
  PAUSE = "pause",
}
