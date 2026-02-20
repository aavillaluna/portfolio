export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12">
      <div className="poster-container pb-10">
        <div className="paper-soft rounded-[1.25rem] px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif text-sm opacity-80">© {year} Althea Villaluna</p>
          <p className="script-accent text-2xl sm:text-3xl opacity-85">See you on the next shuffle.</p>
        </div>
      </div>
    </footer>
  );
}
