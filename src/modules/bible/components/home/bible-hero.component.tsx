import BookSearchComponent from "../book/book-search.component";
import Animate from "@/modules/@shared/components/utils/animate";

export default function BibleHeroComponent() {
  return (
    <section className="relative h-[600px]">
      <img
        alt="Estudo biblico"
        src="/images/hero.png"
        className="w-full h-full object-cover object-center absolute left-0 top-0 z-0"
      />

      <article className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300"></article>
      <footer className="absolute left-0 bottom-0 w-full h-28 bg-linear-to-t from-background to-transparent"></footer>

      <section className="app-container absolute inset-0 h-full w-full flex flex-col justify-center items-center">
        <Animate animation="animate__fadeInDown">
          <h1 className="text-center font-semibold mb-2">
            Estudo biblico em um só lugar
          </h1>
        </Animate>

        <Animate animation="animate__fadeIn">
          <p className="text-center mb-5">
            Faça estudos, reflexões em versículos em um único app.{" "}
            <br className="mobile:hidden" />
            Aprofunde sua fé.
          </p>
        </Animate>

        <BookSearchComponent
          className="w-full lg:w-2/5"
          isDisabledBackdropBlur
          inputClassName="bg-background!"
        />
      </section>
    </section>
  );
}
