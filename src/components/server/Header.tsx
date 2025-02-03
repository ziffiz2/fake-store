import Image from 'next/image';
import logoIcon from '@/assets/icons/logo.svg'; 
import Cart from '@/components/client/CartIconButton';

export function Header() {
  return (
    <header className="flex justify-between items-center border-b px-4 py-4 sticky top-0 bg-white z-50">
      <Image src={logoIcon} alt="Cart" width={16} height={16} />
      <Cart />
    </header>
  );
}
