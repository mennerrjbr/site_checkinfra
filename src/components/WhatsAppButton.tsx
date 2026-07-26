export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5521975369597"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-all duration-300 hover:bg-green-600 hover:scale-110 hover:shadow-green-500/30 active:scale-95 animate-pulse group"
      aria-label="Contato via WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6"
      >
        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.473 1.33 4.99L2 22l5.176-1.357c1.47.8 3.11 1.222 4.793 1.225h.005c5.503 0 9.986-4.482 9.988-9.988 0-2.67-1.037-5.18-2.92-7.062A9.925 9.925 0 0 0 12.012 2Zm7.042 14.12c-.287.808-1.42 1.48-1.956 1.547-.487.06-1.12.1-3.26-.79-2.73-1.135-4.485-3.92-4.62-4.106-.137-.184-1.1-1.464-1.1-2.793 0-1.33.684-1.98.928-2.235.244-.256.533-.32.71-.32h.504c.16 0 .373.003.538.4.17.41.58 1.417.63 1.517.05.1.08.21.01.343-.067.133-.1.217-.2.333-.1.117-.21.26-.3.35-.1.1-.21.21-.09.42.12.21.53.87 1.137 1.412.784.7 1.442.92 1.646 1.02.204.1.32.083.44-.055.12-.138.52-.605.66-.812.14-.207.28-.173.475-.1.194.073 1.233.58 1.446.688.212.107.355.16.406.25.05.09.05.523-.238 1.33Z" />
      </svg>
    </a>
  );
}
