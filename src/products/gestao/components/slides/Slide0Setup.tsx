"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { User, Briefcase, Building, Target, ArrowRight, ArrowLeft, Camera, Sparkles, Lock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetalButton } from "@/components/ui/MetalButton";

export const Slide0Setup: React.FC = () => {
  const { client, completeSetup } = usePresentationStore();

  const [name, setName] = useState(client.name || "");
  const [profession, setProfession] = useState(client.profession || "");
  const [company, setCompany] = useState(client.company || "");
  const [brokerName, setBrokerName] = useState(client.brokerName || "");
  const [mainGoal, setMainGoal] = useState(client.mainGoal || "Seguro de Vida");
  const [photoPreview, setPhotoPreview] = useState<string>(client.clientPhotoUrl || "");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    completeSetup({
      name: name.trim() || "Cliente Especial",
      profession: profession.trim() || "Profissional Liberal",
      company: company.trim(),
      brokerName: brokerName.trim(),
      mainGoal: mainGoal.trim(),
      clientPhotoUrl: photoPreview,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-50">
      <div className="w-full max-w-xl my-auto">
        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Trocar folder
        </Link>
        <GlassCard variant="glow" className="p-6 sm:p-8">
          {/* Logo & Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-5">
            <div className="relative h-9 w-32">
              <Image
                src="/assets/logos/logo-lft-azul.png"
                alt="LFT Gestão"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Preparação da Reunião</span>
            </div>
          </div>

          <form onSubmit={handleStart} className="space-y-4">
            {/* Photo Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary shadow-glow flex-shrink-0 bg-white flex items-center justify-center">
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Foto do Cliente"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <label className="block text-xs font-bold text-accent mb-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-primary" />
                  Foto do Cliente (Upload)
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  A foto aparecerá com contorno exclusivo na recepção do cliente.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
                />
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome Completo do Cliente *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Dr. Roberto Albuquerque"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
              />
            </div>

            {/* Profession & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profissão / Cargo *
                </label>
                <input
                  type="text"
                  required
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Ex: Médico Cirurgião"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Empresa / Holding (Opcional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: Clínica Albuquerque"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Consultant & Meeting Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Consultor LFT
                </label>
                <select
                  value={brokerName}
                  onChange={(e) => setBrokerName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="">Selecione o Consultor...</option>
                  <option value="Lucas Teixeira">Lucas Teixeira</option>
                  <option value="Victor Santos">Victor Santos</option>
                  <option value="Jefferson Coutinho">Jefferson Coutinho</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Foco da Reunião
                </label>
                <select
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-accent focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Seguro de Vida">Seguro de Vida</option>
                </select>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2 flex justify-end">
              <MetalButton
                type="submit"
                variant="glow"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />}
                className="w-full sm:w-auto cursor-pointer"
              >
                Salvar e Abrir Banner
              </MetalButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};
