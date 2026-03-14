import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, Loader2 } from 'lucide-react';
import ConvoShrimpPDF from './ConvoShrimpPDF';

export default function PDFDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<ConvoShrimpPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ConvoShrimp-CNN-Lookbook.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-shrimp-teal/20 hover:bg-shrimp-teal/30 text-shrimp-teal transition-colors disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Generating...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span className="text-sm">PDF</span>
        </>
      )}
    </button>
  );
}
