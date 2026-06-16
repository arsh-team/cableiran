export const WHATSAPP_NUMBER = "989192960344";
export const TELEGRAM_USERNAME = "+989192960344";

export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function getProductInquiryLink(productName: string, locale: string): string {
  const messages: Record<string, string> = {
    en: `Hello, I'm interested in your ${productName}. Please provide more information.`,
    ar: `مرحباً، أنا مهتم بـ ${productName}. يرجى تقديم مزيد من المعلومات.`,
    ru: `Здравствуйте, меня интересует ${productName}. Пожалуйста, предоставьте дополнительную информацию.`,
    "fa-AF": `سلام، من به ${productName} علاقه دارم. لطفاً معلومات بیشتری ارائه دهید.`,
    es: `Hola, estoy interesado en ${productName}. Por favor proporcione más información.`,
    pt: `Olá, tenho interesse em ${productName}. Por favor, forneça mais informações.`,
  };
  return getWhatsAppLink(messages[locale] || messages.en);
}

export function getTelegramLink(): string {
  return `https://t.me/${TELEGRAM_USERNAME.replace('+', '')}`;
}
