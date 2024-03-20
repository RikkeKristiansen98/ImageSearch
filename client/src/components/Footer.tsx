import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="d-flex align-items-center">
      <p className="me-3">Check out my GitHub:</p>
      <a href="https://github.com/RikkeKristiansen98" target="_blank" className="text-decoration-none">
        <FaGithub size={32} />
      </a>
    </div>
  );
};
