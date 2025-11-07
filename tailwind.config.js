/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#F5F5F5', // Light gray for background
        secondary: '#1E2A78', // Navy blue for accents
        textPrimary: '#121212', // Dark gray for main text
        textSecondary: '#4A4A4A', // Medium gray for secondary text
        textLight: '#F5F5F5', // Medium gray for secondary text
        borderColor: '#E0E0E0', // Light gray for borders
        nabarBackground: '#FFFFFF', // White for sidebar background
        sidebarBackground: '#FFFFFF', // White for sidebar background
        sidebarHover: '#BBDEFB', // Light blue for hover effects in the sidebar
        buttonPrimary: '#1E2A78', // Navy blue for primary buttons
        buttonSecondary: '#FF4081', // Bright pink for secondary buttons
        success: '#4CAF50', // Green for success messages
        error: '#F44336', // Red for error messages
        cardBackground: '#FFFFFF', // White background for cards or content areas
        shadowLight: '#CCCCCC', // Subtle shadow for elements
        shadowHeavy: '#BBBBBB', // Stronger shadow for depth
        menuActive: '#1E2A78', // Navy blue for active menu items
        linkColor: '#1E2A78', // Navy blue for links
      },
    },
  },
  plugins: [],
}
