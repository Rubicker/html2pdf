# html2pdf
A simple solution to convert html to pdf use html2canvas.js and jsPDF.js

> 修复的 margin 指的是：在 html2canvas.js 中的 canvas 画布总是从页面左上角开始截取范围（不管你传递的页面元素位置），因此若想要生成的元素存在 `margin` 值，则需要通过 `context.translate()` 可以进行一定量的偏移来相抵消。
   
TODO：
- [ ] 生成的 PDF 相对体积较大

## How

1. Install dependencies
  
   Drop html2canvas.js and jsPDF.js into your page with `<script>` or npm or yarn
  
2. Then you're ready to start making your own pdf
