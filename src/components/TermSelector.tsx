import type { Dispatch, SetStateAction } from "react"
import Button from "./Button"

interface TermSelectorProps {
  term: string,
  setTerm: Dispatch<SetStateAction<string>>
}

const TermSelector = ({ setTerm }: TermSelectorProps) => (
  <div className="flex justify-center gap-1 py-2">
  {['Fall', 'Winter', 'Spring'].map(option => (
    <Button key={option} text={option} onClick={() => setTerm(option)} data-cy={option}></Button>))}
  </div>
);

export default TermSelector;
