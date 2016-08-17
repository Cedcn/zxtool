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



export const generateCode = (workPanel, canvasesData) => {
  const modules = canvasesData[0].modules;
  const moduleList = modules.map(item => {
    const elements = getModule(item.template).getTemplate(item);
    return `<div style="position: absoulte; width: ${item.elmW}px; height: ${item.elmH}px; left: ${item.elmX}px; top: ${item.elmY}px;">${elements}</div>`;
  });
  return `<div style="width: ${workPanel.width}px; height: ${workPanel.height}px">${moduleList.join('')}</div>`;
};
