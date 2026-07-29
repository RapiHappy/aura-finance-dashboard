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
    register: "Register",
    
    // Cards Page
    active: "Active",
    frozen: "Frozen",
    issueNewCard: "Issue New Card",
    issueVirtualCard: "Issue Virtual Card",
    
    // Landing Page
    nav: { platform: "Platform", infra: "Infrastructure", security: "Security", signin: "Sign In", openDash: "Open Dashboard" },
    hero: {
      badge: "SOC-2 Type II Certified Platform",
      title1: "The Elite Financial OS for ",
      title2: "Modern Teams.",
      desc: "Automate expenses, issue corporate cards, and control budgets in real-time. Designed specifically for fast-growing companies that demand absolute precision.",
      btnPrimary: "Explore Dashboard",
      btnSecondary: "View Infrastructure",
      disclaimer: "*No credit checks required for corporate cards. Instant setup."
    },
    metrics: { title: "Real-Time System Metrics", uptime: "System Uptime", latency: "Avg API Latency", speed: "Transaction Speed", ai: "Fraud Prevention AI" },
    trusted: "TRUSTED BY INNOVATIVE TEAMS WORLDWIDE",
    steps: {
      title: "Financial control in 3 steps.",
      desc: "Replace clunky legacy banking with intelligent automation.",
      s1: "Issue Cards Instantly", d1: "Generate virtual and physical corporate cards in one click. Set custom limits for every team member.",
      s2: "Automate Budgets", d2: "Create dynamic budgets that automatically track expenses by category, vendor, or project.",
      s3: "Smart AI Inbox", d3: "Approve expenses in seconds. Our AI categorizes receipts and matches them to transactions automatically."
    },
    showcase: {
      badge: "Dashboard Intelligence",
      title: "See your entire company runway at a glance.",
      desc: "Aura Finance brings every transaction, budget, and approval into a single, unified interface. Powered by advanced machine learning to predict burn rate and extend your runway.",
      bullets: ["Real-time cash flow monitoring", "Automated receipt matching", "Multi-entity consolidation", "Direct ERP integrations"],
      btn: "Experience the Dashboard",
      box1: "Live Pulse", box2: "Marketing", box3: "Global Scale", box3desc: "Settle in USD, EUR, and 40+ currencies instantly without FX markups."
    },
    testimonials: {
      title: "Loved by CFOs and Founders",
      t1: "Aura Finance completely changed how we manage our burn rate. The AI insights alone saved us $40k last month.",
      n1: "Sarah Jenkins, CFO at TechFlow",
      t2: "Issuing cards to our remote team used to take days. Now it takes exactly 3 seconds. Flawless execution.",
      n2: "Marcus Chen, Founder of BuildOps",
      t3: "The cleanest financial UI I have ever seen. It feels like magic compared to our old corporate bank.",
      n3: "Elena Rodriguez, VP Ops"
    },
    cta: {
      title: "Ready to upgrade your financial stack?",
      desc: "Join 10,000+ companies operating at the speed of thought. Setup takes less than 5 minutes.",
      btn: "Get Started Now"
    },
    footer: {
      product: "Product", cards: "Corporate Cards", budgets: "Budgets", inbox: "Smart Inbox",
      company: "Company", about: "About Us", careers: "Careers", contact: "Contact",
      legal: "Legal", terms: "Terms of Service", privacy: "Privacy Policy",
      rights: "Aura Finance. All rights reserved. Protected by Anti-Fraud AI."
    }
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
    register: "Создать Аккаунт",
    
    // Cards Page
    active: "Активных",
    frozen: "Замороженных",
    issueNewCard: "Выпустить Новую Карту",
    issueVirtualCard: "Виртуальная Карта",
    
    // Landing Page
    nav: { platform: "Платформа", infra: "Инфраструктура", security: "Безопасность", signin: "Войти", openDash: "Открыть Дашборд" },
    hero: {
      badge: "Сертификация SOC-2 Type II",
      title1: "Элитная Финансовая ОС для ",
      title2: "Современных Команд.",
      desc: "Автоматизируйте расходы, выпускайте корпоративные карты и контролируйте бюджеты в реальном времени. Создано для быстрорастущих компаний.",
      btnPrimary: "Изучить Дашборд",
      btnSecondary: "Инфраструктура",
      disclaimer: "*Выпуск карт без проверки кредитной истории. Мгновенная настройка."
    },
    metrics: { title: "Метрики Системы", uptime: "Аптайм", latency: "Пинг API", speed: "Скорость Транзакций", ai: "Anti-Fraud ИИ" },
    trusted: "НАМ ДОВЕРЯЮТ ИННОВАЦИОННЫЕ КОМАНДЫ ПО ВСЕМУ МИРУ",
    steps: {
      title: "Финансовый контроль за 3 шага.",
      desc: "Замените неуклюжий банкинг умной автоматизацией.",
      s1: "Моментальные Карты", d1: "Выпускайте виртуальные и физические карты в один клик. Настраивайте лимиты для каждого сотрудника.",
      s2: "Умные Бюджеты", d2: "Создавайте динамические бюджеты, которые автоматически отслеживают расходы по категориям и проектам.",
      s3: "AI Инбокс", d3: "Утверждайте расходы за секунды. Наш ИИ сам категоризирует чеки и привязывает их к транзакциям."
    },
    showcase: {
      badge: "Интеллектуальный Дашборд",
      title: "Контролируйте весь runway компании с одного взгляда.",
      desc: "Aura Finance объединяет транзакции, бюджеты и утверждения в едином интерфейсе. Машинное обучение предсказывает burn rate и продлевает жизнь стартапа.",
      bullets: ["Мониторинг денежных потоков в реальном времени", "Авто-мэтчинг чеков", "Мульти-счета", "Прямые интеграции с ERP"],
      btn: "Испытать Дашборд",
      box1: "Живой Пульс", box2: "Маркетинг", box3: "Глобальный Масштаб", box3desc: "Расчеты в USD, EUR и 40+ валютах мгновенно без скрытых комиссий."
    },
    testimonials: {
      title: "Нас любят CFO и Фаундеры",
      t1: "Aura Finance полностью изменила наш подход к расходам. Только ИИ-аналитика сэкономила нам $40k за прошлый месяц.",
      n1: "Сара Дженкинс, CFO TechFlow",
      t2: "Выпуск карт удаленной команде раньше занимал дни. Теперь это занимает ровно 3 секунды. Безупречно.",
      n2: "Маркус Чен, Founder BuildOps",
      t3: "Самый чистый финансовый интерфейс, что я видела. Ощущается как магия по сравнению с нашим старым банком.",
      n3: "Елена Родригез, VP Ops"
    },
    cta: {
      title: "Готовы обновить свой финансовый стек?",
      desc: "Присоединяйтесь к 10,000+ компаний, работающих на скорости мысли. Настройка занимает менее 5 минут.",
      btn: "Начать Работу"
    },
    footer: {
      product: "Продукт", cards: "Корпоративные Карты", budgets: "Бюджеты", inbox: "Смарт Инбокс",
      company: "Компания", about: "О нас", careers: "Вакансии", contact: "Контакты",
      legal: "Право", terms: "Пользовательское соглашение", privacy: "Политика конфиденциальности",
      rights: "Aura Finance. Все права защищены. Защищено Anti-Fraud ИИ."
    }
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
