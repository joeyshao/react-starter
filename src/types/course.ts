import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const termSet = new Set(['Fall', 'Winter', 'Spring', 'Summer']);
export const isTerm = (v: string) => termSet.has(v);

function parseDays(daysStr: string): string[] | null {
  const dayRegex = /^(?:M|Tu|W|Th|F|Sa|Su)+$/;

  if (!dayRegex.test(daysStr)) return null;

  const tokens = daysStr.match(/M|Tu|W|Th|F|Sa|Su/g);
  return tokens && tokens.length > 0 ? tokens : null;
}

function toMinutes(hhmm: string): number | null {
  const parts = hhmm.split(':');
  if (parts.length !== 2) return null;
  const [hStr, mStr] = parts;
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isInteger(h) || !Number.isInteger(m)) return null;
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

export function validateMeets(value: string): boolean {
  const s = value.trim();

  if (s === '') return true;

  const parts = s.split(/\s+/);
  if (parts.length !== 2) {
    return false;
  }

  const [daysPart, timePart] = parts;

  const days = parseDays(daysPart);
  if (!days) {
    return false;
  }

  const times = timePart.split('-');
  if (times.length !== 2) {
    return false;
  }

  const [startStr, endStr] = times;
  const start = toMinutes(startStr);
  const end   = toMinutes(endStr);
  if (start == null || end == null) {
    return false;
  }
  if (end <= start) {
    return false;
  }
  return true;
}


const courseSchema = z.object({
  title: z.string().trim().min(2, { message: 'Title must be at least 2 characters.' }),

  term: z.string().refine(isTerm, { message: 'Term must be Fall, Winter, Spring, or Summer.'}),

  number: z
    .string()
    .regex(/^\d{3}(?:-\d{1})?$/, {
      message: 'Number must be like "213" or "213-2".',
    }),

  meets: z
    .string().refine( 
    (v) => validateMeets(v) === true, {message: 'Meets must have date + time range, like "MWF 10:00-10:50" or "TuTh 9:30-10:45".'})
});

export type Course = z.infer<typeof courseSchema>;

export const courseResolver = zodResolver(courseSchema);