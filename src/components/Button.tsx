interface ButtonProps {
  text: string;
  onClick: () => void;
  'data-cy'?: string;
}

const Button = ({ text, onClick, 'data-cy': dataCy }: ButtonProps) => (
  <button type="button" className = {`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
   focus:outline-none dark:focus:ring-blue-800`} onClick={ onClick } data-cy={dataCy}>
  { text }
  </button>);

export default Button;