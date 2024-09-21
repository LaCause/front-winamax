export const formatDate = (startDate: string) => {
  const daysOfWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const date = new Date(startDate);
  return (
    daysOfWeek[date.getDay()] +
    ' ' +
    date.toLocaleTimeString('fr-FR', options as Intl.DateTimeFormatOptions)
  );
};

export const formatCurrency = (number: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);

export const parseFromString = (
  element: string,
  type: DOMParserSupportedType,
) => new DOMParser().parseFromString(element, type);
