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
