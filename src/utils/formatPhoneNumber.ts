export function formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);
  
    if (digits.length <= 10) {
      return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, d1, d2, d3) =>
        [d1 && `(${d1}`, d2 && `) ${d2}`, d3 && `-${d3}`].filter(Boolean).join("")
      );
    }
  
    return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, d1, d2, d3) =>
      [d1 && `(${d1}`, d2 && `) ${d2}`, d3 && `-${d3}`].filter(Boolean).join("")
    );
  }
  