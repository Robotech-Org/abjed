"use client";

import { useMemo, useEffect } from "react";
import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

// Initialize zxcvbn dictionary
const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  translations: zxcvbnEnPackage.translations,
};

const zxcvbn = new ZxcvbnFactory(options);

interface PasswordStrengthProps {
  password?: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const result = useMemo(() => {
    if (!password) return null;
    return zxcvbn.check(password);
  }, [password]);

  if (!password || !result) return null;

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return "bg-red-500";
      case 1: return "bg-orange-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-lime-500";
      case 4: return "bg-green-500";
      default: return "bg-neutral-200 dark:bg-slate-700";
    }
  };

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  // Convert the score (0-4) to a 1-4 scale for the 4 bars
  const activeBars = result.score === 0 && password.length > 0 ? 1 : result.score;

  return (
    <div className="mt-2 w-full">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((index) => (
          <div 
            key={index}
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              activeBars >= index ? getStrengthColor(result.score) : "bg-neutral-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-start justify-between mt-1.5">
        <p className={`text-[11px] font-bold ${result.score < 3 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {getStrengthLabel(result.score)}
        </p>
      </div>
      
      {(result.feedback.warning || (result.feedback.suggestions && result.feedback.suggestions.length > 0)) && (
        <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1 leading-relaxed">
          {result.feedback.warning 
            ? result.feedback.warning 
            : result.feedback.suggestions[0]}
        </p>
      )}
    </div>
  );
}
