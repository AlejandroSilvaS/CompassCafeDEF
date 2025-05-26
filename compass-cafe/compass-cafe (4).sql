-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 00:57:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `compass-cafe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `correo`, `contrasena`, `fechaInicio`, `fechaFin`) VALUES
(1, 'compasscafe@compass.com', '23tre.Cas*12', '2025-05-24', '2025-05-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebida`
--

CREATE TABLE `bebida` (
  `id_bebida` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(350) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `img_bebida` varchar(100) DEFAULT NULL,
  `id_participacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `bebida`
--

INSERT INTO `bebida` (`id_bebida`, `nombre`, `descripcion`, `img_bebida`, `id_participacion`) VALUES
(19, '¿Y ese chocorramiento cuál es?', 'Es una bebida que rompe con lo tradicional y te sorprende con una explosión de sabores únicos.', 'img/bebida/DRINKcoffeStylers.jpg', 18),
(20, 'Una bebida de rechupete!', 'Una bebida con la que descubrirás mil sabores en un solo sorbo. ', 'img/bebida/mycoffee.jpg', 19),
(35, 'AKAAL: Una experiencia que trasciende', 'Inspirada en la inmortalidad, AKAAL es una creación única. Una bebida que mezcla la intensidad y lo sutil en perfecta armonía. Energía y equilibrio en cada sorbo', 'img/bebida/b23cb64d6faaae8474fe5fd5610179d3.jpeg', 34),
(36, 'Bebida especial', 'Diseñada para sorprenderte. Disfruta de un sabor exclusivo que solo nosotros te podemos ofrecer.', 'img/bebida/34eb595155504c204cefbd83bf332a3a.jpeg', 35),
(41, 'Café con estilo 211', 'Tu pasión por las motos ahora tiene una parada obligatoria. Ven a disfrutar de una experiencia increíble, con el mejor café y la mejor compañía. No esperes más.', 'img/bebida/4343ab37b3f96944b589433d0b44ab17.jpeg', 44),
(45, 'Moto voladora', 'Con esta deliciosa bebida sentirás que recorriste Colombia en un solo sorbo. Ven y no te quedes con la curiosidad!', 'img/bebida/racer2024.jpeg', 45),
(52, 'Bebida vegana', 'Una bebida vegana tan única que redefine todo lo que conocías sobre el café. ¡Descubre esta maravilla! Te esperamos para sorprenderte con cada sorbo.', 'img/bebida/DRINKamantesDelCafe.jpg', 46),
(53, 'El carajillo frío', 'Una bebida refrescante a base de un expresso doble que te invita a descubrir una experiencia única llena de arte y sabor.', 'img/bebida/DRINKcafeGonzales.jpg', 47),
(54, ' Jazmín del occidente', '¡Una explosión de sabores que no te puedes perder! Si estás por la Macarena, ¡ven a disfrutar de esta experiencia única! Una mezcla perfecta de frescura y autenticidad que te conquistará.', 'img/bebida/DRINKaguitaNegra.jpg', 48),
(56, 'Bebida especial', 'Hecho por y para los enamorados del café. Ven y enamórate de nuestro café más especial.', 'img/bebida/DRINKenamoradoCafe.jpg', 50),
(57, 'Coffe Sour ', 'Vibrante y elegante; este cóctel de café transforma cada sorbo en una experiencia lúdica, deliciosa y fuera de lo común. ', 'img/bebida/dcbfe0a7a37202c581567341a3061e81.png', 51),
(58, 'Jardín Oculto', 'Una bebida refrescante que no puedes dejar pasar. \r\nUna receta creada para los que buscan sabores únicos, aromas frescos y una experiencia diferente en cada sorbo.   \r\n¿Estás listo para descubrir el secreto? \r\nVen a Oculto... y no olvides tu pasaporte.', 'img/bebida/d636174648521b44db0d2632368e9b90.png', 52),
(59, 'Atardecer en el Chicamocha', 'Es momento de probar una bebida única con sabores que no se olvidan.', 'img/bebida/bebidaaguita2025-1.jpeg', 53),
(60, 'Yuma Latte ', 'Una bebida de autor con un sabor único \r\nCada sorbo está pensado para lograr un balance perfecto y una experiencia sensorial inolvidable. \r\nVen y déjate sorprender por esta mezcla que no encontrarás en ningún otro lugar.', 'img/bebida/1deddc18e0544e852d541a500c940927.png', 54),
(61, 'Bree Berry', '¡Una explosión de sabores de frutos rojos que no te puedes perder!. Una experiencia única y deliciosa que te va a enamorar desde el primer sorbo.', 'img/bebida/brewberry.jpeg', 55),
(62, 'SAMADHI - Iluminación en cada sorbo', 'Descubre esta bebida que eleva tus sentidos y tu energía. Ven a vivir la experiencia.', 'img/bebida/craneoSamadi.jpeg', 56),
(63, 'Un capuccinito', 'Una bebida que no necesita ser extravagante para ser deliciosa...', 'img/bebida/1b39f98b13c1fb8d170806ffce795c25.webp', 57),
(64, 'Banan café', 'Un café que recoge una explosión de sabores inigualables en un solo sorbo!', 'img/bebida/b50dbabc4ec54d3aa958acd615a82250.jpeg', 58),
(65, 'Un café divino', 'Un cafécito tradicional. De esos de tarde con sol dorado... Para rejalarte y disfrutar.', 'img/bebida/2469d51f3162f9d8bb61556d9d9171c5.jpeg', 59),
(66, 'Gato Compass', 'Una explosión de sabores colombianos que despiertan los sentidos con el equilibrio perfecto entre lo dulce, lo acido y lo refrescante.', 'img/bebida/241b9e6e18653f89413bd6495a32fadc.png', 60),
(67, 'Monkeyccino', 'Una bebida que sorprenderá todos tus sentidos, tanto visual como sensorial.', 'img/bebida/f1d8de79a69a8389bdd8fca11811a97e.png', 61),
(68, 'Cold Brew Geisha Natural', 'Una propuesta llena de misticismo, que gira en torno a un ingrediente extraordinario.', 'img/bebida/4e54876c2c73127e0f80ec4d0b718fc5.png', 62),
(69, 'Campanero', 'Esta es una propuesta arriesgada de sabores únicos. Es el momento perfecto para que vengas a probarla.', 'img/bebida/9a38e26f219f74b33ad2f2f896863143.jpeg', 63),
(70, 'Aromática de Café', 'Una bebida que destaca por sus sabores únicos y refrescantes. \r\nVen a disfrutar de nuestro ambiente especial y acogedor.', 'img/bebida/bebidavronx2024.jpeg', 64),
(71, 'Eclipse de Niebla', 'Una bebida que ofrece una sensación de boca única y deliciosa. Es el momento perfecto para dejarse sorprender por un sabor inigualable.', 'img/bebida/adbffe6c7aa4a179e765417d3f1dd7b8.jpeg', 65),
(72, 'Una casita en una taza', 'Prueba este café delicioso, en la calidez de la Candelaria de Bogotá, con todo lo que trae sentir el centro histórico de la ciudad.', 'img/bebida/3a9ac6ef5cccadb6c3e02a8d741b74eb.jpeg', 66),
(73, 'Frutos Azahar', 'El mejor café de Colombia combinado con unos frutos rojos de fina selección para complacer tu paladar.\r\nVen y toma un café exclusivo.', 'img/bebida/3150d0b33da388d0772e0351d3adb9f7.jpeg', 67),
(74, 'EL TRÍO', '¡NUEVA EXPERIENCIA!\nY si hacemos un trío ?.....', 'img/bebida/eltrio.jpeg', 68),
(76, 'una cafecito o qué?', 'Por qué no venir a tomarte un café deliciosito?', NULL, 70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion_tienda`
--

CREATE TABLE `participacion_tienda` (
  `id_participacion` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `id_version` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `participacion_tienda`
--

INSERT INTO `participacion_tienda` (`id_participacion`, `id_tienda`, `id_version`) VALUES
(18, 25, 3),
(19, 26, 3),
(34, 45, 3),
(35, 46, 3),
(44, 50, 1),
(45, 50, 3),
(46, 51, 3),
(47, 52, 3),
(48, 53, 3),
(50, 55, 3),
(51, 56, 1),
(52, 57, 1),
(53, 53, 1),
(54, 58, 1),
(55, 46, 1),
(56, 45, 1),
(57, 59, 4),
(58, 60, 4),
(59, 61, 4),
(60, 62, 1),
(61, 63, 1),
(62, 64, 1),
(63, 65, 1),
(64, 65, 3),
(65, 66, 3),
(66, 67, 4),
(67, 68, 4),
(68, 25, 1),
(70, 25, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_tienda` int(11) NOT NULL,
  `NIT` int(20) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion_breve` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion_amplia` varchar(720) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `img_logo` varchar(100) DEFAULT NULL,
  `img_portada` varchar(100) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_tienda`, `NIT`, `nombre`, `descripcion_breve`, `descripcion_amplia`, `direccion`, `img_logo`, `img_portada`, `id_user`) VALUES
(25, 121223349, 'Coffee Stylers', 'Somos un espacio donde el café y el estilo son uno solo.', 'Somos la comunidad que ve el café como estilo de vida, diseñamos un espacio único para ti para vivir experiencias entorno al café de especialidad conectando con comunidades caficultoras a lo largo de nuestra tierra querida, uniendo así la pasión por el café y la locura del arte.\n\nSomos un estudio creativo enfocado en ilustración y muralismo, el propósito es poder crear diversidad de conceptos artísticos entorno al café de especialidad para brindarles algo diferente.\n\nSomos soñadores, amamos lo que hacemos, vibramos', 'Calle 57 #19-35 ', 'img/logo/coffeeStylers.png', 'img/portada/Fondocoffeestylers.jpg', 38),
(26, 656556768, 'My cafetería nueva', 'El mejor café de la capital está acá. Visítanos solo o acompañado!', 'My Cafetería es el lugar ideal para tomar café en Bogotá, si hay un sitio que lo tenga todo es este. Ven y descúbrelo por ti mismo.\r\n\r\nDisfruta de la experiencia tu solo o acompañado. Te estamos esperando con los abrazos abiertos y con una deliciosa taza de café que te hará sentir como en casa.\r\n\r\nEstamos esperandote!!!', 'Cra 15C #87-13', 'img/logo/myCafeteria.png', 'img/portada/myCafeteria.png', 39),
(45, 455666777, 'Craneo Sacral', 'Energía y equilibrio.', 'ENERGÍA Y EQUILIBRIO es nuestro slogan y abarca todo en nuestro concepto, entendiendo la unión del café (todo su proceso hasta llegar a la taza y las mil conversaciones alrededor de él) con el Bienestar (damos clases de yoga y talleres guiados al cuidado y autoconocimiento).', 'Cra 8 #41-38', 'img/logo/360b5bf16bdd84cf01e7d27ef3e5341f.png', 'img/portada/d635daf32772dc0240bc9ceb69bbe67f.jpeg', 75),
(46, 345566433, 'Café de La Tintería', 'Creamos comunidad y reconocemos la tradición del café.', 'Tienda de café de especialidad, ubicados en el corazón de Chapinero alto, nos enfocamos en crear comunidad y reconocer la tradición sin perder la calidad.', 'Cll 54A #4A-21, Piso 2', 'img/logo/c749ae808a8897010094541f2b426d78.jpeg', 'img/portada/03b4be2e7a8f3dc967012be66943368c.jpeg', 76),
(50, 999776000, 'Café racer', 'Motocicletas vintage y café especialidad.', 'En 2022 se empezó con el sueño de unir nuestras pasiones más grandes: motocicletas vintage y café de especialidad. Lo que comenzó como una visión para crear una marca de estilo de vida se convirtió en el espacio de todos.\r\n\r\nSeguimos enseñándole a los motociclistas sobre buen café y a los amantes del café sobre motos.', 'Cr 45a #137-39', 'img/logo/a0d72630235fbf4d483c806d1a962b55.png', 'img/portada/db5641e0d4cbfb177124cbd3247444f3.jpeg', 81),
(51, 300900777, 'Los amantes del café', 'Somos un café de especialidad, somos tostadores y educadores del café colombiano', 'Somos un café de especialidad, somos tostadores y educadores del café colombiano. En nuestro local encontrarás una buena variedad de acompañamientos dulces y de sal libres de ingredientes de origen animal. Promovemos la cultura cafetera, buscamos llevar las mejores tazas de café a nuestros visitantes, por esto compramos nuestro café a productores con los mejores estándares de calidad y de diferentes orígenes.\r\n\r\nUtilizamos las últimas tendencias de preparación en café. Ofrecemos los cursos, talleres, productos y servicios para los amantes de esta maravillosa bebida y para quienes hacen o quieren hacer parte del mundo del café. Acompáñanos en esta aventura y compartan nuestro amor por el café colombiano.', 'Cll 26D #4-15', 'img/logo/amantesCafe.png', 'img/portada/Fondoamantesdelcafe.jpg', 82),
(52, 100233655, 'Café González', 'Te ofrecemos un café impregnado de auténtica tradición.', 'Nos enorgullece ser un legado familiar que trasciende generaciones, dedicado a ofrecer un café impregnado de auténtica tradición.\r\n\r\nMás allá de una simple bebida, nuestro compromiso va más allá, contribuyendo activamente a la sostenibilidad ambiental, social y laboral en los campos de café.\r\n\r\nCafé González es más que una marca, es el fruto del trabajo justo, la creación de oportunidades y la ilusión de nuevas generaciones que encuentran en el café no solo una bebida, sino una poderosa oportunidad de cambio.', 'Av Cra 19 #123-60 y Calle 80 #12-55', 'img/logo/cafegonzales.jpg', 'img/portada/Fondocafegonzalez.jpg', 83),
(53, 200100400, 'AGÜITA NEGRA', 'Somos un café de especialidad con todo sabor santandereano.', 'Somos un café de especialidad de origen santandereano en el cual manejamos café de Santander. Ubicado en el centro de Bogotá, exactamente en el bello barrio gastronómico de La Macarena.\r\n\r\nContamos con una variedad de experiencias a base de café, catas de café, bebidas de autor, métodos de filtrado y repostería de autor.', 'Cr 4a #26c-04', 'img/logo/aguitanegra.jpg', 'img/portada/FondoaguitaNegra.jpg', 84),
(55, 320000666, 'ENAMORADOS CAFÉ', 'Prueba nuestro café y entiende la fama del café colombiano.', 'Enamorados café nace en 2023 en el barrio Santa Teresita; epicentro de manisfestaciones culturales; lugar donde se encuentran importantes librerías y restaurantes y uno de los barrios donde se han grabado el mayor número de telenovelas que hoy son reconocidas a nivel mundial.\r\n\r\nRazones de sobra para que turistas de todo el mundo quieran visitarnos, para conocer algo de historia de la casa y además para tener la oportunidad de disfrutar de una taza de café premium, preparada con un método especial para extraer y resaltar las notas que caracterizan al café colombiano como el más famoso del mundo, una distinción que nos llena de orgullo.', ' Cra 18 #40A-71', 'img/logo/enamoradosCafe.png', 'img/portada/fondoenamorados.jpeg', 86),
(56, 301400500, 'Raices DL Gourmet', 'Restaurante / Café de especialidad', 'Nuestra misión es ofrecer una experiencia única donde traemos lo mejor del café de origen directamente a tu taza, acompañados de platillos cuidadosamente elaborados con ingredientes frescos y locales, brindando un ambiente acogedor y sabores excepcionales que deleitan tus sentidos, viviendo la cultura gourmet del café y la gastronomía que se fusionan en cada taza y cada plato. Ven a disfrutar de un momento único para tu paladar.', 'Cl. 8 Sur #32A-60', 'img/logo/a00ce64bb079698ab744ce7b3509cffe.png', NULL, 87),
(57, 700800100, 'OCULTO COFFEE', 'Elevando el arte de café de especialidad.', 'O-Culto no es solo una taza de café, es conocer todo lo que hay antes, mediante y después de disfrutar un café de origen, vamos a acompañarte a que conozcas esta gran cultura descubriendo lo que tiene cada sorbo.', 'Calle 72 #9-83', 'img/logo/5b0f792a83da00b2b745b3e8662be4aa.png', 'img/portada/ocultoportad2.webp', 88),
(58, 300400566, 'Crissálidas Café', 'Disfruta de un delicioso café con tu mascota.', '¡Bienvenidos a Café Crissálidas! Somos más que una taza de café, somos la pasión por la cultura cafetera colombiana. Ven a conocernos y disfruta de una experiencia auténtica. ☕️✨”. \nVen a disfrutar de un ambiente acogedor y de nuestro delicioso café. ☕✨ Perfecto para comenzar el día o relajarte con amigos. \nCrissálidas café nació para resaltar la cultura cafetera del Huila como un homenaje a la tierra donde crecimos y que produce 1 de cada 5 granos de café en Colombia.   ', 'Cra 13 #78-37', 'img/logo/c678220257a34ff4ec25d05cc6d1bc33.png', 'img/portada/b5f816fb10fb096f147f1da76cc3023a.jpeg', 89),
(59, 900020971, 'CAFÉ 18', 'EL MEJOR CAFÉ TAMBIÉN SE QUEDA EN COLOMBIA.', 'BANEXPORT S.A. es una empresa de desarrollo cafetero fundada en 2005 con un propósito claro: identificar y desarrollar perfiles de café colombiano de la más alta calidad para exportarlos a clientes internacionales.\r\n\r\nDesde sus inicios, Banexport ha trabajado bajo un modelo de negocio sostenible basado en la transparencia, el comercio justo, la trazabilidad, la estandarización, las relaciones a largo plazo y la protección del medio ambiente.', 'Cra 9 # 70A - 35', 'img/logo/48bf7568af54311780daf4f0eee6c68b.png', 'img/portada/5f69a678124bd138a99045af06727801.jpeg', 90),
(60, 300191222, 'Café Banna', 'Comprometidos con el desarrollo y venta sostenible en la industria cafetera.', '\r\nLa sostenibilidad no solo es buena para el planeta, sino también para las personas y los negocios. Es por eso que trabajamos día a día para crear productos social, ambiental y económicamente viables y amigables. Constantemente exploramos nuevos materiales y procesos de fabricación para garantizar que nuestros productos sean deliciosos y lo más sostenibles posible.\r\n\r\n \r\n\r\nAdemás de crear y vender productos sostenibles, también ofrecemos servicios de consultoría para ayudar a individuos y empresas a reducir su huella ambiental y mejorar su impacto social. Trabajando juntos, podemos crear un futuro más sostenible para todos.\r\n', 'Calle 69 #10a-19', 'img/logo/f8b6c58f728732af650694b65642ad47.png', 'img/portada/4562bc2391867b25425fa00e6dc897ba.webp', 91),
(61, 800900100, 'Divino Café especial', 'Nuestros cafés poseen características inigualables en su sabor y aroma.', '\r\n Las deliciosas notas en cada taza de Divino Café Especial son el resultado de un gran trabajo de selección y tostado que permite resaltar sus sabores únicos provenientes de una sola finca.', 'Calle 12b #4-06', 'img/logo/d228c7d4aba9834d1da56f61826c7476.png', 'img/portada/410b136c343cd6d4d9854152335bf2d2.jpeg', 92),
(62, 400556777, 'CatCoffee', 'Nacimos para ser una nueva experiencia con sentido social felino.', 'Somos un café excepcional con un origen único. Nuestro café se cultiva Apia, Risaralda en el\r\ncorazón del Paisaje Cultural Cafetero Colombiano, a una altitud de 1.650 metros sobre el\r\nnivel del mar, lo que le da un sabor distintivo y una calidad superior.\r\n\r\n\r\n\r\nNuestros granos son cuidadosamente seleccionados para ofrecer un sabor dulce y\r\nagradable a panela, así como una acidez cítrica de cáscara de naranja y lima limón. Nuestro\r\ncafé también tiene un cuerpo medio cremoso y un sabor residual a frutos secos, lo que lo\r\nconvierte en una experiencia única para los amantes del café.', 'Carrera 6 # 26b-61', 'img/logo/1c4ce8a5b44756052a4864074172caa4.png', 'img/portada/cc7fd10dc242d5718beef84d71291e9c.jpeg', 93),
(63, 800754300, 'Soledad y Compañía', 'Tienda de cafés especiales y pastelería artesanal.', 'Café de especialidad en Palermo. Un lugar acogedor e inspirador para un excelente café, métodos de filtrado y mejores historias, resaltando notas y matices únicos en el café y en la vida misma.', 'Transv 17 #45d-32', 'img/logo/03bc3ba8de670c847516297c99043699.png', 'img/portada/452bc5f0d391e661a2041c99e582a715.jpeg', 94),
(64, 700467788, 'Ristretto Coffe Lab', 'Donde la Pasión por el Café se Convierte en Arte', 'En Ristretto Coffee Lab, llevamos la pasión por el café a otro nivel. Seleccionamos los mejores granos, los tostamos con precisión y te los entregamos frescos para que disfrutes una experiencia única en cada sorbo.\r\n\r\n100% Café de Especialidad | Tostado Fresco | Aroma y Sabor Inigualables\r\n\r\nEn cada sorbo de nuestro café de especialidad, se esconde un instante de pura felicidad. En Ristretto Coffee Lab transformamos cada taza en un ritual que despierta tus sentidos y celebra la magia de los pequeños placeres diarios. Ven y vive la experiencia: aromas intensos, sabores únicos y momentos que inspiran. ', 'Cra 21 #153-14', 'img/logo/dd47c3c269c74804e8194ec999a3edd2.png', 'img/portada/977d50ebfe6394bcb872361702e62f71.jpeg', 95),
(65, 500600222, 'VRONX 60 CAFÉ DEL RENACER', 'Café de especialidad fundando en el Bronx de Bogotá', 'El pasado lo vemos con respeto y como recurso para el aprendizaje.\r\n\r\nExperiencia la taquilla del bronx, el saiayin la bebida y su compinche el campanero.\r\nUna tienda de especialidad que está revolucionando la escena local. ', 'Cra 15a # 8-54 y Cra 3 # 12-01 esquina', 'img/logo/2fce96e99ec389fdc1774ab3c2bc1ea9.jpeg', 'img/portada/a0b8468e6b16cfec951cdb055a3fbc8d.jpeg', 96),
(66, 400500211, 'Niebla Specialty Coffee', 'Vamos más allá de la taza de café Creando experiencias y conectando.', 'Somos una tienda de café de especialidad enfocada en generar experiencias sensoriales para nuestros clientes. De la misma forma buscamos una cadena de valor más trasparente y justa, donde con una relación directa con el caficultor buscamos generar más valor para la industria y para el consumidor de chafes especiales.', 'Av calle 116 # 11c - 50', 'img/logo/977e5b39f0a951767b2d93a4065c41f0.webp', 'img/portada/27b073b37a2c409f3174352bef97f640.jpeg', 97),
(67, 560041120, 'Casa Galería', 'Tejiendo redes, uniendo saberes, transformando vidas a través de...', 'Somos un café de especialidad, una familia, un proyecto lleno de magia color, inspiración y complicidad, para que disfrutes de historias y tradiciones gastronómicas.\r\nEn una casa de patrimonio histórico, ubicado en La Candelaria, centro histórico de Bogotá existe un espacio, una familia, un proyecto lleno de magia, color, inspiración y complicidad, para que disfrutes de historias y tradiciones gastronómicas.\r\n\r\nCafetería de especialidad en el Callejón del Embudo, cerca al chorro de Quevedo, la Candelaria Bogotá. Comprometidos con objetivos de sostenibilidad y protocolos de salubridad.', ' Carrera 2 # 12b-92', 'img/logo/82f4b0b49f47c5898b90f585b558f16d.png', 'img/portada/2ed7da2c068aaff16f38816ae577f5fd.jpeg', 98),
(68, 901030727, 'Azahar Coffee', 'Recorremos Colombia buscando los mejores cafés.', 'Esto representa nuestra creencia en la transparencia de nuestras relaciones y en honrar el trabajo y conocimiento de cada productor de café, para poder entregar una experiencia única en cada taza.\r\n\r\n \r\n \r\nTradicionalmente, Colombia siempre ha exportado su mejor café. Contribuimos a esta costumbre obteniendo nuestro café directamente de productores de todo el país y enviándolo alrededor del mundo. Pero, además, nos aseguramos de servir la mayor cantidad posible de este café localmente, utilizando nuestra tostadora en el departamento del Quindío y llevándolo a nuestros tres cafés en Bogotá. Porque Colombia también merece disfrutar de su mejor café.\r\nNos gusta explorar. ', 'Carrera 22 # 71-24', 'img/logo/5c3a70df81b01b0e87261373d11da84c.png', 'img/portada/65c11811a36b8332ba0b9e10a18a088a.jpeg', 99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_user` int(11) NOT NULL,
  `aceptado` tinyint(1) NOT NULL DEFAULT 0,
  `correo` varchar(50) NOT NULL,
  `ig_cuenta` varchar(50) NOT NULL,
  `celular` bigint(10) NOT NULL,
  `contrasena` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_user`, `aceptado`, `correo`, `ig_cuenta`, `celular`, `contrasena`) VALUES
(38, 1, 'coffeestylers@gmail.com', 'coffeestylers', 3219020117, '2323'),
(39, 1, 'micafe@gmail.com', 'mycoffee', 3121234567, '5555'),
(75, 1, 'craneosacral@gmail.com', 'craneosacralbrew', 3015504887, '1111'),
(76, 1, 'cafelatinteria@gmail.com', 'cafelatinteria', 3043939140, '909090'),
(81, 1, 'caferacer@gmail.com', 'micaferacer', 3043939200, '989898'),
(82, 1, 'amantescafe@hotmail.com', 'losamantesdelcafe', 3157845433, '999777'),
(83, 1, 'cafegonzales@hotmail.com', 'cafe_gonzalez', 3004412366, '7878781'),
(84, 1, 'aguitanegra@hotmail.com', 'aguitanegra', 3153455444, '333666'),
(86, 1, 'enamoradoscafe@hotmail.com', 'enamoradoscafe', 3143995599, '3333'),
(87, 1, 'raices@gmail.com', 'raicesdlgourmet', 3010001112, '432432'),
(88, 1, 'contacto@ocultoco.com', 'ocultoco', 3134293697, '131313'),
(89, 1, 'crisalidas@crisalidas.com', 'crissalidas_cafe', 3011234567, '7766'),
(90, 1, 'coffee.shop@cafe18.com.co', 'somoscafe18', 3059424981, '71234'),
(91, 1, 'cafe.banna@banna.com', 'cafe.banna', 3105461108, '232323'),
(92, 0, 'divino.cafeespecial@gmail.com', 'divinocafeespecial', 3173810597, '6767'),
(93, 1, 'catcofee@gmail.com', 'catcoffeeco', 3508432008, '535353'),
(94, 1, 'soledad.compania@gmail.com', 'soledadycompania', 3168697187, '7311'),
(95, 1, 'ristretto.coffee@ristretto.com', 'ristretto_coffee_lab', 3217163319, '290290'),
(96, 1, 'vronx60@gmail.com', 'cafedelrenacer', 3222010898, '7431'),
(97, 1, 'niebla@niebla.com', 'niebla.cafeespecialidad', 3104205713, '3765'),
(98, 0, 'experiencias@casagaleria.co', 'casagaleriacandelaria', 3212683638, '2765'),
(99, 0, 'info@azaharcoffee.com', 'azaharcoffee', 6017129740, '1761');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `version`
--

CREATE TABLE `version` (
  `id_version` int(11) NOT NULL,
  `year` varchar(20) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `version`
--

INSERT INTO `version` (`id_version`, `year`, `descripcion`) VALUES
(1, '2025-1', 'Descubre las cafeterías que están participando en este 2025 y visítalas para probar cafés tan especiales que no hallarás en ningún otro lugar.'),
(2, '2025-2', 'Aventúrate a participar en esta nueva versión cargada de premios y mucho café de calidad.'),
(3, '2024', '¡Estas son las cafeterías con el café más especial de Bogotá del 2024!'),
(4, '2026', '¡Una gran aventura llena de café nos espera!');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `bebida`
--
ALTER TABLE `bebida`
  ADD PRIMARY KEY (`id_bebida`),
  ADD KEY `fkid_participacion` (`id_participacion`),
  ADD KEY `img_bebida` (`img_bebida`);

--
-- Indices de la tabla `participacion_tienda`
--
ALTER TABLE `participacion_tienda`
  ADD PRIMARY KEY (`id_participacion`),
  ADD KEY `fkid_tienda` (`id_tienda`),
  ADD KEY `fkid_version` (`id_version`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_tienda`),
  ADD UNIQUE KEY `nit` (`NIT`),
  ADD UNIQUE KEY `direccion` (`direccion`),
  ADD KEY `fkid_user` (`id_user`),
  ADD KEY `img_logo` (`img_logo`),
  ADD KEY `img_portada` (`img_portada`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `correo` (`correo`,`ig_cuenta`,`celular`);

--
-- Indices de la tabla `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`id_version`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `bebida`
--
ALTER TABLE `bebida`
  MODIFY `id_bebida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `participacion_tienda`
--
ALTER TABLE `participacion_tienda`
  MODIFY `id_participacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_tienda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `version`
--
ALTER TABLE `version`
  MODIFY `id_version` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bebida`
--
ALTER TABLE `bebida`
  ADD CONSTRAINT `bebida_ibfk_1` FOREIGN KEY (`id_participacion`) REFERENCES `participacion_tienda` (`id_participacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `participacion_tienda`
--
ALTER TABLE `participacion_tienda`
  ADD CONSTRAINT `participacion_tienda_ibfk_1` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id_tienda`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participacion_tienda_ibfk_2` FOREIGN KEY (`id_version`) REFERENCES `version` (`id_version`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
