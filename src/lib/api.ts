export interface ChartDataPoint {
  date: string;
  balance: number;
  event?: string;
  forecast?: boolean;
}

export interface PulseItem {
  id: string;
  user: string;
  action: string;
  merchant: string;
  amount: string;
  type: 'expense' | 'deposit';
  time: string;
}

export interface Budget {
  id: string;
  category: string;
  spent: number;
  total: number;
  color: string;
  velocity: 'Low' | 'Normal' | 'High' | 'Critical';
}

export interface SmartTicket {
  id: string;
  title: string;
  subtitle: string;
  amount?: string;
  status: 'warning' | 'critical' | 'review';
}

export interface DashboardData {
  totalCash: string;
  cashChange: string;
  burnRate: string;
  burnChange: string;
  chartData: ChartDataPoint[];
  livePulse: PulseItem[];
  budgets: Budget[];
  smartInbox: SmartTicket[];
}

export interface LedgerTransaction {
  id: string;
  date: string;
  merchant: { name: string; category: string; initial: string };
  user: { name: string; avatarUrl?: string };
  amount: string;
  status: "cleared" | "pending" | "declined";
  compliance: { hasReceipt: boolean; outOfPolicy: boolean };
}

export interface CorporateCard {
  id: string;
  name: string;
  last4: string;
  network: "VISA" | "Mastercard";
  type: "Virtual" | "Physical";
  holder: string;
  limit: number;
  spent: number;
  status: "Active" | "Frozen" | "Canceled";
  colorStart: string;
  colorEnd: string;
}

export interface HeatmapDay {
  date: string;
  amount: number;
  intensity: number; // 0 to 4 (like github commits)
  events?: string[];
}

export interface Anomaly {
  id: string;
  merchant: string;
  department: string;
  message: string;
  severity: "High" | "Medium" | "Low";
  amountChange: string;
}

