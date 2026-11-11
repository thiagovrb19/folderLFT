import { jsPDF } from "jspdf";
import { ClientProfile } from "@/products/gestao/types/presentation";

/**
 * Gera o Dossiê Executivo de Planejamento Patrimonial em PDF
 * com a identidade visual oficial da LFT Gestão de Risco.
 *
 * Paginação dinâmica: o conteúdo quebra para uma nova página somente quando
 * falta espaço, e cabeçalho/rodapé são aplicados uma única vez por página ao
 * final, já com o total real de páginas (evita páginas duplicadas/numeração errada).
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

  const getLogoBase64 = async (): Promise<string | null> => {
    try {
      const response = await fetch("/assets/logos/logo-lft-azul.png");
      if (!response.ok) return null;
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

  const drawHeader = (pageNumber: number, totalPages: number) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, 32, "F");
    doc.setFillColor(0, 114, 213);
    doc.rect(0, 32, pageWidth, 1.2, "F");

    let logoDrawn = false;
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", margin, 6, 42, 20);
        logoDrawn = true;
      } catch {
        logoDrawn = false;
      }
    }
    if (!logoDrawn) {
      doc.setTextColor(0, 114, 213);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("LFT GESTÃO", margin, 18);
    }

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 24, 47);
    doc.text("DOSSIÊ DE PLANEJAMENTO & GESTÃO DE RISCO", pageWidth - margin, 15, { align: "right" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 114, 213);
    doc.text(`DOCUMENTO EXECUTIVO CONFIDENCIAL | PÁGINA ${pageNumber} DE ${totalPages}`, pageWidth - margin, 21, { align: "right" });
  };

  const drawFooter = (pageNumber: number, totalPages: number) => {
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
    const h = subtitle ? 13 : 8;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, yPos, contentWidth, h, 1.5, 1.5, "F");
    doc.setFillColor(0, 114, 213);
    doc.rect(margin, yPos, 2.5, h, "F");

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

  // Área útil entre cabeçalho e rodapé
  const contentTop = 39;
  const contentBottom = pageHeight - 16;
  let y = contentTop;

  /** Garante espaço vertical; se faltar, cria UMA nova página e reinicia o cursor. */
  const ensureSpace = (needed: number) => {
    if (y + needed > contentBottom) {
      doc.addPage();
      y = contentTop;
    }
  };

  /** Campo aberto: número puro vira moeda; texto digitado é mantido como está. */
  const money = (v: unknown): string => {
    if (v === undefined || v === null || String(v).trim() === "") return "Não informado";
    const raw = String(v).trim();
    if (/^\d+([.,]\d+)?$/.test(raw)) {
      return `R$ ${Number(raw.replace(",", ".")).toLocaleString("pt-BR")}`;
    }
    return raw;
  };

  // ==========================================================================
  // Card do Proponente
  // ==========================================================================
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
  doc.text(`Profissão: ${profile.profession || "Não informada"}${profile.company ? ` | Empresa: ${profile.company}` : ""}`, margin + 5, y + 13.5);
  doc.text(`E-mail: ${profile.email || "-"} | Tel: ${profile.phone || "-"}${profile.instagram ? ` | Insta: ${profile.instagram}` : ""}`, margin + 5, y + 19);
  const formattedBirth = profile.birthDate ? (profile.birthDate.includes("-") ? profile.birthDate.split("-").reverse().join("/") : profile.birthDate) : "-";
  doc.text(`Nascimento: ${formattedBirth} | Localização: ${profile.city || "-"} (${profile.state || "-"}) | Estado Civil: ${profile.maritalStatus || "-"}`, margin + 5, y + 24.5);
  doc.text(`Consultor Especialista LFT: ${profile.brokerName || "Lucas Teixeira"}`, margin + 5, y + 29);

  y += 38;

  // ==========================================================================
  // 1. FINANÇAS
  // ==========================================================================
  ensureSpace(40);
  drawSectionTitle("1. FINANÇAS", y, "Renda, despesas, INSS / pró-labore, educação dos filhos, previdência e cartão");
  y += 17;

  const finItems = [
    { label: "Renda mensal", val: money(profile.monthlyIncome) },
    { label: "Despesas", val: money(profile.monthlyExpenses) },
    { label: "INSS / Pró-labore", val: money(profile.inss || profile.proLabore) },
    { label: "Educação dos filhos", val: money(profile.futureEducationExpenses) },
    { label: "Previdência", val: money(profile.pensionPrivate) },
    { label: "Bandeira do cartão", val: profile.cardsAndBanks?.trim() || "Não informado" },
  ];

  const colW = contentWidth / 2 - 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  for (let i = 0; i < finItems.length; i += 2) {
    const pair = finItems.slice(i, i + 2);
    const wrapped = pair.map((it) => doc.splitTextToSize(it.val, colW - 6) as string[]);
    const rowH = 9 + Math.max(...wrapped.map((w) => w.length)) * 4;
    ensureSpace(rowH + 2);

    pair.forEach((item, idx) => {
      const x = idx === 0 ? margin : margin + contentWidth / 2 + 2;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, colW, rowH, 1, 1, "F");
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, y, colW, rowH, 1, 1, "S");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(item.label, x + 3, y + 4);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(10, 24, 47);
      doc.text(wrapped[idx], x + 3, y + 9);
    });
    y += rowH + 2;
  }

  y += 4;

  // ==========================================================================
  // 2. ESTRUTURA FAMILIAR
  // ==========================================================================
  ensureSpace(30);
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
      ensureSpace(6.5);
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

  // ==========================================================================
  // 3. SAÚDE
  // ==========================================================================
  const imcVal =
    profile.imc ||
    (profile.weight && profile.height
      ? (Number(profile.weight) / Math.pow(Number(profile.height) / 100, 2)).toFixed(1)
      : "-");
  const healthLines: string[] = [
    `Peso: ${profile.weight || "-"} kg  |  Altura: ${profile.height || "-"} cm  |  IMC: ${imcVal} kg/m²  |  Fumante: ${profile.isSmoker || "Não"}`,
    `Problema de Saúde: ${profile.hasHealthIssues || "Nenhum histórico reportado"}`,
    `Uso de Medicamentos: ${profile.usesMedications || "Não"}`,
    `Estilo de Vida / Esportes de Risco: ${profile.riskSportsOrHobbies || "Nenhum esporte de risco"}`,
    `Pai e Mãe Vivos: ${profile.parentsAlive || "Sim"}  |  Saúde dos Pais: ${profile.parentsHealthIssues || "Sem histórico relevante"}`,
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const healthWrapped = healthLines.flatMap((l) => doc.splitTextToSize(l, contentWidth - 8) as string[]);
  const healthH = healthWrapped.length * 4.4 + 5;

  ensureSpace(11 + healthH);
  drawSectionTitle("3. PERFIL DE SAÚDE, HISTÓRICO FAMILIAR & SUBSCRIÇÃO", y);
  y += 11;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, healthH, 1.5, 1.5, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, healthH, 1.5, 1.5, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(healthWrapped, margin + 4, y + 5.5);
  y += healthH + 5;

  // ==========================================================================
  // 4. LOUSA INTERATIVA (mantém a proporção original do desenho)
  // ==========================================================================
  let imgW = contentWidth - 4;
  let imgH = 80;
  if (profile.canvasDrawingData) {
    try {
      const props = doc.getImageProperties(profile.canvasDrawingData);
      imgH = (imgW * props.height) / props.width;
      const maxH = contentBottom - contentTop - 30;
      if (imgH > maxH) {
        imgH = maxH;
        imgW = (imgH * props.width) / props.height;
      }
    } catch {
      /* mantém dimensões padrão */
    }
  }
  const canvasBoxHeight = imgH + 4;

  ensureSpace(16 + canvasBoxHeight);
  drawSectionTitle("4. MEMÓRIA DE CÁLCULO E LOUSA INTERATIVA", y, "Diagramas, curvas e estratégias traçadas durante a reunião");
  y += 16;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, canvasBoxHeight, 2, 2, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, canvasBoxHeight, 2, 2, "S");

  if (profile.canvasDrawingData) {
    try {
      doc.addImage(profile.canvasDrawingData, "PNG", margin + (contentWidth - imgW) / 2, y + 2, imgW, imgH);
    } catch {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text("Registro gráfico gravado na sessão digital.", margin + 10, y + canvasBoxHeight / 2);
    }
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Nenhum diagrama desenhado na lousa digital durante a sessão.", margin + 10, y + canvasBoxHeight / 2);
  }

  y += canvasBoxHeight + 8;

  // ==========================================================================
  // 5. RECOMENDAÇÕES
  // ==========================================================================
  ensureSpace(30);
  drawSectionTitle("5. CÍRCULO DE CONFIANÇA & RECOMENDAÇÕES", y);
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
      ensureSpace(5.5);
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

  // Cabeçalho e rodapé aplicados UMA vez por página, com o total real
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawHeader(p, totalPages);
    drawFooter(p, totalPages);
  }

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
