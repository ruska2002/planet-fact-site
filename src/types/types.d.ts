interface Size {
  mobileWidth: string;
  mobileHeight: string;
  tabletWidth: string;
  tabletHeight: string;
  laptopWidth: string;
  laptopHeight: string;
}

interface Planet {
  name: string;
  overview: { content: string; source: string };
  structure: { content: string; source: string };
  geology: { content: string; source: string };
  images: { planet: string; internal: string; geology: string };
  color: string;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  sizes: {
    planet: Size;
    internal: Size;
    geology: Size;
  };
  miniPic: string;
}
