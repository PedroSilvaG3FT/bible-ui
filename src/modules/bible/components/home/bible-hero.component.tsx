import BookSearchComponent from "../book/book-search.component";

export default function BibleHeroComponent() {
  return (
    <section className="relative h-[600px]">
      <img
        alt="Estudo biblico"
        src="/images/hero.jpeg"
        className="w-full h-full object-cover absolute left-0 top-0 z-0 shadow-inner"
      />

      <article className="absolute inset-0 bg-black opacity-80 group-hover:opacity-70 transition-opacity duration-300"></article>
      <footer className="absolute left-0 bottom-0 w-full h-28 bg-gradient-to-t from-background to-transparent"></footer>

      <section className="app-container absolute inset-0 h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-center font-semibold mb-2">
          Estudo biblico em um só lugar
        </h1>
        <p className="text-center mb-5">
          Faça estudos, reflexões e versículos em um único app.{" "}
          <br className="mobile:hidden" />
          Aprofunde sua fé com facilidade.
        </p>

        <BookSearchComponent
          className="w-full lg:w-2/5"
          isDisabledBackdropBlur
          inputClassName="!bg-background"
        />
      </section>
    </section>
  );
}
