import html2pdf from 'html2pdf.js';

export const exportToPDF = () => {
  const element = document.getElementById('lookbook-content');
  
  if (!element) {
    console.error('Could not find lookbook-content element');
    return;
  }
  
  // Clone the element to modify for PDF without affecting the page
  const clone = element.cloneNode(true);
  
  // Remove elements that shouldn't be in PDF
  clone.querySelectorAll('.no-print').forEach(el => el.remove());
  
  // Create a temporary container
  const container = document.createElement('div');
  container.appendChild(clone);
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '8.5in';
  container.style.background = '#0a0a1a';
  document.body.appendChild(container);
  
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'ConvoShrimp-CNN-Lookbook.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#0a0a1a',
      scrollY: 0,
      windowWidth: 816, // 8.5 inches at 96dpi
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' 
    },
    pagebreak: { 
      mode: ['css', 'legacy'],
      before: '.pdf-section',
      avoid: ['.pdf-card', 'img', 'pre', 'code', '.rounded-2xl', '.rounded-xl']
    }
  };
  
  // Add print class for styling
  document.body.classList.add('printing');
  clone.classList.add('printing');
  
  html2pdf()
    .set(options)
    .from(clone)
    .save()
    .then(() => {
      document.body.classList.remove('printing');
      document.body.removeChild(container);
    })
    .catch(err => {
      console.error('PDF export error:', err);
      document.body.classList.remove('printing');
      document.body.removeChild(container);
    });
};
