'use client';

import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<Props> = ({}: Props) => {
  return <div>Write your button component here</div>;
};
