
export const formatToBrazilianDate = (dateString : string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };