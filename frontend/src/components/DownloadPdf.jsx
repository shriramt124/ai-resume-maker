import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const downloadPDF = async (resumePreviewRef) => {
    if (!resumePreviewRef.current) return;

    try {
        // Store original styles
        const element = resumePreviewRef.current;
        const originalStyles = window.getComputedStyle(element);
        const originalTransform = element.style.transform;
        const originalWidth = element.style.width;

        // Function to convert color to RGB
        const convertToRGB = (color) => {
            // Create a temporary div to compute colors
            const temp = document.createElement('div');
            temp.style.color = color;
            temp.style.display = 'none';
            document.body.appendChild(temp);

            // Get computed color
            const computedColor = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);

            return computedColor;
        };

        // Apply print-specific styles
        element.style.transform = 'scale(1)';
        element.style.width = '21cm';

        // Convert all color values to RGB
        const elements = element.getElementsByTagName('*');
        const originalColors = new Map();

        for (let el of elements) {
            const style = window.getComputedStyle(el);
            const colorProps = ['color', 'backgroundColor', 'borderColor'];

            originalColors.set(el, {});

            for (let prop of colorProps) {
                if (style[prop] && style[prop] !== 'transparent' && style[prop] !== 'rgba(0, 0, 0, 0)') {
                    try {
                        originalColors.get(el)[prop] = el.style[prop];
                        el.style[prop] = convertToRGB(style[prop]);
                    } catch (e) {
                        console.warn(`Failed to convert color for ${prop}`, e);
                    }
                }
            }
        }

        // Generate PDF
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Restore original styles
        element.style.transform = originalTransform;
        element.style.width = originalWidth;

        // Restore original colors
        for (let [el, colors] of originalColors) {
            for (let [prop, value] of Object.entries(colors)) {
                el.style[prop] = value;
            }
        }

        // Save PDF
        pdf.save('resume.pdf');

    } catch (error) {
        console.error('PDF generation error:', error);
        // Provide user feedback
        alert('Failed to generate PDF. Please try again or contact support if the issue persists.');
    }
};

export default downloadPDF;