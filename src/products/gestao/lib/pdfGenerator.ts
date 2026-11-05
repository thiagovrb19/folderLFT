import { jsPDF } from "jspdf";
import { ClientProfile } from "@/products/gestao/types/presentation";

/**
 * Gera um Dossiê Executivo de Planejamento Patrimonial em PDF de alto luxo
 * Utiliza a identidade visual oficial da LFT Gestão de Risco com a Logo Azul LFT
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
    doc.rect(0, 0, pageWidth, 32, "F");

    // Linha de acento azul LFT
    doc.setFillColor(0, 114, 213); // #0072D5
    doc.rect(0, 32, pageWidth, 1.2, "F");

    // Logo LFT Azul
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", margin, 6, 42, 20);
      } catch {
        doc.setTextColor(0, 114, 213);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("LFT GESTÃO", margin, 18);
      }
    } else {
      doc.setTextColor(0, 114, 213);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("LFT GESTÃO", margin, 18);
    }

    // Header Right
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 24, 47); // #0A182F
    doc.text("DOSSIÊ DE PLANEJAMENTO & GESTÃO DE RISCO", pageWidth - margin, 15, { align: "right" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 114, 213);
    doc.text(`DOCUMENTO EXECUTIVO CONFIDENCIAL | PÁGINA 0${pageNumber}`, pageWidth - margin, 21, { align: "right" });
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
    doc.text(`Membro MDRT / Top of the Table | Pág. ${pageNumber} de ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: "right" });
  };

  const drawSectionTitle = (title: string, yPos: number, subtitle?: string) => {
    doc.setFillColor(241, 245, 249); // #F1F5F9
    doc.roundedRect(margin, yPos, contentWidth, subtitle ? 13 : 8, 1.5, 1.5, "F");

    doc.setFillColor(0, 114, 213); // Primary Blue bar
    doc.rect(margin, yPos, 2.5, subtitle ? 13 : 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(10, 24, 47);
    doc.text(title, margin + 5, yPos + 5.5);

    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text(subtitle, margin + 5, yPos + 10.5);
    }
  };

  // ==========================================================================
  // PÁGINA 1: RESUMO EXECUTIVO, PERFIL PESSOAL E FAMILIAR
  // ==========================================================================
  applyHeaderBackground(1);

  let y = 39;

  // Card do Proponente
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(10, 24, 47);
  doc.text(profile.name || "Cliente Convidado", margin + 5, y + 7.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Profissão: ${profile.profession || "Não informada"} | ${profile.company ? `Empresa: ${profile.company}` : ""}`, margin + 5, y + 13.5);
  doc.text(`E-mail: ${profile.email || "-"} | Tel: ${profile.phone || "-"}${profile.instagram ? ` | Insta: ${profile.instagram}` : ""}`, margin + 5, y + 19);
  const formattedBirth = profile.birthDate ? (profile.birthDate.includes("-") ? profile.birthDate.split("-").reverse().join("/") : profile.birthDate) : "-";
  doc.text(`Nascimento: ${formattedBirth} | Localização: ${profile.city || "-"} (${profile.state || "-"}) | Estado Civil: ${profile.maritalStatus || "-"}`, margin + 5, y + 24.5);
  doc.text(`Consultor Especialista LFT: ${profile.brokerName || "Lucas Teixeira"}`, margin + 5, y + 29);

  y += 38;

  // Seção 1: Diagnóstico Financeiro
  drawSectionTitle("1. DIAGNÓSTICO FINANCEIRO & COMPROMISSOS", y, "Estrutura de renda, despesas recorrentes e reservas");
  y += 17;

  const finItems = [
    { label: "Despesas Mensais da Família", val: profile.monthlyExpenses ? `R$ ${Number(profile.monthlyExpenses).toLocaleString("pt-BR")}` : "R$ 0" },
    { label: "Pró-labore / Renda Declarada", val: profile.proLabore ? `R$ ${Number(profile.proLabore).toLocaleString("pt-BR")}` : "R$ 0" },
    { label: "Fundo Acadêmico / Educação Futura", val: profile.futureEducationExpenses ? `R$ ${Number(profile.futureEducationExpenses).toLocaleString("pt-BR")}` : "R$ 0" },
    { label: "Previdência Privada Acumulada", val: profile.pensionPrivate ? `R$ ${Number(profile.pensionPrivate).toLocaleString("pt-BR")}` : "R$ 0" },
    { label: "Teto INSS ou Previdência Pública", val: profile.inss ? `R$ ${Number(profile.inss).toLocaleString("pt-BR")}` : "R$ 0" },
    { label: "Instituições & Bancos", val: profile.cardsAndBanks || "Não informado" },
  ];

  let finY = y;
  finItems.forEach((item, index) => {
    const isRight = index % 2 === 1;
    const currentX = isRight ? margin + contentWidth / 2 + 2 : margin;
    const currentY = finY;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(currentX, currentY, contentWidth / 2 - 2, 12, 1, 1, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(currentX, currentY, contentWidth / 2 - 2, 12, 1, 1, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, currentX + 3, currentY + 4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(10, 24, 47);
    doc.text(String(item.val), currentX + 3, currentY + 9.5);

    if (isRight) {
      finY += 14;
    }
  });

  y = finY + 6;

  // Seção 2: Estrutura Familiar
  drawSectionTitle("2. ESTRUTURA FAMILIAR & DEPENDENTES", y);
  y += 11;

  if (profile.dependents && profile.dependents.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(10, 24, 47);
    doc.text("NOME DO DEPENDENTE", margin + 4, y + 4.2);
    doc.text("IDADE", margin + 95, y + 4.2);
    doc.text("PARENTESCO", margin + 135, y + 4.2);
    y += 6.5;

    profile.dependents.forEach((dep) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, y, contentWidth, 5.5, "F");
      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y + 5.5, margin + contentWidth, y + 5.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(dep.name, margin + 4, y + 3.8);
      doc.text(`${dep.age} anos`, margin + 95, y + 3.8);
      doc.text(dep.relationship, margin + 135, y + 3.8);
      y += 6;
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Nenhum dependente cadastrado.", margin + 4, y + 4.5);
    y += 7;
  }

  y += 5;

  // Seção 3: Coberturas Ativas
  drawSectionTitle("3. COBERTURAS E APÓLICES ATIVAS", y);
  y += 11;

  if (profile.activeInsurances && profile.activeInsurances.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(10, 24, 47);
    doc.text("SEGURADORA", margin + 4, y + 4.2);
    doc.text("CAPITAL SEGURADO", margin + 80, y + 4.2);
    doc.text("CONTRIBUIÇÃO", margin + 135, y + 4.2);
    y += 6.5;

    profile.activeInsurances.forEach((ins) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, y, contentWidth, 5.5, "F");
      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y + 5.5, margin + contentWidth, y + 5.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(ins.insurer, margin + 4, y + 3.8);
      doc.text(`R$ ${Number(ins.insuredCapital || 0).toLocaleString("pt-BR")}`, margin + 80, y + 3.8);
      doc.text(`R$ ${Number(ins.monthlyContribution || 0).toLocaleString("pt-BR")}/mês`, margin + 135, y + 3.8);
      y += 6;
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Sem apólices ativas cadastradas.", margin + 4, y + 4.5);
    y += 7;
  }

  applyFooter(1, 2);

  // ==========================================================================
  // PÁGINA 2: HISTÓRICO DE SAÚDE, LOUSA DIGITAL E INDICAÇÕES
  // ==========================================================================
  doc.addPage();
  applyHeaderBackground(2);

  y = 39;

  // Seção 4: Perfil de Saúde & Histórico Familiar
  drawSectionTitle("4. PERFIL DE SAÚDE, HISTÓRICO FAMILIAR & SUBSCRIÇÃO", y);
  y += 11;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 34, 1.5, 1.5, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 1.5, 1.5, "S");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  const imcVal = profile.imc || (profile.weight && profile.height ? (Number(profile.weight) / Math.pow(Number(profile.height) / 100, 2)).toFixed(1) : "-");
  doc.text(`Peso: ${profile.weight || "-"} kg  |  Altura: ${profile.height || "-"} cm  |  IMC: ${imcVal} kg/m²  |  Fumante: ${profile.isSmoker || "Não"}`, margin + 4, y + 5.5);
  doc.text(`Problema de Saúde: ${profile.hasHealthIssues || "Nenhum histórico reportado"}`, margin + 4, y + 11);
  doc.text(`Uso de Medicamentos: ${profile.usesMedications || "Não"}`, margin + 4, y + 16.5);
  doc.text(`Estilo de Vida / Esportes de Risco: ${profile.riskSportsOrHobbies || "Nenhum esporte de risco"}`, margin + 4, y + 22);
  doc.text(`Pai e Mãe Vivos: ${profile.parentsAlive || "Sim"}  |  Saúde dos Pais: ${profile.parentsHealthIssues || "Sem histórico relevante"}`, margin + 4, y + 27.5);

  y += 39;

  // Seção 5: Lousa Interativa
  drawSectionTitle("5. MEMÓRIA DE CÁLCULO E LOUSA INTERATIVA", y, "Diagramas, curvas e estratégias traçadas durante a reunião");
  y += 16;

  const canvasBoxHeight = 85;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, canvasBoxHeight, 2, 2, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, canvasBoxHeight, 2, 2, "S");

  if (profile.canvasDrawingData) {
    try {
      doc.addImage(profile.canvasDrawingData, "PNG", margin + 2, y + 2, contentWidth - 4, canvasBoxHeight - 4);
    } catch {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text("Registro gráfico gravado na sessão digital.", margin + 10, y + 42);
    }
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Nenhum diagrama desenhado na lousa digital durante a sessão.", margin + 10, y + 42);
  }

  y += canvasBoxHeight + 8;

  // Seção 6: Recomendações
  drawSectionTitle("6. CÍRCULO DE CONFIANÇA & RECOMENDAÇÕES", y);
  y += 11;

  if (profile.recommendations && profile.recommendations.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 5.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(10, 24, 47);
    doc.text("NOME", margin + 4, y + 3.8);
    doc.text("FILHOS / IDADE", margin + 70, y + 3.8);
    doc.text("PROFISSÃO", margin + 115, y + 3.8);
    doc.text("TELEFONE", margin + 150, y + 3.8);
    y += 6;

    profile.recommendations.forEach((rec) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, y, contentWidth, 5, "F");
      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y + 5, margin + contentWidth, y + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      doc.text(rec.name, margin + 4, y + 3.5);
      doc.text(`${rec.children || "-"} (${rec.age || "-"}a)`, margin + 70, y + 3.5);
      doc.text(rec.profession || "-", margin + 115, y + 3.5);
      doc.text(rec.phone || "-", margin + 150, y + 3.5);
      y += 5.5;
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Sem recomendações adicionadas.", margin + 4, y + 4);
  }

  applyFooter(2, 2);

  return doc;
}

/**
 * Dispara o download automático do Dossiê em PDF no navegador
 */
export async function downloadExecutiveDossierPDF(profile: ClientProfile): Promise<boolean> {
  try {
    const doc = await generateExecutiveDossierPDF(profile);
    const safeName = (profile.name || "Cliente").replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`LFT_Dossie_Executivo_${safeName}.pdf`);
    return true;
  } catch (err) {
    console.error("Erro ao gerar PDF:", err);
    return false;
  }
}
