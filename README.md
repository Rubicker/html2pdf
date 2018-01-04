# html2pdf
A simple solution to convert html to pdf use html2canvas.js and jsPDF.js

## How

1. Install dependencies
  
   Drop html2canvas.js and jsPDF.js into your page with `<script>` or npm or yarn
  
2. Then you're ready to start making your own pdf:

   ```js
   $(function() {
    const $downloadBtn = $('.btn-download');
    const $resume = $('.main');
    
    $downloadBtn.click(function(){
      const h = $resume.height();
      const w = $resume.width();
      const canvas = document.createElement('canvas');
      const left = $resume.offset().left;
      const top = $resume.offset().top;

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
      
      html2canvas($resume, {
        canvas,
        onrendered: function(canvas) {
          const imgData = canvas.toDataURL('image/png');
          // 初始化pdf，设置相应格式
          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            /*
            * px to mm 增加一定边距
            */
            format: [w * 0.264583 + 10, h * 0.264583 + 10]
          });

          /* 
           * 5, 5 为图片在 pdf 上的左上角起点
           */
          doc.addImage(imgData, 'PNG', 5, 5, w * 0.264583, h * 0.264583);

          //输出保存
          doc.save('我的简历.pdf');
        }
      });
    })
   });
   ```
