"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'EN' | 'RU';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: any;
}

const translations = {
  EN: {
    dashboard: "Overview",
    transactions: "Transactions",
    cards: "Corporate Cards",
    budgets: "Budgets",
    settings: "Settings",
    totalCash: "Total Cash",
    burnRate: "Burn Rate",
    aiSummary: "AI Summary",
    aiInsight: "Burn decreased by 14% due to paused AWS servers. Runway extended to 18 months.",
    loadingInsight: "Loading insight analysis...",
    vsLastMo: "vs last mo",
    livePulse: "Live Pulse",
    budgetStatus: "Budget Status",
    actionInbox: "Action Inbox",
    req: "Req",
    approve: "Approve",
    signIn: "Sign In",
    register: "Register"
  },
  RU: {
    dashboard: "Обзор",
    transactions: "Транзакции",
    cards: "Корпоративные Карты",
    budgets: "Бюджеты",
    settings: "Настройки",
    totalCash: "Общий Баланс",
    burnRate: "Скорость Трат",
    aiSummary: "ИИ Анализ",
    aiInsight: "Траты снизились на 14% из-за паузы серверов AWS. Runway увеличен до 18 месяцев.",
    loadingInsight: "Анализ данных...",
    vsLastMo: "к прошлому мес.",
    livePulse: "Живой Пульс",
    budgetStatus: "Статус Бюджета",
    actionInbox: "Входящие Задачи",
    req: "Запросов",
    approve: "Одобрить",
    signIn: "Войти",
    register: "Создать Аккаунт"
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN');

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
