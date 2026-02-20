export type Project = {
  client: string;
  role: string;
  year: string;
  description: string;
  images: string[];
};

export type Category = {
  title: "Graphic Design" | "Content Creation" | "Event & Production";
  cardImage: string;
  projects: Project[];
};

export const categories: Category[] = [
  {
    title: "Graphic Design",
    cardImage: "/assets/card-graphic-design.png",
    projects: [
      {
        client: "Campus Org, Creative Collateral",
        role: "Designer",
        year: "2024",
        description:
          "A mix of poster and social assets designed to feel like print first, then adapted for platforms. Clean hierarchy, nostalgic texture, and strong focal points.",
        images: [
          "/assets/moodboard.png",
          "/assets/card-graphic-design.png",
          "/assets/logo-card.png"
        ]
      },
      {
        client: "Brand Study, Visual Direction",
        role: "Design, Layout",
        year: "2023",
        description:
          "Mood driven layouts and editorial type pairing for a cohesive brand kit. Built for quick iteration and consistent rollouts.",
        images: [
          "/assets/card-graphic-design.png",
          "/assets/moodboard.png",
          "/assets/card-content-creation.png"
        ]
      }
    ]
  },
  {
    title: "Content Creation",
    cardImage: "/assets/card-content-creation.png",
    projects: [
      {
        client: "Social Series, Content Pack",
        role: "Content Creator",
        year: "2024",
        description:
          "Short form content concepts designed around clarity, pacing, and repeatable templates. Focused on audience feel, not just aesthetics.",
        images: [
          "/assets/card-content-creation.png",
          "/assets/moodboard.png",
          "/assets/logo-card.png"
        ]
      },
      {
        client: "Campaign Sprint, Platform Adaptation",
        role: "Writer, Editor",
        year: "2023",
        description:
          "Caption and visual rhythm adjustments across formats. Built a lightweight content system that still feels handmade.",
        images: [
          "/assets/moodboard.png",
          "/assets/card-content-creation.png",
          "/assets/card-event-production.png"
        ]
      }
    ]
  },
  {
    title: "Event & Production",
    cardImage: "/assets/card-event-production.png",
    projects: [
      {
        client: "Program Launch, End to End Support",
        role: "Production, Coordination",
        year: "2024",
        description:
          "Run of show planning, asset prep, and on site coordination. Designed communication touchpoints so the event feels smooth and intentional.",
        images: [
          "/assets/card-event-production.png",
          "/assets/moodboard.png",
          "/assets/logo-card.png"
        ]
      },
      {
        client: "Creative Shoot, Post Production",
        role: "Editor",
        year: "2023",
        description:
          "Basic cut, pacing, and export sets. Optimized for quick social delivery while keeping the story readable and warm.",
        images: [
          "/assets/moodboard.png",
          "/assets/card-event-production.png",
          "/assets/card-graphic-design.png"
        ]
      }
    ]
  }
];
