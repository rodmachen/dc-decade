// Auto-generated from tokens.yaml — do not edit manually
export const tokens = {
  "colors": {
    "primary": {
      "dark": "#2B5A9B",
      "DEFAULT": "#3878C7",
      "light": "#5A94D4"
    },
    "accent": {
      "DEFAULT": "#c4a242",
      "light": "#d4b862"
    },
    "background": {
      "DEFAULT": "#f5f0e8",
      "card": "#ffffff",
      "dark": "#1a1a1a"
    },
    "text": {
      "primary": "#1a1a1a",
      "secondary": "#4a4a4a",
      "muted": "#8a8a8a",
      "inverse": "#ffffff"
    },
    "border": {
      "DEFAULT": "#e0d8c8",
      "light": "#f0ebe0"
    },
    "status": {
      "error": "#c43030",
      "success": "#2a7d3f"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "mono": "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem"
    }
  },
  "spacing": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "6": "1.5rem",
    "8": "2rem",
    "12": "3rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "DEFAULT": "0.5rem",
    "lg": "0.75rem",
    "full": "9999px"
  },
  "cloudinary": {
    "cloud": "dke4phurv",
    "thumbnail": "w_300,h_450,c_fill",
    "detail": "w_600,h_900,c_fill",
    "card": "w_200,h_300,c_fill",
    "hero": "w_800,h_400,c_fill"
  }
} as const;

export type Tokens = typeof tokens;
