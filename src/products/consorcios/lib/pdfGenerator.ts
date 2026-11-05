import { jsPDF } from "jspdf";
import { ClientProfile } from "@/products/consorcios/types/presentation";

/**
 * Gera uma Ficha Cadastral Executiva e Dossiê de Consórcio em PDF de alto luxo
 * Utiliza a identidade visual oficial da LFT Gestão com a Logo Azul LFT
 */
export async function generateExecutiveDossierPDF(profile: ClientProfile): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Helper para carregar a imagem da logo azul em base64
  const getLogoBase64 = async (): Promise<string | null> => {
    try {
      const response = await fetch("/assets/logos/logo-lft-azul.png");
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const logoBase64 = await getLogoBase64();

  const applyHeaderBackground = (pageNumber: number) => {
    // Header background clean branco / slate-50 com borda sutil
    doc.setFillColor(248, 250, 252); // #F8FAFC
    doc.rect(0, 0, pageWidth, 30, "F");

    // Linha de acento azul LFT
    doc.setFillColor(0, 114, 213); // #0072D5
    doc.rect(0, 30, pageWidth, 1.2, "F");

    // Logo LFT Azul
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", margin, 5, 38, 18);
      } catch {
        doc.setTextColor(0, 114, 213);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("LFT GESTÃO", margin, 17);
      }
    } else {
      doc.setTextColor(0, 114, 213);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("LFT GESTÃO", margin, 17);
    }

    // Header Right
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 24, 47); // #0A182F
    doc.text("FICHA CADASTRAL • PESSOA FÍSICA", pageWidth - margin, 13, { align: "right" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 114, 213);
    doc.text("PLANEJAMENTO PATRIMONIAL & CONSÓRCIO | CONFIDENCIAL", pageWidth - margin, 18, { align: "right" });
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`EMISSÃO: ${new Date().toLocaleDateString("pt-BR")} | PÁG. 0${pageNumber}`, pageWidth - margin, 23, { align: "right" });
  };

  const applyFooter = (pageNumber: number, totalPages: number) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
    doc.setFillColor(0, 114, 213);
    doc.rect(0, pageHeight - 12, pageWidth, 0.5, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text("LFT Gestão de Risco e Planejamento Financeiro | www.lftgestaoderisco.com.br", margin, pageHeight - 5);
    doc.text(`Consultor: ${profile.brokerName || "Thiago Nunes"} | Pág. ${pageNumber} de ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: "right" });
  };

  const drawSectionTitle = (title: string, yPos: number) => {
    doc.setFillColor(241, 245, 249); // #F1F5F9
    doc.roundedRect(margin, yPos, contentWidth, 7, 1.5, 1.5, "F");

    doc.setFillColor(0, 114, 213); // Primary Blue bar
    doc.rect(margin, yPos, 2.5, 7, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(10, 24, 47);
    doc.text(title, margin + 5, yPos + 4.8);
  };

  const drawFieldCard = (label: string, value: string | undefined, x: number, y: number, w: number, h: number = 11) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, w, h, 1, 1, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, w, h, 1, 1, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), x + 2.5, y + 3.8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(10, 24, 47);
    doc.text(value && value.trim() ? String(value) : "—", x + 2.5, y + 8.5);
  };

  // ==========================================================================
  // PÁGINA 1: FICHA CADASTRAL COMPLETA
  // ==========================================================================
  applyHeaderBackground(1);

  let y = 35;

  // Proponent Overview Banner
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 24, 47);
  doc.text(profile.name || "Cliente Proponente", margin + 4, y + 6.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Profissão: ${profile.profession || "Não informada"}  |  Consultor Responsável: ${profile.brokerName || "Thiago Nunes"}`, margin + 4, y + 11.5);
  doc.text(`Objetivo da Operação: ${profile.mainGoal || "Consórcio"}`, margin + 4, y + 16.5);

  y += 24;

  // SEÇÃO 1: DADOS PESSOAIS & IDENTIFICAÇÃO
  drawSectionTitle("1. DADOS PESSOAIS & IDENTIFICAÇÃO", y);
  y += 9;

  // Linha 1: CPF, Data Nasc, Sexo, RG
  const col4W = (contentWidth - 6) / 4;
  drawFieldCard("CPF", profile.cpf, margin, y, col4W);
  drawFieldCard("Data de Nascimento", profile.dataNascimento ? profile.dataNascimento.split("-").reverse().join("/") : "", margin + col4W + 2, y, col4W);
  drawFieldCard("Sexo", profile.sexo, margin + (col4W + 2) * 2, y, col4W);
  drawFieldCard("RG", profile.rg, margin + (col4W + 2) * 3, y, col4W);
  y += 13;

  // Linha 2: Órgão Expedidor, Nacionalidade, Cidade Nascimento (Naturalidade)
  const col3W = (contentWidth - 4) / 3;
  drawFieldCard("Órgão Expedidor", profile.orgaoExpedidor, margin, y, col3W);
  drawFieldCard("Nacionalidade", profile.nacionalidade || "Brasileira", margin + col3W + 2, y, col3W);
  drawFieldCard("Cidade de Nascimento", profile.cidadeNascimento, margin + (col3W + 2) * 2, y, col3W);
  y += 13;

  // Linha 3: Nome Completo da Mãe (Largura Total)
  drawFieldCard("Nome Completo da Mãe", profile.nomeMae, margin, y, contentWidth);
  y += 16;

  // SEÇÃO 2: PROFISSÃO, RENDA & ESTADO CIVIL
  drawSectionTitle("2. OCUPAÇÃO PROFISSIONAL, RENDA & ESTADO CIVIL", y);
  y += 9;

  drawFieldCard("Profissão / Cargo", profile.profession, margin, y, col3W);
  drawFieldCard("Renda Mensal Declarada", profile.renda ? `R$ ${profile.renda}` : "", margin + col3W + 2, y, col3W);
  drawFieldCard("Estado Civil", profile.estadoCivil, margin + (col3W + 2) * 2, y, col3W);
  y += 13;

  // SEÇÃO 3: DADOS DO CÔNJUGE (se casado ou união estável)
  const isMarriedOrStable =
    profile.estadoCivil === "Casado(a)" || profile.estadoCivil === "União Estável";

  if (isMarriedOrStable) {
    drawSectionTitle("3. DADOS DO CÔNJUGE (CASADO / UNIÃO ESTÁVEL)", y);
    y += 9;
    const col2W = (contentWidth - 2) / 2;
    drawFieldCard("Nome Completo do Cônjuge", profile.nomeConjuge, margin, y, col2W);
    drawFieldCard("CPF do Cônjuge", profile.cpfConjuge, margin + col2W + 2, y, col2W);
    y += 16;
  } else {
    drawSectionTitle("3. DADOS DO CÔNJUGE", y);
    y += 9;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Não aplicável (Estado civil declarado como Solteiro/Divorciado/Viúvo).", margin + 4, y + 4.5);
    y += 11;
  }

  // SEÇÃO 4: CONTATO & ENDEREÇO RESIDENCIAL
  drawSectionTitle("4. CONTATO & ENDEREÇO RESIDENCIAL", y);
  y += 9;

  // Linha 1: Celular, E-mail, CEP
  drawFieldCard("Celular / WhatsApp", profile.celular || profile.phone, margin, y, col3W);
  drawFieldCard("E-mail", profile.email, margin + col3W + 2, y, col3W);
  drawFieldCard("CEP", profile.cep, margin + (col3W + 2) * 2, y, col3W);
  y += 13;

  // Linha 2: Rua / Logradouro (2 cols), Bairro (1 col)
  const col2_3W = ((contentWidth - 2) / 3) * 2;
  const col1_3W = (contentWidth - 2) / 3;
  drawFieldCard("Rua / Avenida & Número", profile.rua, margin, y, col2_3W);
  drawFieldCard("Bairro", profile.bairro, margin + col2_3W + 2, y, col1_3W);
  y += 13;

  // Linha 3: Cidade / Estado
  drawFieldCard("Cidade / Estado", profile.cidadeEstado || profile.city, margin, y, contentWidth);
  y += 16;

  // SEÇÃO 5: TERMO DE DECLARAÇÃO & ASSINATURAS
  drawSectionTitle("5. DECLARAÇÃO DE VERACIDADE & ASSINATURAS", y);
  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  const declarationText =
    "Declaro para os devidos fins de direito que todas as informações prestadas nesta Ficha Cadastral são verdadeiras, completas e exatas. Autorizo a LFT Gestão a realizar as devidas consultas e submissões às administradoras de consórcio parceiras para análise de crédito e formalização da proposta.";
  
  const splitText = doc.splitTextToSize(declarationText, contentWidth - 4);
  doc.text(splitText, margin + 2, y + 3);

  y += 14;

  // Linhas de Assinatura
  const signColW = (contentWidth - 10) / 2;
  
  // Assinatura Cliente
  doc.setDrawColor(148, 163, 184);
  doc.line(margin + 5, y + 10, margin + signColW - 5, y + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(10, 24, 47);
  doc.text(profile.name || "Assinatura do Proponente", margin + signColW / 2, y + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`CPF: ${profile.cpf || "—"}`, margin + signColW / 2, y + 17.5, { align: "center" });

  // Assinatura Consultor
  const sign2X = margin + signColW + 10;
  doc.line(sign2X + 5, y + 10, sign2X + signColW - 5, y + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(10, 24, 47);
  doc.text(profile.brokerName || "Thiago Nunes", sign2X + signColW / 2, y + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Consultor Especialista • LFT Gestão", sign2X + signColW / 2, y + 17.5, { align: "center" });

  applyFooter(1, 1);

  return doc;
}

/**
 * Dispara o download automático do Dossiê em PDF no navegador
 */
export async function downloadExecutiveDossierPDF(profile: ClientProfile): Promise<boolean> {
  try {
    const doc = await generateExecutiveDossierPDF(profile);
    const safeName = (profile.name || "Cliente").replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`LFT_Ficha_Cadastral_Consorcio_${safeName}.pdf`);
    return true;
  } catch (err) {
    console.error("Erro ao gerar PDF:", err);
    return false;
  }
}
