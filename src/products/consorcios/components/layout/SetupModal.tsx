"use client";

import React, { useState } from "react";
import { usePresentationStore } from "@/products/consorcios/lib/store";
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
} from "lucide-react";
import { MetalButton } from "@/components/ui/MetalButton";

export const SetupModal: React.FC = () => {
  const { isSetupModalOpen, setSetupModalOpen, client, updateClient, setSlide } =
    usePresentationStore();

  const [formData, setFormData] = useState({
    name: client.name || "",
    profession: client.profession || "",
    company: client.company || "",
    brokerName: client.brokerName || "Thiago Nunes",
    mainGoal: "Consórcio",
    clientPhotoUrl: client.clientPhotoUrl || "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient({
      ...formData,
      mainGoal: "Consórcio",
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setSetupModalOpen(false);
      setSlide(1); // Go to hero slide with customized name
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-accent font-sora">
                  Setup do Cliente & Personalização
                </h2>
                <p className="text-xs text-slate-500">
                  Preencha os dados para customizar toda a apresentação em tempo real.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSetupModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-accent hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Profession & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  placeholder="Ex: Médico Cirurgião / Empresário"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
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
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Broker Name & Main Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Consultor Especialista LFT
                </label>
                <select
                  value={formData.brokerName}
                  onChange={(e) =>
                    setFormData({ ...formData, brokerName: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent font-semibold focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Thiago Nunes">Thiago Nunes</option>
                  <option value="Victor Hugo">Victor Hugo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Foco da Apresentação
                </label>
                <select
                  value="Consórcio"
                  disabled
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent font-semibold focus:outline-none cursor-not-allowed"
                >
                  <option value="Consórcio">Consórcio</option>
                </select>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
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

            {/* Submit Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSetupModalOpen(false)}
                className="px-4 py-2.5 text-xs text-slate-600 hover:text-accent rounded-xl bg-slate-100 hover:bg-slate-200 transition-all font-semibold"
              >
                Cancelar
              </button>

              <MetalButton
                type="submit"
                variant="primary"
                size="md"
                icon={savedSuccess ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
              >
                {savedSuccess ? "Configuração Salva!" : "Iniciar Apresentação"}
              </MetalButton>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