export const api = {
  async getDashboardData(): Promise<DashboardData> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const chartData: ChartDataPoint[] = Array.from({ length: 30 }).map((_, i) => {
      const balance = 2300000 + Math.sin(i * 0.5) * 50000 + i * 4000;
      let event;
      if (i === 12) event = "AWS Annual Billing (-$42k)";
      if (i === 22) event = "Series A Tranche (+$1M)";
      return { date: `Oct ${i + 1}`, balance, event, forecast: i > 24 };
    });

    return {
      totalCash: "$2,402,150.00",
      cashChange: "↗ +12.4% vs last mo",
      burnRate: "$142,000 / mo",
      burnChange: "↘ -5.2% vs last mo",
      chartData,
      livePulse: [
        { id: "p1", user: "Alex M.", action: "paid", merchant: "Apple Store", amount: "-$2,100", type: "expense", time: "2m ago" },
        { id: "p2", user: "System", action: "received", merchant: "Stripe Payout", amount: "+$15,000", type: "deposit", time: "14m ago" },
        { id: "p3", user: "Sarah K.", action: "paid", merchant: "Delta Airlines", amount: "-$850", type: "expense", time: "1h ago" },
      ],
      budgets: [
        { id: "b1", category: "Marketing", spent: 42000, total: 50000, color: "#3b82f6", velocity: "High" },
        { id: "b2", category: "Software", spent: 12000, total: 28000, color: "#8b5cf6", velocity: "Normal" },
      ],
      smartInbox: [
        { id: "i1", title: "Approve $12k", subtitle: "Stripe Invoice #492", status: "warning" },
        { id: "i2", title: "Action Req", subtitle: "Cloudflare Spike Detected", status: "critical" },
      ]
    };
  },

  async getLedgerTransactions(): Promise<LedgerTransaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [
      { id: "tx1", date: "Oct 12, 14:30", merchant: { name: "AWS", category: "Server", initial: "A" }, user: { name: "System" }, amount: "-$12,450.00", status: "cleared", compliance: { hasReceipt: true, outOfPolicy: false } },
      { id: "tx2", date: "Oct 12, 09:15", merchant: { name: "Stripe", category: "Revenue", initial: "S" }, user: { name: "System" }, amount: "+$15,000.00", status: "cleared", compliance: { hasReceipt: false, outOfPolicy: false } },
      { id: "tx3", date: "Oct 11, 16:45", merchant: { name: "Figma", category: "Software", initial: "F" }, user: { name: "Alex M." }, amount: "-$120.00", status: "cleared", compliance: { hasReceipt: true, outOfPolicy: false } },
      { id: "tx4", date: "Oct 10, 11:20", merchant: { name: "Notion", category: "Software", initial: "N" }, user: { name: "Sarah K." }, amount: "-$45.00", status: "cleared", compliance: { hasReceipt: true, outOfPolicy: false } },
      { id: "tx5", date: "Oct 09, 18:00", merchant: { name: "OpenAI", category: "API", initial: "O" }, user: { name: "Dev Team" }, amount: "-$2,100.00", status: "pending", compliance: { hasReceipt: false, outOfPolicy: false } },
      { id: "tx6", date: "Oct 09, 13:10", merchant: { name: "Delta Airlines", category: "Travel", initial: "D" }, user: { name: "Mike R." }, amount: "-$850.00", status: "cleared", compliance: { hasReceipt: false, outOfPolicy: true } },
      { id: "tx7", date: "Oct 08, 10:00", merchant: { name: "Slack", category: "Software", initial: "S" }, user: { name: "System" }, amount: "-$850.00", status: "cleared", compliance: { hasReceipt: true, outOfPolicy: false } },
    ];
  },

  async getCorporateCards(): Promise<CorporateCard[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: "c1", name: "AWS Infrastructure", last4: "4123", network: "VISA", type: "Virtual", holder: "Dev Team", limit: 50000, spent: 12450, status: "Active", colorStart: "#1a1a1a", colorEnd: "#050505" },
      { id: "c2", name: "Marketing Facebook Ads", last4: "9012", network: "Mastercard", type: "Virtual", holder: "Sarah K.", limit: 15000, spent: 14200, status: "Active", colorStart: "#1e1b4b", colorEnd: "#050505" },
      { id: "c3", name: "Alex M. Travel", last4: "5512", network: "VISA", type: "Physical", holder: "Alex M.", limit: 5000, spent: 850, status: "Active", colorStart: "#064e3b", colorEnd: "#050505" },
      { id: "c4", name: "General Software Subs", last4: "8821", network: "VISA", type: "Virtual", holder: "System", limit: 2000, spent: 1800, status: "Frozen", colorStart: "#450a0a", colorEnd: "#050505" },
      { id: "c5", name: "Office Supplies", last4: "1122", network: "Mastercard", type: "Physical", holder: "Mike R.", limit: 1000, spent: 0, status: "Active", colorStart: "#3b0764", colorEnd: "#050505" },
    ];
  },

  async getBudgetAnalytics() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Generate 168 days of heatmap data (24 weeks)
    const heatmap: HeatmapDay[] = Array.from({ length: 168 }).map((_, i) => {
      const isWeekend = i % 7 === 0 || i % 7 === 6;
      let intensity = isWeekend ? 0 : Math.floor(Math.random() * 3);
      let amount = intensity * (Math.random() * 5000);
      let events: string[] | undefined;

      // Inject specific high-spend days
      if (i === 15) { intensity = 4; amount = 42000; events = ["AWS Billing", "Payroll"]; }
      if (i === 82) { intensity = 3; amount = 18000; events = ["Google Ads Topup"]; }
      
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - (167 - i));

      return {
        date: dateObj.toISOString().split('T')[0],
        amount,
        intensity,
        events
      };
    });

    const anomalies: Anomaly[] = [
      { id: "a1", merchant: "Cloudflare", department: "Engineering", message: "Spike +400% vs last month. Check bandwidth usage.", severity: "High", amountChange: "+$4,200" },
      { id: "a2", merchant: "Facebook Ads", department: "Marketing", message: "Pacing to exceed monthly limit by 15%.", severity: "Medium", amountChange: "+$2,100 proj." },
      { id: "a3", merchant: "Uber", department: "Sales", message: "Unusual weekend rides detected.", severity: "Low", amountChange: "$450" }
    ];

    const departments: Budget[] = [
      { id: "d1", category: "Engineering", spent: 120000, total: 150000, color: "#3b82f6", velocity: "Normal" },
      { id: "d2", category: "Marketing", spent: 48000, total: 50000, color: "#ec4899", velocity: "Critical" },
      { id: "d3", category: "Operations", spent: 12000, total: 30000, color: "#10b981", velocity: "Low" },
      { id: "d4", category: "Sales", spent: 35000, total: 40000, color: "#f59e0b", velocity: "High" },
    ];

    return { heatmap, anomalies, departments };
  }
};
