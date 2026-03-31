export interface CheckoutState {
  step: 'cart' | 'info';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  scheduleMode: 'asap' | 'schedule';
  selectedDayIdx: number;
  selectedTime: string;
  checkingOut: boolean;
  checkoutError: string;
}

export type CheckoutAction =
  | { type: 'SET_STEP'; value: 'cart' | 'info' }
  | { type: 'SET_CUSTOMER_NAME'; value: string }
  | { type: 'SET_CUSTOMER_PHONE'; value: string }
  | { type: 'SET_CUSTOMER_EMAIL'; value: string }
  | { type: 'SET_SCHEDULE_MODE'; value: 'asap' | 'schedule' }
  | { type: 'SET_SELECTED_DAY'; value: number }
  | { type: 'SET_SELECTED_TIME'; value: string }
  | { type: 'SET_CHECKING_OUT'; value: boolean }
  | { type: 'SET_CHECKOUT_ERROR'; value: string };

export const INITIAL_CHECKOUT_STATE: CheckoutState = {
  step: 'cart',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  scheduleMode: 'asap',
  selectedDayIdx: 0,
  selectedTime: '',
  checkingOut: false,
  checkoutError: '',
};

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.value };
    case 'SET_CUSTOMER_NAME':
      return { ...state, customerName: action.value };
    case 'SET_CUSTOMER_PHONE':
      return { ...state, customerPhone: action.value };
    case 'SET_CUSTOMER_EMAIL':
      return { ...state, customerEmail: action.value };
    case 'SET_SCHEDULE_MODE':
      return { ...state, scheduleMode: action.value };
    case 'SET_SELECTED_DAY':
      return { ...state, selectedDayIdx: action.value };
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.value };
    case 'SET_CHECKING_OUT':
      return { ...state, checkingOut: action.value };
    case 'SET_CHECKOUT_ERROR':
      return { ...state, checkoutError: action.value };
    default:
      return state;
  }
}
