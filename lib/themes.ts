export interface Theme {
  name: string
  colors: {
    primary: string
    primaryHover: string
    background: string
    accent: string
    text: string
    textMuted: string
  }
}

export const themes: Theme[] = [
  {
    name: 'Deep Navy Blue',
    colors: {
      primary: '#1a2b4a',
      primaryHover: '#0f1a2f',
      background: '#fafaf8',
      accent: '#d4af37',
      text: '#1a2b4a',
      textMuted: '#64748b',
    },
  },
  {
    name: 'Rich Forest Green',
    colors: {
      primary: '#2d5016',
      primaryHover: '#1f3810',
      background: '#fffff0',
      accent: '#d2b48c',
      text: '#2d5016',
      textMuted: '#64748b',
    },
  },
  {
    name: 'Charcoal Gray',
    colors: {
      primary: '#36454f',
      primaryHover: '#252f35',
      background: '#ffffff',
      accent: '#e07856',
      text: '#36454f',
      textMuted: '#64748b',
    },
  },
  {
    name: 'Deep Burgundy',
    colors: {
      primary: '#6b2737',
      primaryHover: '#501d28',
      background: '#f5f5dc',
      accent: '#c5a572',
      text: '#6b2737',
      textMuted: '#64748b',
    },
  },
  {
    name: 'Aubergine Purple',
    colors: {
      primary: '#4a2545',
      primaryHover: '#341a30',
      background: '#ffffff',
      accent: '#d4af37',
      text: '#4a2545',
      textMuted: '#64748b',
    },
  },
  {
    name: 'Current Green (Default)',
    colors: {
      primary: '#22c55e',
      primaryHover: '#16a34a',
      background: '#ffffff',
      accent: '#10b981',
      text: '#0f172a',
      textMuted: '#64748b',
    },
  },
]
