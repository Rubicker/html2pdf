$(function() {
  const $downloadBtn = $('.hit-me');
  const $content = $('.capture-area');
  
  $downloadBtn.click(function(){
    const h = $content.height();
    const w = $content.width();
    const canvas = document.createElement('canvas');
    const left = $content.offset().left;
    const top = $content.offset().top;

    /*
    *  canvas 画布放大两倍保证图片高清
    *  同时偏移一定量，修复 margin bug
    */
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.translate(-left - 8, -top + 10);
    
    html2canvas($content, {
      canvas,
      onrendered: function(canvas) {
        const imgData = canvas.toDataURL('image/png');

        // 初始化pdf，设置相应格式
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          // px to mm 增加一定边距, 此处 format 为 pdf 大小
           format: [w * 0.264583 + 10, h * 0.264583 + 10]
        });

        //5, 5 为图片在 pdf 上的左上角起点，此处后两个参数为图片在 PDF 中展示的大小
        doc.addImage(imgData, 'PNG', 5, 5, w * 0.264583, h * 0.264583);

        //输出保存 
        doc.save('我的简历.pdf');
      }
    }).then(function(canvas) {
      if ($('.canvas-container').children().length === 0) {
        const $container = $('.canvas-container');
        $container.append(canvas);
      }
    }) ;
  })
 });