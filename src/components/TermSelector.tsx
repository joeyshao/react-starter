import type { Dispatch, SetStateAction } from "react"
import Button from "./Button"

interface TermSelectorProps {
  term: string,
  setTerm: Dispatch<SetStateAction<string>>
}

/*
const TermSelector = ({ term, setTerm }: TermSelectorProps) => (
  <div className="flex justify-center gap-3 py-2">
    {['Fall', 'Winter', 'Spring'].map(option => (
      <div key={option}>
        <input type="radio" name={'term'} id={option} value={option}
          checked={option === term}
          onChange={() => setTerm(option)}
        />
        <label className="ml-1 mr-1" htmlFor={option}>
          {option}
        </label>
      </div>
    ))
    }
  </div>
);
*/

const TermSelector = ({ setTerm }: TermSelectorProps) => (
  <div className="flex justify-center gap-1 py-2">
  {['Fall', 'Winter', 'Spring'].map(option => (
    <Button key = { option } text = { option } onClick = { () => setTerm(option) }></Button>))}
  </div>
);

export default TermSelector;
