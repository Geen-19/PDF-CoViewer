import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import '../App.css'
const PDFViewer = ({ pageNum, scale, url, setTotalPages }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages); // Set the total pages
      renderPage(pageNum);
    };

    loadPdf();
  }, [url]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  }, [pageNum]);

  const renderPage = async (num) => {
    setPageRendering(true);
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    const renderTask = page.render(renderContext);

    await renderTask.promise;
    setPageRendering(false);
    if (pageNumPending !== null) {
      renderPage(pageNumPending);
      setPageNumPending(null);
    }

    // Redraw existing drawings
    drawings.forEach(drawing => {
      ctx.beginPath();
      ctx.moveTo(drawing.startX, drawing.startY);
      ctx.lineTo(drawing.endX, drawing.endY);
      ctx.stroke();
    });
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setDrawings([...drawings, { startX, startY, endX: startX, endY: startY }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const newDrawings = drawings.slice();
    newDrawings[newDrawings.length - 1].endX = endX;
    newDrawings[newDrawings.length - 1].endY = endY;
    setDrawings(newDrawings);
    renderPage(pageNum);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="pdf-container">
      <canvas
        ref={canvasRef}
        id="the-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default PDFViewer;