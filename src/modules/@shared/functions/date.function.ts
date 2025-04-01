import { ptBR } from "date-fns/locale";
import { eachDayOfInterval, format, startOfWeek } from "date-fns";

export function getWeekDaysFromDate(date: Date) {
  const start = startOfWeek(date, { weekStartsOn: 0 });

  const weekDays = eachDayOfInterval({
    start: start,
    end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6),
  });

  return weekDays;
}

export function formatDateLoacale(date: Date, dateFormat: string) {
  return format(date, dateFormat, { locale: ptBR });
}
