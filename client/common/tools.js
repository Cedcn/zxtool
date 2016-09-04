import { Linkblock, Image } from 'modules';

export const getModule = moduleName => {
  switch (moduleName) {
    case 'linkblock':
      return Linkblock;
    case 'image':
      return Image;
  }
  return false;
};


export const createScript = url => {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  const heads = document.getElementsByTagName('head');
  if (heads.length) {
    heads[0].appendChild(script);
  } else {
    document.documentElement.appendChild(script);
  }
};

export const colorToRgba = color => {
  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
