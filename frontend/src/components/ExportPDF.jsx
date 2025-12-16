import { Download, Loader } from "lucide-react";
import { useState } from "react";
import html2pdf from "html2pdf.js";

export default function ExportPDF({ 
  title, 
  content, 
  author = "EM-PULSE Community",
  date = new Date().toLocaleDateString('es-ES'),
  buttonSize = "sm"
}) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Crear elemento temporal con el contenido
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <!-- Encabezado con marca de agua -->
          <div style="position: relative; margin-bottom: 40px; border-bottom: 2px solid #15BCE6; padding-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <div style="flex: 1;">
                <div style="font-size: 24px; font-weight: bold; color: #15BCE6; margin-bottom: 5px;">
                  🏥 EM-PULSE
                </div>
                <div style="font-size: 12px; color: #666;">
                  Plataforma de Apoyo para Esclerosis Múltiple
                </div>
              </div>
              <div style="text-align: right; opacity: 0.1; font-size: 60px; font-weight: bold; position: absolute; right: 20px; top: 0;">
                EM
              </div>
            </div>
          </div>

          <!-- Título del contenido -->
          <h1 style="font-size: 28px; color: #021922; margin-bottom: 10px; line-height: 1.3;">
            ${title}
          </h1>

          <!-- Metadata -->
          <div style="display: flex; gap: 20px; margin-bottom: 30px; font-size: 12px; color: #666; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
            <div>
              <strong>Autor:</strong> ${author}
            </div>
            <div>
              <strong>Fecha:</strong> ${date}
            </div>
            <div>
              <strong>Fuente:</strong> https://empulse.onrender.com
            </div>
          </div>

          <!-- Contenido principal -->
          <div style="line-height: 1.8; font-size: 13px; color: #333;">
            ${content}
          </div>

          <!-- Footer con marca de agua -->
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #999;">
            <div style="margin-bottom: 5px;">
              Documento generado por <strong>EM-PULSE</strong> - Plataforma de Apoyo para Esclerosis Múltiple
            </div>
            <div>
              Este documento es solo para fines informativos. No sustituye el consejo médico profesional.
            </div>
          </div>
        </div>
      `;

      // Opciones para html2pdf
      const options = {
        margin: 10,
        filename: `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { 
          orientation: 'portrait', 
          unit: 'mm', 
          format: 'a4',
          compress: true 
        }
      };

      // Generar PDF
      html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al exportar el documento');
    } finally {
      setIsExporting(false);
    }
  };

  const buttonClasses = {
    sm: "px-3 py-2 text-xs font-semibold",
    md: "px-4 py-2 text-sm font-semibold",
    lg: "px-6 py-3 text-base font-semibold"
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className={`
        ${buttonClasses[buttonSize]}
        bg-emerald-500/20 hover:bg-emerald-500/40 
        text-emerald-400 rounded-lg 
        transition-all duration-200
        flex items-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title="Exportar a PDF"
    >
      {isExporting ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Descargar PDF
        </>
      )}
    </button>
  );
}
