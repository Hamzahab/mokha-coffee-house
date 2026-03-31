'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCart } from './CartProvider';
import { MapPinIcon } from './Icons';
import {
  buildDayOptions,
  buildTimeSlotsForDay,
  isStoreOpenNow,
} from '@/lib/square/schedule';

interface PickupSchedulerProps {
  scheduleMode: 'asap' | 'schedule';
  selectedDayIdx: number;
  selectedTime: string;
  onScheduleModeChange: (mode: 'asap' | 'schedule') => void;
  onDayChange: (idx: number) => void;
  onTimeChange: (time: string) => void;
}

export function PickupScheduler({
  scheduleMode,
  selectedDayIdx,
  selectedTime,
  onScheduleModeChange,
  onDayChange,
  onTimeChange,
}: PickupSchedulerProps) {
  const { location, hoursPeriods, hoursLoading } = useCart();

  const dayOptions = useMemo(() => buildDayOptions(), []);
  const storeOpen = useMemo(() => isStoreOpenNow(hoursPeriods), [hoursPeriods]);

  useEffect(() => {
    if (hoursPeriods.length > 0 && !storeOpen) {
      onScheduleModeChange('schedule');
    }
  }, [hoursPeriods, storeOpen, onScheduleModeChange]);

  const timeSlots = useMemo(() => {
    if (hoursPeriods.length === 0) return [];
    const day = dayOptions[selectedDayIdx];
    return buildTimeSlotsForDay(hoursPeriods, day, selectedDayIdx === 0);
  }, [hoursPeriods, selectedDayIdx, dayOptions]);

  useEffect(() => {
    if (selectedTime && !timeSlots.includes(selectedTime)) {
      onTimeChange(timeSlots[0] ?? '');
    } else if (!selectedTime && timeSlots.length > 0) {
      onTimeChange(timeSlots[0]);
    }
  }, [timeSlots, selectedTime, onTimeChange]);

  return (
    <>
      <div className="order-form-group">
        <label className="order-form-label">Pickup time</label>

        {hoursLoading ? (
          <div className="order-pickup-loading-block">
            <div className="order-loading-spinner" />
            <span>Loading availability...</span>
          </div>
        ) : (
          <>
            <div className="order-schedule-toggle">
              <button
                className={`order-schedule-opt${scheduleMode === 'asap' ? ' selected' : ''}`}
                onClick={() => storeOpen && onScheduleModeChange('asap')}
                disabled={!storeOpen}
                title={!storeOpen ? 'Store is currently closed' : undefined}
              >
                ASAP{!storeOpen ? ' (closed)' : ''}
              </button>
              <button
                className={`order-schedule-opt${scheduleMode === 'schedule' ? ' selected' : ''}`}
                onClick={() => onScheduleModeChange('schedule')}
              >
                Schedule
              </button>
            </div>

            {scheduleMode === 'schedule' && (
              <div className="order-schedule-picker">
                <div className="order-schedule-days">
                  {dayOptions.map((day, idx) => (
                    <button
                      key={day.label}
                      className={`order-schedule-day${selectedDayIdx === idx ? ' selected' : ''}`}
                      onClick={() => onDayChange(idx)}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>

                {timeSlots.length === 0 ? (
                  <p className="order-pickup-loading">Closed on this day</p>
                ) : (
                  <select
                    className="order-schedule-select"
                    value={selectedTime}
                    onChange={(e) => onTimeChange(e.target.value)}
                    aria-label="Select pickup time"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {location && (
        <div className="order-pickup-location">
          <MapPinIcon size={16} />
          <div>
            <p className="order-pickup-location-name">{location.name}</p>
            <p className="order-pickup-location-addr">{location.address}, {location.city}</p>
          </div>
        </div>
      )}
    </>
  );
}
