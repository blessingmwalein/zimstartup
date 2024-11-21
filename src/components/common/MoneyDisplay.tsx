import formatMoney from '@/util/format';
import React from 'react';

interface MoneyDisplayProps {
  amount: number;
}

const MoneyDisplay: React.FC<MoneyDisplayProps> = ({ amount }) => {
  return (
    <div>
      <p>{formatMoney(amount)}</p>
    </div>
  );
};

export default MoneyDisplay;
