import { CartProvider } from '@/components/order/CartProvider';
import './order.css';

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
