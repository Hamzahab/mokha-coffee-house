export interface HoursPeriod {
  dayOfWeek: string;
  startLocalTime: string;
  endLocalTime: string;
}

export interface DayOption {
  date: Date;
  label: string;
  squareDay: string;
}

const SQUARE_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SLOT_INTERVAL_MINUTES = 30;

export function buildDayOptions(count = 4): DayOption[] {
  const options: DayOption[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    let label: string;
    if (i === 0) label = 'Today';
    else if (i === 1) label = 'Tomorrow';
    else {
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      label = `${DAY_LABELS[d.getDay()]} ${month} ${d.getDate()}`;
    }
    options.push({ date: d, label, squareDay: SQUARE_DAYS[d.getDay()] });
  }
  return options;
}

export function buildTimeSlotsForDay(
  periods: HoursPeriod[],
  day: DayOption,
  isToday: boolean,
): string[] {
  const dayPeriods = periods.filter((p) => p.dayOfWeek === day.squareDay);
  if (dayPeriods.length === 0) return [];

  const slots: string[] = [];
  const now = new Date();
  const minPickup = isToday
    ? new Date(now.getTime() + 15 * 60_000)
    : new Date(day.date);

  for (const period of dayPeriods) {
    const [startH, startM] = period.startLocalTime.split(':').map(Number);
    const [endH, endM] = period.endLocalTime.split(':').map(Number);

    const periodStart = new Date(day.date);
    periodStart.setHours(startH, startM, 0, 0);

    const periodEnd = new Date(day.date);
    periodEnd.setHours(endH, endM, 0, 0);

    const slotStart = new Date(Math.max(periodStart.getTime(), minPickup.getTime()));
    slotStart.setMinutes(
      Math.ceil(slotStart.getMinutes() / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES,
      0, 0,
    );

    for (let t = slotStart.getTime(); t < periodEnd.getTime() - 5 * 60_000; t += SLOT_INTERVAL_MINUTES * 60_000) {
      const slot = new Date(t);
      slots.push(
        slot.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      );
    }
  }

  return slots;
}

export function isStoreOpenNow(periods: HoursPeriod[]): boolean {
  const now = new Date();
  const todayDay = SQUARE_DAYS[now.getDay()];
  const todayPeriods = periods.filter((p) => p.dayOfWeek === todayDay);
  if (todayPeriods.length === 0) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return todayPeriods.some((p) => {
    const [startH, startM] = p.startLocalTime.split(':').map(Number);
    const [endH, endM] = p.endLocalTime.split(':').map(Number);
    return currentMinutes >= startH * 60 + startM && currentMinutes < endH * 60 + endM;
  });
}

export function toIso8601(timeLabel: string, dayDate: Date): string {
  const target = new Date(dayDate);
  const [time, period] = timeLabel.split(' ');
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  target.setHours(h, parseInt(mStr, 10), 0, 0);
  return target.toISOString();
}
