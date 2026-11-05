"use client";

import React, { useState } from "react";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { SlideId, ALL_AVAILABLE_SLIDES, getSlideConfig, DEFAULT_SLIDE_ORDER } from "@/products/gestao/lib/slideRegistry";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Briefcase,
  Building,
  Target,
  Sparkles,
  Camera,
  CheckCircle2,
  Instagram,
  Layers,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sliders,
  Check,
} from "lucide-react";
import { MetalButton } from "@/components/ui/MetalButton";

export const SetupModal: React.FC = () => {
  const {
    isSetupModalOpen,
    setSetupModalOpen,
    client,
    updateClient,
    setSlide,
    slideOrder,
    setSlideOrder,
    resetSlideOrder,
  } = usePresentationStore();

  const [activeTab, setActiveTab] = useState<"client" | "order">("client");

  const [formData, setFormData] = useState({
    name: client.name || "",
    profession: client.profession || "",
    company: client.company || "",
    instagram: client.instagram || "",
    brokerName: client.brokerName || "",
    mainGoal: client.mainGoal || "Seguro de Vida",
    clientPhotoUrl: client.clientPhotoUrl || "",
  });

  const safeSlideOrder: SlideId[] =
    slideOrder && Array.isArray(slideOrder) && slideOrder.length > 0
      ? slideOrder
      : DEFAULT_SLIDE_ORDER;

  const [localSlideOrder, setLocalSlideOrder] = useState<SlideId[]>(safeSlideOrder);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep local slide order in sync when modal opens
  React.useEffect(() => {
    if (isSetupModalOpen) {
      setLocalSlideOrder(
        slideOrder && Array.isArray(slideOrder) && slideOrder.length > 0
          ? slideOrder
          : DEFAULT_SLIDE_ORDER
      );
      setFormData({
        name: client.name || "",
        profession: client.profession || "",
        company: client.company || "",
        instagram: client.instagram || "",
        brokerName: client.brokerName || "",
        mainGoal: client.mainGoal || "Seguro de Vida",
        clientPhotoUrl: client.clientPhotoUrl || "",
      });
    }
  }, [isSetupModalOpen, slideOrder, client]);

  const moveItem = (index: number, direction: "up" | "down") => {
    const newOrder = [...localSlideOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const [item] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, item);
    setLocalSlideOrder(newOrder);
  };

  const handleResetOrder = () => {
    setLocalSlideOrder(DEFAULT_SLIDE_ORDER);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient(formData);
    setSlideOrder(localSlideOrder);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setSetupModalOpen(false);
      setSlide(1); // Go to hero slide with customized configuration
    }, 600);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({ ...prev, clientPhotoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isSetupModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Sliders className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-accent font-sora">
                  Configurações da Apresentação
                </h2>
                <p className="text-xs text-slate-500">
                  Personalize dados do cliente e a ordem exata de cada página no iPad.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSetupModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-accent hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl mb-4 border border-slate-200/80 flex-shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("client")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "client"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-slate-600 hover:text-accent"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Dados do Cliente</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "order"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-slate-600 hover:text-accent"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ordem das Páginas ({localSlideOrder.length})</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* TAB 1: CLIENT DATA */}
            {activeTab === "client" && (
              <div className="space-y-3.5">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    Nome Completo do Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Dr. Roberto Albuquerque"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                {/* Profession & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary" />
                      Profissão / Cargo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.profession}
                      onChange={(e) =>
                        setFormData({ ...formData, profession: e.target.value })
                      }
                      placeholder="Ex: Médico Cirurgião"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-primary" />
                      Empresa / Holding (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Ex: Albuquerque Participações"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Social Media Instagram (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    Instagram (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    placeholder="Ex: @cliente.oficial"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                {/* Consultant & Meeting Focus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      Consultor LFT
                    </label>
                    <select
                      value={formData.brokerName}
                      onChange={(e) =>
                        setFormData({ ...formData, brokerName: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent focus:outline-none focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="">Selecione o Consultor...</option>
                      <option value="Lucas Teixeira">Lucas Teixeira</option>
                      <option value="Victor Santos">Victor Santos</option>
                      <option value="Jefferson Coutinho">Jefferson Coutinho</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-primary" />
                      Foco da Reunião
                    </label>
                    <select
                      value={formData.mainGoal}
                      onChange={(e) =>
                        setFormData({ ...formData, mainGoal: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent focus:outline-none focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="Seguro de Vida">Seguro de Vida</option>
                    </select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-primary" />
                    Foto / Avatar do Cliente (Opcional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
                    />
                    {formData.clientPhotoUrl && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Foto anexada
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SLIDE ORDER REORDERING */}
            {activeTab === "order" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-accent font-sora">
                      Ordem de Exibição das Seções
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Use os botões ↑ e ↓ para alterar a sequência dos slides como desejar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetOrder}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-primary px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
                    title="Restaurar sequência original"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restaurar Padrão</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-[46vh] overflow-y-auto p-1">
                  {localSlideOrder.map((slideId, index) => {
                    const config = getSlideConfig(slideId);
                    const Icon = config.icon;
                    const isFirst = index === 0;
                    const isLast = index === localSlideOrder.length - 1;

                    return (
                      <div
                        key={slideId}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 text-xs shadow-2xs transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-[11px] flex-shrink-0">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                          </span>
                          <div className="w-7 h-7 rounded-lg bg-slate-200/70 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-accent block truncate font-sora">
                              {config.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {config.description}
                            </span>
                          </div>
                        </div>

                        {/* Reorder Buttons (Up & Down) */}
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => moveItem(index, "up")}
                            disabled={isFirst}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isFirst
                                ? "text-slate-300 border-slate-100 cursor-not-allowed"
                                : "text-slate-600 hover:text-primary hover:bg-slate-100 border-slate-200 active:scale-95"
                            }`}
                            title="Mover para Cima (↑)"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveItem(index, "down")}
                            disabled={isLast}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isLast
                                ? "text-slate-300 border-slate-100 cursor-not-allowed"
                                : "text-slate-600 hover:text-primary hover:bg-slate-100 border-slate-200 active:scale-95"
                            }`}
                            title="Mover para Baixo (↓)"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-200 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSetupModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-accent rounded-xl bg-slate-100 hover:bg-slate-200 transition-all font-semibold cursor-pointer"
              >
                Cancelar
              </button>

              <MetalButton
                type="submit"
                variant="primary"
                size="md"
                icon={
                  savedSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )
                }
              >
                {savedSuccess ? "Configuração Salva no iPad!" : "Salvar Configurações"}
              </MetalButton>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
