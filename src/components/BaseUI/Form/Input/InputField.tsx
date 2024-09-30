'use client';

import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const InputField: React.FC<Props> = ({}: Props) => {
  return <div>Write your input component here</div>;
};
