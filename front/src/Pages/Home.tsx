import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../Components/Navbar";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCoins, FaGraduationCap, FaLaptop, FaUsers } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Navbar />
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative h-165 text-white">
            <div className="absolute h-full bottom-0 left-[10%] mt-40 flex items-center justify-center">
              <div className="bg-transparent sm:px-12 lg:px-24 pt-45">
                {/* Titulo principal */}
                <h1 className="text-3xl md:text-5xl font-bold mb-10 max-w-150">
                  La plataforma número 1 en Gestión Educativa
                </h1>

                {/* Descripción */}
                <div className="max-w-2xl mb-8 flex ">
                  <p className="flex text-lg gap-4">
                    <div className="bg-cyan-400 h-full w-5"></div>
                    ¡Sé parte de una nueva experiencia en gestión educativa !
                    Cubicol interface intuitiva, práctica y de fácil uso, capaz
                    de adaptarse a todas las necesidades y métodos de trabajo de
                    las instituciones educativas.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="https://www.cubicol.pe/public/img/banner/1.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-165 text-white">
            <div className="absolute h-full bottom-0 left-[10%] mt-40 flex items-center justify-center">
              <div className="bg-transparent sm:px-12 lg:px-24 pt-45">
                {/* Titulo principal */}
                <h1 className="text-3xl md:text-5xl font-bold mb-10 max-w-130">
                  Conoce nuestra Agencia Publicitaria
                </h1>

                {/* Descripción */}
                <div className="max-w-2xl mb-8 flex ">
                  <p className="flex text-lg gap-4">
                    <div className="bg-cyan-400 h-full w-5"></div>
                    ¿Necesitas actualizar tu web, diseños o algún video?
                    Edutrack Agencia te ofrece diferentes servicios para
                    potenciar tu negocio en el mundo digital, así como manejar
                    tus redes sociales.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="https://www.cubicol.pe/public/img/banner/2.jpg"
              alt=""
              className="w-full h-full object-cover object-top-right"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <main className="bg-white py-12 mt-5 ">
        {/* Contenedor principal */}
        <article className="max-w-6xl mx-auto px-6 flex max-md:flex-col">
          {/* Sección de texto */}
          <section className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex gap-2 h-[3px] bg-white mb-5">
              <div className="h-full w-3 bg-blue-600"></div>
              <div className="h-full w-10 bg-blue-600"></div>
              <div className="h-full w-3 bg-blue-600"></div>
            </div>
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Qué es Edutrack?
            </h1>

            {/* Primer párrafo */}
            <p className="text-lg text-gray-600 mb-6">
              Edutrack es la plataforma ideal que comunica a padres de familia,
              estudiantes, docentes y directivos, con la más alta tecnología.
            </p>

            {/* Segundo párrafo */}
            <p className="text-lg text-gray-600 mb-8">
              Accede a una nueva experiencia en gestión educativa con nuestra
              Aula Virtual, generando Calificaciones, Tareas, Control de
              Asistencia, Certificado de estudios, Admisión, Pensiones y mucho
              más desde la web.
            </p>
          </section>

          {/* Sección de imagen (placeholder) */}
          <section className="lg:w-1/2 lg:pl-12">
            <img
              src="https://www.cubicol.pe/public/img/web/bienvenido.png"
              alt="Plataforma educativa"
              className="w-full h-auto object-cover"
            />
          </section>
        </article>

        <article className="bg-[#f1f2f8] py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#292562] mb-2">
            ¿Por qué elegir nuestro sistema?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Con Cubicol lograrás administrar de manera más eficiente tu
            información.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 max-w-6xl mx-auto">
            {/* Tarjeta 1 */}
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-5xl text-purple-600"/>
              <h3 className="text-lg font-semibold mb-2">Equipo A1</h3>
              <p className="text-gray-600 max-w-xs">
                Equipo con experiencia en desarrollo de
                software para centros educativos.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="flex flex-col items-center text-center">
            <FaGraduationCap className="text-5xl text-purple-600"/>
              <h3 className="text-lg font-semibold mb-2">
                Centro Educativos con Edutrack
              </h3>
              <p className="text-gray-600 max-w-xs">
                Instituciones educativas que facilitan su trabajo gracias a nuestros
                sistemas.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="flex flex-col items-center text-center">
            <FaCoins className="text-4xl text-purple-600"/>
              <h3 className="text-lg font-semibold mb-2">Accesible</h3>
              <p className="text-gray-600 max-w-xs">
                Queremos que más centros educativos sean parte de Edutrack por lo
                que contamos con propuestas económicamente accesibles.
              </p>
            </div>

            {/* Tarjeta 4 */}
            <div className="flex flex-col items-center text-center">
            <FaLaptop className="text-5xl text-purple-600"/>
              <h3 className="text-lg font-semibold mb-2">Atención 24/7</h3>
              <p className="text-gray-600 max-w-xs">
                Brindamos una atención inmediata y un seguimiento personalizado.
              </p>
            </div>

            {/* Tarjeta 5 */}
            <div className="flex flex-col items-center text-center">
              <FaLaptop className="text-5xl text-purple-600"/>
              <h3 className="text-lg font-semibold mb-2">
                Experiencia Edutrack
              </h3>
              <p className="text-gray-600 max-w-xs">
                Interfase intuitiva, práctica, adaptativa y de fácil uso.
              </p>
            </div>

            {/* Tarjeta 6 */}
            <div className="flex flex-col items-center text-center">
              <svg
                className="w-10 h-10 text-purple-600 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9H10.07L12 5.84zM2 20h20v-2H2v2z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Actualizaciones</h3>
              <p className="text-gray-600 max-w-xs">
                Capacitación, actualización y mejoras constantes sin costo
                adicional.
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
