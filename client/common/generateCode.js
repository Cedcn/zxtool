import { getModule, colorToRgba } from './tools';

const generateCode = (workPanel, canvasesData) => {
  const { width, height } = workPanel;
  const modulesHtml = canvas => {
    const moduleList = canvas.modules.map(item => {
      const elements = getModule(item.template).getTemplate(item);
      return `<div class="footer-more-trigger" style="overflow: hidden; padding: 0; border: 0; width: ${item.elmW}px; height: ${item.elmH}px; left: ${item.elmX}px; top: ${item.elmY}px;">${elements}</div>`;
    });
    return moduleList.join('');
  };

  const canvaseList = canvasesData.map(canvas => {
    return `
      <li style="position:relative;width: ${width}px; height: ${height}px; padding: 0; background-color: ${colorToRgba(canvas.backgroundColor)}">
        <div style="position:relative;width: ${width}px; height: ${height}px;">
          ${modulesHtml(canvas)}
        </div>
      </li>
    `;
  });

  const prevLeft = width > 950 ? (width - 950) / 2 : 10;
  const nextLeft = width > 950 ? (width - 950) / 2 + 950 - 66 : width - 66 - 10;
  const prevTop = (height - 128) / 2;
  const nextTop = prevTop;

  const prevNextHtml = `
    <div class="prev footer-more-trigger" style="width:66px;height:128px;padding:0;border:none;cursor:pointer;top:${prevTop}px;left:${prevLeft}px;z-index:49;">
      <img src="http://img04.taobaocdn.com/imgextra/i4/126112166/TB2EaKBaXXXXXXxXXXXXXXXXXXX-126112166.png">
    </div>
    <div class="next footer-more-trigger" style="width:66px;height:128px;padding:0;border:none;cursor:pointer;top:${nextTop}px;left:${nextLeft}px;z-index:49;">
      <img src="http://img02.taobaocdn.com/imgextra/i2/126112166/TB2s_WAaXXXXXXQXXXXXXXXXXXX-126112166.png">
    </div>
  `;


  return `
    <div class="dm_a_hash" style="height:${height}px;">
      <div class="footer-more-trigger" style="width:${width}px;height:${height}px;top:auto;padding:0px;border:none;left:${750 / 2 - 100}px;">
        <div class="footer-more-trigger" style="width:${width}px;height:${height}px;padding:0px;border:none;left:-50%;top:0px;overflow:hidden">
          <div class="J_TWidget" style="position:relative" data-widget-type="Carousel" data-widget-config="{
              'contentCls': 'ks-switchable-content',
              'navCls': 'ks-switchable-nav',
              'duration':0.5,'interval':4,
              'autoplay':true,
              'triggerType':'mouse',
              'circular':true,
              'effect': 'scrollx',
              'easing': 'backOut',
              'prevBtnCls':'prev',
              'nextBtnCls':'next',
              'autoplay': true,
              'viewSize':[${width}],
              'activeTriggerCls': 'selected'}"
            >
            <ul class="ks-switchable-content" style="height:${height}px;width:${width}px;padding:0px;margin:0px;">
              ${canvaseList.join('')}
            </ul>
            <ul class="ks-switchable-nav footer-more-trigger" style="padding:0;border:none;text-align:center;width:100%;left:0;top:${(height - 30)}px;font-size:20px;z-index:50;outline:0;">
              <li class="selected" style="display:inline-block;cursor:pointer;width:15px;">●</li>
              <li style="display:inline-block;cursor:pointer;width:15px;">●</li>
            </ul>
            ${prevNextHtml}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default generateCode;
