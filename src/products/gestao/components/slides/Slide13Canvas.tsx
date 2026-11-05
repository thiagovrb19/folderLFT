"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { MetalButton } from "@/components/ui/MetalButton";
import {
  PenTool,
  Eraser,
  Trash2,
  Check,
  Undo2,
  Redo2,
  Highlighter,
  LineChart,
  Sparkles,
  MoveRight,
  Square,
  Circle,
  Grid,
  FileText,
  Download,
  ArrowRight,
  Tag,
  Flame,
  User,
  Heart,
  Users,
  Briefcase,
  Percent,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sparkle,
} from "lucide-react";

type ToolType =
  | "pen"
  | "highlighter"
  | "calligraphy"
  | "glow"
  | "arrow"
  | "line"
  | "rect"
  | "circle"
  | "stamp-shield"
  | "stamp-gap"
  | "stamp-target"
  | "stamp-growth"
  | "eraser";

type TemplateType = "chart" | "grid" | "blank";

export const Slide13Canvas: React.FC = () => {
  const { canvasImage, setCanvasImage, nextSlide, client, updateClient } =
    usePresentationStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isVictorSantos = client.brokerName === "Victor Santos";

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<ToolType>("pen");
  const [color, setColor] = useState<string>("#0072D5");
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [template, setTemplate] = useState<TemplateType>("chart");
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [savedNotification, setSavedNotification] = useState(false);

  // Victor Santos Exclusive Didactic Controls & Toolbar visibility
  const [isToolsVisible, setIsToolsVisible] = useState(true);

  // Didactic Fields for Victor Santos
  const [idade, setIdade] = useState<string>(
    client.clientAge ? String(client.clientAge) : ""
  );
  const [estadoCivil, setEstadoCivil] = useState<string>(
    client.maritalStatus || ""
  );
  const [dependentes, setDependentes] = useState<string>(
    client.clientDependentsSummary ||
      (client.dependents && client.dependents.length > 0
        ? `${client.dependents.length} dependente(s)`
        : "")
  );
  const [profissao, setProfissao] = useState<string>(client.profession || "");
  const [pctDespesas, setPctDespesas] = useState<string>(
    client.expensePercentage ? String(client.expensePercentage) : "70%"
  );

  const handleIdadeChange = (val: string) => {
    setIdade(val);
    updateClient({ clientAge: val });
  };

  const handleEstadoCivilChange = (val: string) => {
    setEstadoCivil(val);
    updateClient({ maritalStatus: val as typeof client.maritalStatus });
  };

  const handleDependentesChange = (val: string) => {
    setDependentes(val);
    updateClient({ clientDependentsSummary: val });
  };

  const handleProfissaoChange = (val: string) => {
    setProfissao(val);
    updateClient({ profession: val });
  };

  const handlePctDespesasChange = (val: string) => {
    setPctDespesas(val);
    updateClient({ expensePercentage: val });
  };

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const previewSnapshotRef = useRef<ImageData | null>(null);

  const colors = [
    { name: "Azul LFT", value: "#0072D5" },
    { name: "Navy Escuro", value: "#0A182F" },
    { name: "Verde Esmeralda", value: "#059669" },
    { name: "Dourado / Ouro", value: "#D97706" },
    { name: "Vermelho Alerta", value: "#DC2626" },
    { name: "Roxo Estratégia", value: "#7C3AED" },
    { name: "Ciano Destaque", value: "#0284C7" },
    { name: "Grafite Neutro", value: "#475569" },
  ];

  const pushState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imgData);
    if (newHistory.length > 30) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setCanvasImage(canvas.toDataURL("image/png"));
  }, [history, historyIndex, setCanvasImage]);

  // Draw Templates - Graph without the diagonal line
  const drawTemplate = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      templ: TemplateType
    ) => {
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      if (templ === "grid") {
        ctx.strokeStyle = "rgba(0, 114, 213, 0.07)";
        ctx.lineWidth = 1;
        const step = 25;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (templ === "chart") {
        const paddingLeft = 70;
        const paddingRight = 40;
        const paddingTop = 40;
        const paddingBottom = 50;

        const chartWidth = width - paddingLeft - paddingRight;
        const chartHeight = height - paddingTop - paddingBottom;
        const originX = paddingLeft;
        const originY = height - paddingBottom;

        // Subtle horizontal guide lines
        ctx.strokeStyle = "rgba(0, 114, 213, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        const gridSteps = 4;
        for (let i = 1; i <= gridSteps; i++) {
          const y = originY - (chartHeight / gridSteps) * i;
          ctx.beginPath();
          ctx.moveTo(originX, y);
          ctx.lineTo(originX + chartWidth, y);
          ctx.stroke();
        }

        // Axes (X and Y)
        ctx.strokeStyle = "#0072D5";
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y Axis
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX, paddingTop - 10);
        // Arrow Y
        ctx.lineTo(originX - 4, paddingTop);
        ctx.moveTo(originX, paddingTop - 10);
        ctx.lineTo(originX + 4, paddingTop);

        // X Axis
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX + chartWidth + 10, originY);
        // Arrow X
        ctx.lineTo(originX + chartWidth, originY - 4);
        ctx.moveTo(originX + chartWidth + 10, originY);
        ctx.lineTo(originX + chartWidth, originY + 4);
        ctx.stroke();

        // Labels & Milestones on X Axis (Linha do Tempo)
        ctx.font = "bold 11px sans-serif";
        ctx.fillStyle = "#0072D5";
        ctx.textAlign = "left";
        ctx.fillText("Patrimônio & Renda (R$)", originX - 45, paddingTop - 18);

        ctx.textAlign = "right";
        ctx.fillText(
          "Linha do Tempo / Fases da Vida (Anos) →",
          originX + chartWidth,
          originY + 38
        );

        // X Axis Stages
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#475569";
        ctx.textAlign = "center";

        const stages = [
          { label: "Início de Carreira", x: originX + chartWidth * 0.1 },
          { label: "Pico de Renda & Família", x: originX + chartWidth * 0.38 },
          { label: "Consolidação Patrimonial", x: originX + chartWidth * 0.68 },
          { label: "Aposentadoria & Sucessão", x: originX + chartWidth * 0.92 },
        ];

        stages.forEach((stg) => {
          ctx.fillText(stg.label, stg.x, originY + 18);
          // Tick
          ctx.beginPath();
          ctx.moveTo(stg.x, originY - 3);
          ctx.lineTo(stg.x, originY + 3);
          ctx.strokeStyle = "#0072D5";
          ctx.stroke();
        });

        // Y Axis values
        ctx.textAlign = "right";
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText("R$ 0", originX - 8, originY + 3);
        ctx.fillText("R$ 1 Mi", originX - 8, originY - chartHeight * 0.33 + 3);
        ctx.fillText("R$ 3 Mi", originX - 8, originY - chartHeight * 0.66 + 3);
        ctx.fillText("R$ 5 Mi+", originX - 8, originY - chartHeight + 3);

        // The diagonal line was removed per request to keep the board clean
      }
      ctx.restore();
    },
    []
  );

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    drawTemplate(ctx, rect.width, rect.height, template);

    if (canvasImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([imgData]);
        setHistoryIndex(0);
      };
      img.src = canvasImage;
    } else {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([imgData]);
      setHistoryIndex(0);
    }
  }, [template, drawTemplate]);

  // Keyboard Shortcuts (Undo / Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Stamp Drawer Helper
  const drawStamp = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    stampType: string
  ) => {
    ctx.save();
    ctx.shadowBlur = 0;
    let badgeText = "";
    let badgeColor = "#0072D5";

    switch (stampType) {
      case "stamp-shield":
        badgeText = "🛡️ BLINDAGEM PATRIMONIAL";
        badgeColor = "#0072D5";
        break;
      case "stamp-gap":
        badgeText = "⚠️ GAP DE COBERTURA";
        badgeColor = "#DC2626";
        break;
      case "stamp-target":
        badgeText = "🎯 META DE CAPITAL";
        badgeColor = "#D97706";
        break;
      case "stamp-growth":
        badgeText = "📈 APORTE & CRESCIMENTO";
        badgeColor = "#059669";
        break;
      default:
        badgeText = "LFT GESTÃO";
        badgeColor = "#0072D5";
    }

    ctx.font = "bold 11px sans-serif";
    const textWidth = ctx.measureText(badgeText).width;
    const badgeW = textWidth + 16;
    const badgeH = 24;

    // Badge Background
    ctx.fillStyle = badgeColor;
    ctx.beginPath();
    ctx.roundRect(x - badgeW / 2, y - badgeH / 2, badgeW, badgeH, 6);
    ctx.fill();

    // Badge Text
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, x, y);
    ctx.restore();
  };

  // Arrow Drawer Helper
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    strokeColor: string,
    width: number
  ) => {
    const headLen = Math.max(10, width * 3.5);
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    // Main line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLen * Math.cos(angle - Math.PI / 6),
      toY - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLen * Math.cos(angle + Math.PI / 6),
      toY - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    startPosRef.current = { x, y };

    // Handle Quick Stamp Tools on click
    if (tool.startsWith("stamp-")) {
      drawStamp(ctx, x, y, tool);
      pushState();
      return;
    }

    // Capture snapshot for shape previews (arrow, line, rect, circle)
    previewSnapshotRef.current = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = lineWidth * 6;
      ctx.shadowBlur = 0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else if (tool === "highlighter") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color + "40";
      ctx.lineWidth = lineWidth * 4;
      ctx.shadowBlur = 0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else if (tool === "calligraphy") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 2.5;
      ctx.shadowBlur = 0;
      ctx.lineCap = "square";
      ctx.lineJoin = "bevel";
    } else if (tool === "glow") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else {
      // Regular pen
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowBlur = 0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    const start = startPosRef.current;

    // Geometric Shapes with live preview
    if (
      tool === "line" ||
      tool === "arrow" ||
      tool === "rect" ||
      tool === "circle"
    ) {
      if (!start || !previewSnapshotRef.current) return;
      // Restore pre-drag state
      ctx.putImageData(previewSnapshotRef.current, 0, 0);

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "arrow") {
        drawArrow(ctx, start.x, start.y, x, y, color, lineWidth);
      } else if (tool === "rect") {
        ctx.strokeRect(start.x, start.y, x - start.x, y - start.y);
      } else if (tool === "circle") {
        const radiusX = Math.abs(x - start.x) / 2;
        const radiusY = Math.abs(y - start.y) / 2;
        const centerX = Math.min(start.x, x) + radiusX;
        const centerY = Math.min(start.y, y) + radiusY;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      return;
    }

    // Freehand drawing
    if (tool === "calligraphy") {
      ctx.save();
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      startPosRef.current = null;
      previewSnapshotRef.current = null;
      pushState();
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    drawTemplate(ctx, rect.width, rect.height, template);
    pushState();
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prevIndex = historyIndex - 1;
      ctx.putImageData(history[prevIndex], 0, 0);
      setHistoryIndex(prevIndex);
      setCanvasImage(canvas.toDataURL("image/png"));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const nextIndex = historyIndex + 1;
      ctx.putImageData(history[nextIndex], 0, 0);
      setHistoryIndex(nextIndex);
      setCanvasImage(canvas.toDataURL("image/png"));
    }
  };

  const handleSaveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasImage(canvas.toDataURL("image/png"));
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleSaveAndAdvance = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCanvasImage(canvas.toDataURL("image/png"));
    }
    nextSlide();
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "LFT_Lousa_Grafico_Planejamento.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Render Tool Palette
  const renderToolsContent = () => (
    <>
      {/* Brush & Shape Tools */}
      <div className="flex flex-wrap items-center gap-1">
        {/* Caneta */}
        <button
          onClick={() => setTool("pen")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "pen"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Caneta Padrão"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Caneta</span>
        </button>

        {/* Marca-Texto */}
        <button
          onClick={() => setTool("highlighter")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "highlighter"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Marca-Texto Translúcido"
        >
          <Highlighter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Marca-texto</span>
        </button>

        {/* Pincel Caligráfico */}
        <button
          onClick={() => setTool("calligraphy")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "calligraphy"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Pincel Caligráfico"
        >
          <Flame className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Caligráfico</span>
        </button>

        {/* Pincel Laser / Glow */}
        <button
          onClick={() => setTool("glow")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "glow"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Pincel Laser Neon / Glow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Glow</span>
        </button>

        {/* Seta de Tendência */}
        <button
          onClick={() => setTool("arrow")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "arrow"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Seta Direcional / Curva de Projeção"
        >
          <MoveRight className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Seta</span>
        </button>

        {/* Retângulo */}
        <button
          onClick={() => setTool("rect")}
          className={`p-1.5 rounded-xl text-xs font-semibold flex items-center transition-all ${
            tool === "rect"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Retângulo de Destaque"
        >
          <Square className="w-3.5 h-3.5" />
        </button>

        {/* Círculo */}
        <button
          onClick={() => setTool("circle")}
          className={`p-1.5 rounded-xl text-xs font-semibold flex items-center transition-all ${
            tool === "circle"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Círculo de Destaque"
        >
          <Circle className="w-3.5 h-3.5" />
        </button>

        {/* Selos / Quick Stamps */}
        <div className="relative group">
          <button
            className={`px-2 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-200 transition-all ${
              tool.startsWith("stamp-")
                ? "bg-primary text-white font-bold"
                : "text-slate-700 bg-slate-50 hover:bg-slate-100"
            }`}
            title="Carimbos e Selos de Consultoria"
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Selos</span>
          </button>
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col bg-white border border-slate-200 p-1.5 rounded-xl shadow-xl z-50 w-48 space-y-1">
            <button
              onClick={() => setTool("stamp-shield")}
              className="text-left px-2.5 py-1.5 text-xs hover:bg-slate-100 rounded-lg font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <span>🛡️</span> Blindagem
            </button>
            <button
              onClick={() => setTool("stamp-gap")}
              className="text-left px-2.5 py-1.5 text-xs hover:bg-slate-100 rounded-lg font-semibold text-red-600 flex items-center gap-1.5"
            >
              <span>⚠️</span> Gap de Risco
            </button>
            <button
              onClick={() => setTool("stamp-target")}
              className="text-left px-2.5 py-1.5 text-xs hover:bg-slate-100 rounded-lg font-semibold text-amber-600 flex items-center gap-1.5"
            >
              <span>🎯</span> Meta Capital
            </button>
            <button
              onClick={() => setTool("stamp-growth")}
              className="text-left px-2.5 py-1.5 text-xs hover:bg-slate-100 rounded-lg font-semibold text-emerald-600 flex items-center gap-1.5"
            >
              <span>📈</span> Aporte
            </button>
          </div>
        </div>

        {/* Borracha */}
        <button
          onClick={() => setTool("eraser")}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            tool === "eraser"
              ? "bg-primary text-white font-bold shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Borracha"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Borracha</span>
        </button>
      </div>

      {/* Color Palette */}
      <div className="flex items-center gap-1.5">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => {
              setColor(c.value);
              if (tool === "eraser") setTool("pen");
            }}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform border border-slate-300 shadow-xs ${
              color === c.value && tool !== "eraser"
                ? "scale-125 ring-2 ring-primary ring-offset-1"
                : "hover:scale-110"
            }`}
            style={{ backgroundColor: c.value }}
            title={c.name}
          />
        ))}
      </div>

      {/* Stroke Thickness */}
      <div className="flex items-center gap-1">
        {[2, 4, 8, 14].map((size) => (
          <button
            key={size}
            onClick={() => setLineWidth(size)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
              lineWidth === size
                ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                : "text-slate-400 hover:bg-slate-100"
            }`}
            title={`Espessura ${size}px`}
          >
            <span
              className="rounded-full bg-current"
              style={{
                width: `${Math.min(10, size)}px`,
                height: `${Math.min(10, size)}px`,
              }}
            />
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 sm:p-4 pt-2 sm:pt-3 pb-20 overflow-hidden max-w-6xl mx-auto">
      {/* Top Header & Template Selection */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 mb-1.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <LineChart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-sora text-accent flex items-center gap-2">
              Lousa & Gráfico de Planejamento Financeiro
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                Modo Interativo
              </span>
              {isVictorSantos && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Exclusivo Victor Santos
                </span>
              )}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Estruture o diagnóstico financeiro e patrimonial do cliente no gráfico.
            </p>
          </div>
        </div>

        {/* Template Switching + Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Template Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setTemplate("chart")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                template === "chart"
                  ? "bg-white text-primary font-bold shadow-xs border border-primary/20"
                  : "text-slate-600 hover:text-accent"
              }`}
              title="Gráfico Financeiro X/Y"
            >
              <LineChart className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Gráfico X/Y</span>
            </button>
            <button
              onClick={() => setTemplate("grid")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                template === "grid"
                  ? "bg-white text-primary font-bold shadow-xs border border-primary/20"
                  : "text-slate-600 hover:text-accent"
              }`}
              title="Grade Milimetrada"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Grade</span>
            </button>
            <button
              onClick={() => setTemplate("blank")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                template === "blank"
                  ? "bg-white text-primary font-bold shadow-xs border border-primary/20"
                  : "text-slate-600 hover:text-accent"
              }`}
              title="Lousa Branca Limpa"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Limpa</span>
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                historyIndex > 0
                  ? "text-slate-700 hover:bg-white"
                  : "text-slate-300 cursor-not-allowed"
              }`}
              title="Desfazer (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                historyIndex < history.length - 1
                  ? "text-slate-700 hover:bg-white"
                  : "text-slate-300 cursor-not-allowed"
              }`}
              title="Refazer (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick PNG download */}
          <button
            onClick={handleDownloadPNG}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs transition-colors"
            title="Baixar imagem PNG da lousa"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VICTOR SANTOS EXCLUSIVE DIDACTIC FIELDS BAR */}
      {isVictorSantos && (
        <div className="mb-2 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50/90 to-blue-50/90 border border-primary/25 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 px-1">
            <span className="text-[11px] font-bold text-accent flex items-center gap-1">
              <Sparkle className="w-3 h-3 text-primary animate-pulse" />
              Campos Didáticos do Cliente (Apresentação Victor Santos):
            </span>
            <button
              type="button"
              onClick={() => setIsToolsVisible(!isToolsVisible)}
              className="text-[11px] font-semibold text-primary hover:text-primary-hover flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-primary/20 shadow-xs transition-all cursor-pointer"
            >
              {isToolsVisible ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ocultar Ferramentas</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Mostrar Ferramentas</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {/* 1. Idade */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 px-2.5 shadow-2xs flex flex-col justify-center">
              <label className="text-[9px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <User className="w-2.5 h-2.5 text-primary" />
                Idade
              </label>
              <input
                type="text"
                placeholder="Ex: 38 anos"
                value={idade}
                onChange={(e) => handleIdadeChange(e.target.value)}
                className="w-full text-xs font-bold text-accent bg-transparent border-0 p-0 focus:outline-none focus:ring-0 placeholder:font-normal placeholder-slate-400"
              />
            </div>

            {/* 2. Estado Civil */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 px-2.5 shadow-2xs flex flex-col justify-center">
              <label className="text-[9px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 text-primary" />
                Estado Civil
              </label>
              <select
                value={estadoCivil}
                onChange={(e) => handleEstadoCivilChange(e.target.value)}
                className="w-full text-xs font-bold text-accent bg-transparent border-0 p-0 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <option value="">Selecione...</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="União Estável">União Estável</option>
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viúvo(a)">Viúvo(a)</option>
              </select>
            </div>

            {/* 3. Dependentes */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 px-2.5 shadow-2xs flex flex-col justify-center">
              <label className="text-[9px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Users className="w-2.5 h-2.5 text-primary" />
                Dependentes
              </label>
              <input
                type="text"
                placeholder="Ex: 2 filhos (4 e 8)"
                value={dependentes}
                onChange={(e) => handleDependentesChange(e.target.value)}
                className="w-full text-xs font-bold text-accent bg-transparent border-0 p-0 focus:outline-none focus:ring-0 placeholder:font-normal placeholder-slate-400"
              />
            </div>

            {/* 4. Profissão */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 px-2.5 shadow-2xs flex flex-col justify-center">
              <label className="text-[9px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Briefcase className="w-2.5 h-2.5 text-primary" />
                Profissão
              </label>
              <input
                type="text"
                placeholder="Ex: Médico Cirurgião"
                value={profissao}
                onChange={(e) => handleProfissaoChange(e.target.value)}
                className="w-full text-xs font-bold text-accent bg-transparent border-0 p-0 focus:outline-none focus:ring-0 placeholder:font-normal placeholder-slate-400"
              />
            </div>

            {/* 5. % das Despesas */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 px-2.5 shadow-2xs flex flex-col justify-center col-span-2 sm:col-span-1">
              <label className="text-[9px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Percent className="w-2.5 h-2.5 text-primary" />
                % das Despesas
              </label>
              <input
                type="text"
                placeholder="Ex: 75% da renda"
                value={pctDespesas}
                onChange={(e) => handlePctDespesasChange(e.target.value)}
                className="w-full text-xs font-bold text-accent bg-transparent border-0 p-0 focus:outline-none focus:ring-0 placeholder:font-normal placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* VICTOR SANTOS: TOOLBAR ABOVE GRAPH (WITH HIDE OPTION) */}
      {isVictorSantos && isToolsVisible && (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-sm border border-slate-200 p-2 sm:p-2.5 rounded-2xl shadow-sm transition-all animate-in fade-in duration-200">
          {renderToolsContent()}
        </div>
      )}

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 w-full relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg"
        style={{ touchAction: "none", minHeight: isVictorSantos ? "300px" : "340px" }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair block select-none"
        />

        {savedNotification && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-xl animate-bounce">
            <Check className="w-4 h-4" /> Salvo no Dossiê com sucesso!
          </div>
        )}
      </div>

      {/* BOTTOM AREA */}
      {isVictorSantos ? (
        /* Victor Santos Bottom Bar: Clean & Minimal */
        <div className="mt-2 flex items-center justify-between gap-2 bg-white/90 backdrop-blur-sm border border-slate-200 p-2 sm:p-2.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            {!isToolsVisible && (
              <button
                onClick={() => setIsToolsVisible(true)}
                className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold flex items-center gap-1.5 border border-primary/20 transition-all cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Mostrar Ferramentas da Caneta</span>
              </button>
            )}
            <button
              onClick={handleClear}
              className="p-2 text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
              title="Limpar toda a lousa"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSnapshot}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Salvar no PDF</span>
            </button>

            <MetalButton
              onClick={handleSaveAndAdvance}
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 text-white" />}
            >
              Avançar
            </MetalButton>
          </div>
        </div>
      ) : (
        /* Standard Bottom Toolbar for Other Brokers */
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-sm border border-slate-200 p-2 sm:p-2.5 rounded-2xl shadow-md">
          {renderToolsContent()}

          {/* Clear, Save, and Advance Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleClear}
              className="p-2 text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
              title="Limpar toda a lousa"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Limpar</span>
            </button>

            <button
              onClick={handleSaveSnapshot}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Salvar no PDF</span>
            </button>

            <MetalButton
              onClick={handleSaveAndAdvance}
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 text-white" />}
            >
              Avançar
            </MetalButton>
          </div>
        </div>
      )}
    </div>
  );
};
