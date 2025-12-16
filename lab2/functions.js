export const formatCardNumberByBrand = (rawDigits, brand) => {
  if (brand === 'amex') {
    // Amex: 15 digits and grouped as 4-6-5
    const digits = rawDigits.slice(0, 15);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 4));
    if (digits.length > 4) parts.push(digits.slice(4, 10));
    if (digits.length > 10) parts.push(digits.slice(10, 15));
    return parts.join(' ');
  }

  // The default 16 digits, grouped 4-4-4-4
  const digits = rawDigits.slice(0, 16);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
};



export const detectCardBrand = (cardNumber = '') => {
  const trimmed = cardNumber.replace(/\s+/g, '');
  const defaultCardBrand = 'mastercard';
  
  if (trimmed.length === 0) {
    return defaultCardBrand;
  }

  // VISA – starts with 4
  if (/^4/.test(trimmed)) {
    return 'visa';
  }

  // MASTERCARD – 51–55 or 2221–2720 (simplified to 2[2-7] here)
  if (/^(5[1-5]|2[2-7])/.test(trimmed)) {
    return 'mastercard';
  }

  // AMEX – starts with 34 or 37
  if (/^3[47]/.test(trimmed)) {
    return 'amex';
  }

  // DINERS CLUB – prefixes 300–305, 36, 38 (simplified)
  if (/^3(?:0[0-5]|[68])/.test(trimmed)) {
    return 'dinersclub';
  }

  // DISCOVER – 6011, 65, 644–649 (simplified)
  if (/^6(?:011|5|4[4-9])/.test(trimmed)) {
    return 'discover';
  }

  // JCB – 2131, 1800, or 35... (simplified)
  if (/^(?:2131|1800|35)/.test(trimmed)) {
    return 'jcb';
  }

  // UNIONPAY – often starts with 62...
  if (/^62/.test(trimmed)) {
    return 'unionpay';
  }

  // TROY – commonly uses 9792 or sometimes 65 as prefix
  if (/^(?:9792|65)/.test(trimmed)) {
    return 'troy';
  }

  // CHIP – not a real global scheme?
  // Example: treat numbers starting with 9 as "chip"
  if (/^9/.test(trimmed)) {
    return 'chip';
  }

  // Default fallback brand
  return defaultCardBrand;
};


