import Link from "next/link";

const socialLinks = (name: string, github: string, linkedin: string) => {
  return (
    <div className="flex justify-center">
      <span>{name}</span>
      <div className="flex items-center">
        <a
          href={github}
          target="_blank"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white pl-2"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">GitHub account</span>
        </a>
        <a
          href={linkedin}
          target="_blank"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white pl-2"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="20px"
          >
            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
          </svg>
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid gap-8 px-4 py-6 lg:py-8 md:grid-cols-3 sm:grid-cols-1">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-center">
              <Link href="/">Luminaria</Link>
            </h2>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-center">
              Our Team
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                {socialLinks(
                  "David Eastmond",
                  "https://github.com/davideastmond",
                  "https://linkedin.com/in/david-eastmond-2783ab18a"
                )}
              </li>
              <li className="mb-4">
                {socialLinks(
                  "Abigail Swarth",
                  "https://github.com/abby-wankenobi",
                  "https://www.linkedin.com/in/abigailswarth/"
                )}
              </li>
              <li className="mb-4">
                {socialLinks(
                  "Sitora Everman",
                  "https://github.com/sittora",
                  "https://www.linkedin.com/in/sitora-everman/"
                )}
              </li>
              <li className="mb-4">
                {socialLinks(
                  "Janelle Lopp",
                  "https://github.com/Jnicolle98",
                  "https://www.linkedin.com/in/janelle-lopp/"
                )}
              </li>
              <li className="mb-4">
                {socialLinks(
                  "Sarita Kumari Jha",
                  "https://github.com/Sarita1517",
                  "https://www.linkedin.com/in/sjhabsc/"
                )}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-center">
              <a
                href="https://github.com/chingu-voyages/V53-tier3-team-36"
                target="_blank"
              >
                Github
              </a>
            </h2>
          </div>
        </div>
        <div className="px-4 pb-6 pt-1 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2025 <a href="https://flowbite.com/">Luminaria</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
