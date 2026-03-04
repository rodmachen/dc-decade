export function CreditsFooter() {
  return (
    <footer className="bg-primary-dark text-text-inverse text-center text-xs py-4 px-4 mb-14">
      <p>
        Copyright &copy; 2026 Rod Machen |{" "}
        Comics data:{" "}
        <a
          href="https://www.comics.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-light underline"
        >
          GCD
        </a>{" "}
        | Image data:{" "}
        <a
          href="https://comicvine.gamespot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-light underline"
        >
          Comic Vine
        </a>
      </p>
    </footer>
  );
}
