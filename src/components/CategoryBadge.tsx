import { clsx } from 'clsx'
import { categoryFor, Category } from '@/lib/bmi'

export function CategoryBadge({ category }: { category: Category }) {
  const color = {
    Underweight: 'bg-blue-100 text-blue-800 border-blue-300',
    Normal: 'bg-green-100 text-green-800 border-green-300',
    Overweight: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Obesity: 'bg-red-100 text-red-800 border-red-300'
  }[category]

  const icon = {
    Underweight: '🪽',
    Normal: '✅',
    Overweight: '⚠️',
    Obesity: '❗'
  }[category]

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm font-medium',
        color
      )}
      aria-label={`BMI Category: ${category}`}
    >
      <span aria-hidden>{icon}</span>
      <span>{category}</span>
    </span>
  )
}
