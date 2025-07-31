export interface StrengthDetails {
  fullDefinition: string;
  howToUseMoreEffectively?: string[];
  watchOuts?: string[];
  strengthsDynamics?: string;
  bestPartners?: string[];
  careerApplications?: string[];
}

export interface StrengthProfile {
  strength: string;
  nameEs: string;
  domain: string;
  briefDefinition: string;
  details: StrengthDetails;
}

export const strengthsData: StrengthProfile[] = [
  {
    "strength": "Deliverer",
    "nameEs": "Cumplidor",
    "domain": "Doing",
    "briefDefinition": "Cumplen con sus compromisos y disfrutan viendo cómo esto genera más confianza y respeto entre los demás. Se sienten fatal si las promesas se rompen, tanto al recibirlas como al darlas.",
    "details": {
      "fullDefinition": "Los Cumplidores son la personificación de la fiabilidad. Su palabra es un contrato y sienten un profundo sentido de responsabilidad personal por cada tarea que aceptan. Esta fortaleza no se trata solo de hacer el trabajo, sino de mantener la integridad y construir una reputación de confianza inquebrantable. Para ellos, una promesa rota es una falla que afecta su núcleo.",
      "howToUseMoreEffectively": [
        "1. Usa tu fiabilidad para liderar proyectos críticos y asegurar que los plazos se cumplan sin excepción.",
        "2. Comunica proactivamente tu capacidad y tus límites para que los demás sepan qué esperar de ti.",
        "3. Sé un modelo a seguir en cuanto a responsabilidad, inspirando a otros a cumplir sus propias promesas y elevando el estándar del equipo."
      ],
      "watchOuts": [
        "• Evita comprometerte en exceso; tu deseo de cumplir puede llevarte a la sobrecarga y al agotamiento.",
        "• No asumas la responsabilidad de otros que no cumplen; aprende a delegar y a exigir rendición de cuentas.",
        "• Cuidado con la frustración extrema cuando otros no comparten tu mismo nivel de compromiso."
      ],
      "strengthsDynamics": "Se complementa perfectamente con el 'Estratega', que define el rumbo mientras el Cumplidor asegura la llegada. Con el 'Catalizador', transforman el impulso inicial en resultados tangibles y sostenibles. Aportan la ejecución al 'porqué' del 'Creyente'.",
      "bestPartners": [
        "Estrategas (Strategists) (para asegurar que la ejecución se alinee con una visión clara)",
        "Generadores de Ideas (Brainstormers) (para convertir conceptos creativos en proyectos realizados)",
        "Comandantes (Commanders) (que valoran la acción y la responsabilidad directa)"
      ],
      "careerApplications": [
        "Gestión de proyectos y operaciones",
        "Roles de cumplimiento (compliance) y auditoría",
        "Administración y coordinación de equipos",
        "Logística y cadena de suministro"
      ]
    }
  },
  {
    "strength": "Focus Expert",
    "nameEs": "Experto en Enfoque",
    "domain": "Doing",
    "briefDefinition": "Las personas con esta fortaleza son expertas en establecer y mantener la concentración en una dirección u objetivo específico, evitando distracciones para lograr resultados.",
    "details": {
      "fullDefinition": "El Experto en Enfoque tiene una habilidad innata para filtrar el ruido y fijar su atención en la meta prioritaria. Actúan como el compás del equipo, recordando constantemente cuál es el destino y corrigiendo el rumbo cuando surgen desviaciones. Su mente funciona mejor cuando tiene un objetivo claro y tangible hacia el cual dirigir toda su energía.",
      "howToUseMoreEffectively": [
        "1. Ayuda a tu equipo a definir y visualizar la meta más importante en cada proyecto.",
        "2. Utiliza herramientas (listas, tableros Kanban) para mantener las prioridades visibles y eliminar tareas no esenciales.",
        "3. En reuniones, redirige la conversación amablemente hacia el objetivo principal cuando la discusión se desvíe."
      ],
      "watchOuts": [
        "• Evita la visión de túnel; no te cierres a nueva información u oportunidades que puedan surgir.",
        "• Ten paciencia con aquellos que necesitan explorar varias ideas antes de centrarse en una.",
        "• Cuidado con la frustración cuando las prioridades cambian de forma inesperada; practica la flexibilidad."
      ],
      "strengthsDynamics": "Funciona muy bien con el 'Generador de Ideas', ya que el Experto en Enfoque puede seleccionar la idea más viable y llevarla a término. Con el 'Camaleón', que prospera en el cambio, aporta un ancla de estabilidad y dirección. Equilibra al 'Pacificador', asegurando que la búsqueda de armonía no desvíe del objetivo.",
      "bestPartners": [
        "Generadores de Ideas (Brainstormers) (para filtrar y ejecutar las mejores ideas)",
        "Estrategas (Strategists) (para desglosar la visión a largo plazo en objetivos concretos)",
        "Catalizadores (Catalysts) (para dirigir su energía inicial hacia un fin productivo)"
      ],
      "careerApplications": [
        "Desarrollo de software (con metodologías ágiles)",
        "Control de tráfico aéreo o roles que exigen alta concentración",
        "Cirugía y especialidades médicas",
        "Análisis financiero y de inversiones"
      ]
    }
  },
  {
    "strength": "Problem Solver",
    "nameEs": "Solucionador de Problemas",
    "domain": "Doing",
    "briefDefinition": "Les encanta encontrar errores, descubrir fallas, diagnosticar problemas y encontrar soluciones. Les resulta difícil barrer los problemas debajo de la alfombra y seguir adelante.",
    "details": {
      "fullDefinition": "El Solucionador de Problemas es un detective natural. Se siente atraído por los desafíos y las inconsistencias, y no descansa hasta entender la causa raíz de un problema. Disfruta el proceso de desarmar una situación compleja, analizar sus partes y proponer una solución funcional y duradera. Ignorar un problema es contrario a su naturaleza.",
      "howToUseMoreEffectively": [
        "1. Asume roles donde la mejora continua y la resolución de incidencias sean clave.",
        "2. Enseña a otros tu metodología para diagnosticar problemas, creando una cultura proactiva.",
        "3. Enfócate no solo en identificar el problema, sino también en implementar y verificar la solución."
      ],
      "watchOuts": [
        "• Evita centrarte únicamente en lo negativo; reconoce y celebra también lo que funciona bien.",
        "• No busques problemas donde no los hay; a veces 'suficientemente bueno' es la respuesta correcta.",
        "• Comunica tus hallazgos de forma constructiva, sin que parezca una crítica constante hacia los demás."
      ],
      "strengthsDynamics": "Se asocia eficazmente con el 'Optimista', quien aporta una perspectiva positiva mientras el Solucionador de Problemas se encarga de la parte difícil. Con el 'Cumplidor', garantiza que las soluciones no solo se diseñen, sino que se implementen de manera fiable. Aporta pragmatismo a las grandes ideas del 'Estratega'.",
      "bestPartners": [
        "Optimistas (Optimists) (para equilibrar el enfoque en problemas con una visión positiva)",
        "Cumplidores (Deliverers) (para implementar las soluciones de manera efectiva)",
        "Analistas (Analysts) (para usar datos que validen la causa raíz del problema)"
      ],
      "careerApplications": [
        "Ingeniería y control de calidad (QA)",
        "Soporte técnico y atención al cliente (Nivel 2-3)",
        "Consultoría de gestión y procesos",
        "Medicina diagnóstica y epidemiología"
      ]
    }
  },
  {
    "strength": "Time Keeper",
    "nameEs": "Guardián del Tiempo",
    "domain": "Doing",
    "briefDefinition": "Son eficientes y puntuales, y se aseguran de que las cosas se hagan a tiempo. Valoran la puntualidad y la gestión eficaz del tiempo para cumplir con los plazos y los objetivos.",
    "details": {
      "fullDefinition": "El Guardián del Tiempo tiene un reloj interno muy preciso. Organiza su vida y su trabajo en torno a la eficiencia y la puntualidad, entendiendo que el tiempo es un recurso finito y valioso. Se destaca en la planificación, la estimación de duraciones y la creación de cronogramas realistas. La impuntualidad y la pérdida de tiempo le generan una gran ansiedad.",
      "howToUseMoreEffectively": [
        "1. Asume la responsabilidad de la planificación y el seguimiento de cronogramas en los proyectos.",
        "2. Ayuda a tu equipo a desglosar tareas grandes en pasos más pequeños y con plazos definidos.",
        "3. Modela el comportamiento siendo siempre puntual y respetando el tiempo de los demás en reuniones."
      ],
      "watchOuts": [
        "• Evita la impaciencia con quienes tienen un ritmo de trabajo diferente o más reflexivo.",
        "• No sacrifiques la calidad o la creatividad por cumplir un plazo a toda costa.",
        "• Sé flexible cuando surjan imprevistos legítimos que alteren el plan original."
      ],
      "strengthsDynamics": "Es el complemento ideal para el 'Generador de Ideas', a quien ayuda a estructurar el tiempo para la exploración creativa sin perderse. Trabaja en sintonía con el 'Experto en Enfoque' para asegurar que la meta se alcance dentro del plazo estipulado. Aporta un sentido de urgencia y estructura al 'Pensador'.",
      "bestPartners": [
        "Cumplidores (Deliverers) (que se aseguran de que la tarea se complete en el tiempo asignado)",
        "Estrategas (Strategists) (para crear planes de acción con cronogramas realistas)",
        "Camaleones (Chameleons) (para aportar estructura a su adaptabilidad y evitar el caos)"
      ],
      "careerApplications": [
        "Planificación de eventos",
        "Gestión de la cadena de suministro y logística",
        "Producción (cine, TV, manufactura)",
        "Coordinación de proyectos y 'scrum master'"
      ]
    }
  },
  {
    "strength": "Analyst",
    "nameEs": "Analista",
    "domain": "Doing",
    "briefDefinition": "Las personas con esta fortaleza se sienten energizadas al buscar la simplicidad y la claridad a través de una gran cantidad de datos. Se frustran cuando se les pide que sigan su corazón en lugar de la lógica y los hechos probados.",
    "details": {
      "fullDefinition": "El Analista es un buscador de la verdad objetiva. Su mente se ilumina al enfrentarse a datos, cifras y evidencia tangible. Tiene una capacidad especial para detectar patrones, tendencias y relaciones causa-efecto que otros no ven. Para ellos, una decisión bien fundamentada es aquella que se apoya en hechos verificables, no en opiniones o sentimientos.",
      "howToUseMoreEffectively": [
        "1. Traduce datos complejos en visualizaciones y resúmenes claros que todos puedan entender.",
        "2. Fundamenta las decisiones estratégicas del equipo con evidencia sólida y análisis de escenarios.",
        "3. Sé la voz de la objetividad cuando las discusiones se vuelvan demasiado subjetivas o emocionales."
      ],
      "watchOuts": [
        "• Evita la 'parálisis por análisis'; a veces es necesario tomar una decisión con información incompleta.",
        "• No descartes la importancia de la intuición y la experiencia humana, que no siempre son cuantificables.",
        "• Cuidado con parecer frío o insensible al presentar datos que contradicen las creencias de otros."
      ],
      "strengthsDynamics": "Forma una pareja poderosa con el 'Empatizador', combinando datos duros con comprensión humana para tomar decisiones completas. Ayuda al 'Estratega' a validar sus visiones con hechos. Proporciona la lógica y la evidencia que el 'Comandante' necesita para actuar con confianza.",
      "bestPartners": [
        "Empatizadores (Empathizers) (para equilibrar la lógica con el impacto humano)",
        "Estrategas (Strategists) (para fundamentar la visión a largo plazo con datos concretos)",
        "Autoconfiantes (Self-believers) (para aportar una base objetiva a su fuerte intuición)"
      ],
      "careerApplications": [
        "Análisis de datos y Business Intelligence",
        "Investigación científica o de mercado",
        "Finanzas, contabilidad y auditoría",
        "Planificación urbana y econometría"
      ]
    }
  },
  {
    "strength": "Believer",
    "nameEs": "Creyente",
    "domain": "Feeling",
    "briefDefinition": "Las acciones de estas personas están impulsadas por valores fundamentales y superiores que no pueden comprometerse a expensas del éxito. Se sienten agotados si sus creencias y valores son cuestionados.",
    "details": {
      "fullDefinition": "El Creyente posee una brújula moral interna que guía todas sus acciones. Su propósito y sus valores no son negociables y le proporcionan una fuente inagotable de pasión y resiliencia. Busca que su trabajo tenga un significado y esté alineado con una misión más grande. La autenticidad y la coherencia entre lo que cree y lo que hace son vitales para su bienestar.",
      "howToUseMoreEffectively": [
        "1. Elige trabajos y proyectos que estén alineados con tus valores fundamentales.",
        "2. Sé el guardián de la misión y el propósito del equipo, recordando a todos el 'porqué' de su trabajo.",
        "3. Articula tus valores de forma clara y respetuosa para que otros entiendan tus motivaciones."
      ],
      "watchOuts": [
        "• Evita ser demasiado rígido o dogmático; respeta que otros puedan tener valores diferentes.",
        "• No juzgues a quienes toman decisiones más pragmáticas o menos basadas en principios.",
        "• Cuidado con el agotamiento emocional al luchar por causas que parecen no avanzar."
      ],
      "strengthsDynamics": "Inspira al 'Cumplidor' a trabajar no solo por obligación, sino por una causa. Se conecta con el 'Empatizador' a un nivel profundo de valores compartidos. Proporciona al 'Comandante' una dirección ética y un propósito que va más allá de simplemente ganar.",
      "bestPartners": [
        "Cumplidores (Deliverers) (para convertir los valores en acciones y resultados concretos)",
        "Narradores (Storytellers) (para comunicar la misión y los valores de una manera inspiradora)",
        "Estrategas (Strategists) (para alinear la estrategia de la organización con un propósito superior)"
      ],
      "careerApplications": [
        "Organizaciones sin fines de lucro (ONG)",
        "Trabajo social y activismo",
        "Medicina y cuidado de la salud",
        "Liderazgo en empresas con una fuerte misión social o ética"
      ]
    }
  },
  {
    "strength": "Chameleon",
    "nameEs": "Camaleón",
    "domain": "Feeling",
    "briefDefinition": "Obtienen entusiasmo de los entornos en constante cambio, las sorpresas y el trabajo 'sobre la marcha'. La previsibilidad y la rutina les aburren hasta las lágrimas.",
    "details": {
      "fullDefinition": "El Camaleón es un maestro de la adaptación. Prospera en la incertidumbre y se siente energizado por la variedad y la novedad. Cambiar de contexto, de tarea o de equipo no le supone un estrés, sino una oportunidad para aprender y demostrar su flexibilidad. Su capacidad para ajustarse rápidamente a nuevas circunstancias le convierte en un recurso invaluable en entornos dinámicos.",
      "howToUseMoreEffectively": [
        "1. Ofrécete como voluntario para proyectos piloto, nuevas iniciativas o para resolver crisis inesperadas.",
        "2. Ayuda a tu equipo a navegar por períodos de cambio, actuando como un ancla de calma y adaptabilidad.",
        "3. Busca roles que ofrezcan una gran variedad de tareas y desafíos para mantenerte estimulado."
      ],
      "watchOuts": [
        "• Evita abandonar proyectos a mitad de camino solo porque la novedad ha desaparecido.",
        "• Asegúrate de desarrollar profundidad en algunas áreas, no solo amplitud.",
        "• Cuidado con parecer poco fiable o inconsistente a ojos de quienes prefieren la estabilidad."
      ],
      "strengthsDynamics": "Equilibra al 'Experto en Enfoque', aportando flexibilidad cuando los planes rígidos no funcionan. Es un gran aliado del 'Catalizador', ya que puede adaptarse rápidamente a la nueva dirección que este impulsa. Aporta una perspectiva fresca y variada a las sesiones del 'Generador de Ideas'.",
      "bestPartners": [
        "Expertos en Enfoque (Focus Experts) (para asegurar que la adaptabilidad tenga un propósito y se completen las tareas)",
        "Cumplidores (Deliverers) (que aportan la constancia para finalizar lo que el Camaleón empieza)",
        "Guardianes del Tiempo (Time Keepers) (para dar estructura a su flujo constante de actividades)"
      ],
      "careerApplications": [
        "Consultoría",
        "Gestión de crisis y relaciones públicas",
        "Emprendimiento y startups",
        "Periodismo o producción de eventos"
      ]
    }
  },
  {
    "strength": "Coach",
    "nameEs": "Entrenador",
    "domain": "Feeling",
    "briefDefinition": "Disfrutan descubriendo el potencial de otras personas y apoyando su crecimiento personal. Les resulta difícil aceptar que este potencial se desperdicie.",
    "details": {
      "fullDefinition": "El Entrenador ve el potencial latente en cada persona y siente un impulso genuino por ayudar a que ese potencial florezca. Su mayor satisfacción proviene de ver a otros tener éxito, aprender y desarrollarse. Es un excelente mentor, sabe hacer las preguntas correctas y proporciona el apoyo y el ánimo necesarios para que las personas superen sus propios límites.",
      "howToUseMoreEffectively": [
        "1. Dedica tiempo a mentorizar a colegas más jóvenes o nuevos en la organización.",
        "2. Utiliza tu habilidad para dar feedback constructivo que motive al crecimiento en lugar de desanimar.",
        "3. Ayuda a los líderes a identificar y desarrollar el talento dentro de sus equipos."
      ],
      "watchOuts": [
        "• Evita invertir demasiado tiempo en personas que no están dispuestas a esforzarse por mejorar.",
        "• No descuides tu propio desarrollo personal por estar siempre enfocado en los demás.",
        "• Cuidado con asumir un rol de 'salvador'; el crecimiento debe ser responsabilidad de cada individuo."
      ],
      "strengthsDynamics": "Trabaja en sinergia con el 'Comandante', ayudándole a desarrollar a su equipo para que esté a la altura de sus exigencias. Se complementa con el 'Solucionador de Problemas' para ayudar a las personas a superar sus propios bloqueos. Potencia al 'Autoconfiante', ayudándole a canalizar su talento de forma productiva.",
      "bestPartners": [
        "Cumplidores (Deliverers) (para ayudarles a crecer hacia roles de mayor responsabilidad)",
        "Autoconfiantes (Self-believers) (para pulir su talento y potenciar su impacto)",
        "Comandantes (Commanders) (para desarrollar el potencial del equipo que lideran)"
      ],
      "careerApplications": [
        "Recursos Humanos, especialmente en desarrollo de talento",
        "Liderazgo de equipos y gerencia",
        "Enseñanza y formación profesional",
        "Coaching ejecutivo y de vida"
      ]
    }
  },
  {
    "strength": "Empathizer",
    "nameEs": "Empatizador",
    "domain": "Feeling",
    "briefDefinition": "Son excelentes para darse cuenta de cómo se sienten los demás y utilizar esta comprensión para hacer algo bueno. Se frustran cuando se les pide que ignoren los sentimientos y que sigan una lógica estricta.",
    "details": {
      "fullDefinition": "El Empatizador sintoniza de forma natural con las emociones de los demás. Escucha atentamente, capta señales sutiles y construye una conexión genuina. Su capacidad para sentir lo que otros necesitan —ya sea ánimo, validación o ayuda práctica— le impulsa a actuar con compasión e integridad. Son el pegamento emocional de un equipo.",
      "howToUseMoreEffectively": [
        "1. Dedica tiempo a preguntar y escuchar activamente a tu equipo para tomar el pulso emocional.",
        "2. Usa tu intuición para mediar conflictos antes de que escalen, encontrando puntos en común.",
        "3. Combina tu sensibilidad con datos objetivos: presenta feedback sobre el impacto humano junto al numérico."
      ],
      "watchOuts": [
        "• Evita sobrecargarte emocionalmente con los problemas ajenos; establece límites saludables.",
        "• No permitas que la búsqueda de armonía frene decisiones necesarias aunque sean difíciles.",
        "• Cuidado con interpretar mal las señales si falta una comunicación clara; valida tus percepciones."
      ],
      "strengthsDynamics": "Se complementa con pensadores lógicos (Analistas) para equilibrar corazón y mente. Con los hacedores (Cumplidores), impulsa acciones que consideran el impacto en las personas. Frente al 'Comandante', aporta la perspectiva humana a sus decisiones directas.",
      "bestPartners": [
        "Analistas (Analysts) (que aportan datos objetivos para complementar tus intuiciones)",
        "Comandantes (Commanders) (para suavizar su directividad con inteligencia emocional)",
        "Solucionadores de Problemas (Problem Solvers) (para abordar el aspecto humano de los problemas)"
      ],
      "careerApplications": [
        "Recursos Humanos y formación de talento",
        "Coaching y mentoring",
        "Comunicación interna y gestión del cambio",
        "Atención al cliente y soporte de alto impacto"
      ]
    }
  },
  {
    "strength": "Optimist",
    "nameEs": "Optimista",
    "domain": "Feeling",
    "briefDefinition": "Su misión es aportar un espíritu positivo. Creen que el vaso está medio lleno. Siempre encuentran la manera de hacer las cosas más emocionantes, ya sea un proyecto o una situación cotidiana.",
    "details": {
      "fullDefinition": "El Optimista tiene una capacidad contagiosa para ver el lado bueno de las cosas y creer en un futuro mejor. No es un soñador ingenuo, sino alguien que activamente busca y resalta las oportunidades, el progreso y la energía positiva en cualquier situación. Su entusiasmo puede levantar la moral de un equipo entero y transformar los contratiempos en lecciones valiosas.",
      "howToUseMoreEffectively": [
        "1. Sé el animador oficial del equipo, celebrando las pequeñas victorias y manteniendo alta la moral.",
        "2. En momentos de crisis o dificultad, enmarca la situación como un desafío superable y no como un desastre.",
        "3. Utiliza tu energía para hacer que las tareas rutinarias o aburridas parezcan más atractivas y divertidas."
      ],
      "watchOuts": [
        "• Evita parecer poco realista o ignorar problemas genuinos; valida las preocupaciones de los demás.",
        "• No minimices los sentimientos negativos de otros con un 'mira el lado bueno' demasiado rápido.",
        "• Cuidado con subestimar los riesgos o dificultades de un proyecto por exceso de confianza."
      ],
      "strengthsDynamics": "Es el contrapeso perfecto para el 'Solucionador de Problemas', asegurando que el equipo no se hunda en una mentalidad negativa. Energiza al 'Catalizador', proporcionando el combustible emocional para poner las cosas en marcha. Inspira al 'Narrador' para que cuente historias de éxito y esperanza.",
      "bestPartners": [
        "Solucionadores de Problemas (Problem Solvers) (para equilibrar la detección de fallos con una visión de futuro)",
        "Cumplidores (Deliverers) (a quienes motivan para superar obstáculos con energía positiva)",
        "Pacificadores (Peace Keepers) (para transformar la resolución de conflictos en una oportunidad de fortalecimiento)"
      ],
      "careerApplications": [
        "Ventas y desarrollo de negocio",
        "Marketing y publicidad",
        "Liderazgo de equipos, especialmente en fases de cambio",
        "Animación de eventos y oratoria motivacional"
      ]
    }
  },
  {
    "strength": "Catalyst",
    "nameEs": "Catalizador",
    "domain": "Motivating",
    "briefDefinition": "Disfrutan de poner las cosas en marcha y de crear un impulso en un entorno estancado. No soportan esperar y perder el tiempo cuando podrían estar haciendo que las cosas despeguen.",
    "details": {
      "fullDefinition": "El Catalizador es la chispa que enciende el motor. Siente una impaciencia productiva que le impulsa a pasar de la idea a la acción lo más rápido posible. No necesita tener todo el plan definido; su talento reside en iniciar el movimiento, generar energía y empujar a los demás a dar el primer paso. La inacción es su mayor frustración.",
      "howToUseMoreEffectively": [
        "1. Toma la iniciativa en proyectos que están atascados o que tardan en arrancar.",
        "2. En las reuniones, transforma la discusión en decisiones y próximos pasos claros.",
        "3. Forma equipo con personas que sean buenas en la planificación y el seguimiento para que tu impulso inicial se sostenga."
      ],
      "watchOuts": [
        "• Evita empezar demasiadas cosas sin un plan para terminarlas.",
        "• Sé paciente con las personas que necesitan más tiempo para analizar antes de actuar.",
        "• Cuidado con presionar demasiado al equipo, podrías generar estrés o decisiones precipitadas."
      ],
      "strengthsDynamics": "Es el socio ideal para el 'Pensador', a quien ayuda a convertir sus reflexiones en experimentos prácticos. Trabaja muy bien con el 'Estratega', iniciando la acción necesaria para explorar la viabilidad de sus planes. Depende del 'Cumplidor' y del 'Guardián del Tiempo' para dar continuidad y estructura a su impulso.",
      "bestPartners": [
        "Cumplidores (Deliverers) (que toman el relevo y se aseguran de que el trabajo se complete)",
        "Expertos en Enfoque (Focus Experts) (para dirigir la energía del catalizador hacia un objetivo concreto)",
        "Pensadores (Thinkers) (para sacar sus ideas del plano mental y llevarlas a la acción)"
      ],
      "careerApplications": [
        "Lanzamiento de nuevos productos o servicios",
        "Emprendimiento y dirección de startups",
        "Ventas y desarrollo de nuevos mercados",
        "Producción de eventos y campañas de marketing"
      ]
    }
  },
  {
    "strength": "Commander",
    "nameEs": "Comandante",
    "domain": "Motivating",
    "briefDefinition": "Les encanta estar a cargo, hablar y que se les pida una opinión directa. No evitan los conflictos y no pueden entender la mentalidad de 'andarse con rodeos'.",
    "details": {
      "fullDefinition": "El Comandante tiene una presencia natural de liderazgo y no teme tomar decisiones difíciles. Se siente cómodo asumiendo el control de una situación, dando dirección y enfrentando los problemas de frente. Valora la claridad, la franqueza y la acción decisiva. Para ellos, el conflicto no es algo a evitar, sino una oportunidad para aclarar posturas y avanzar.",
      "howToUseMoreEffectively": [
        "1. Asume el liderazgo en situaciones de crisis o cuando se necesita una dirección clara e inmediata.",
        "2. Usa tu franqueza para dar feedback directo y sin ambigüedades que ayude a mejorar el rendimiento.",
        "3. Defiende a tu equipo y toma las decisiones impopulares que otros evitan."
      ],
      "watchOuts": [
        "• Evita parecer autoritario o intimidante; modula tu intensidad según la persona y la situación.",
        "• Aprende a escuchar activamente otras opiniones antes de imponer la tuya.",
        "• Cuidado con generar resentimiento al ser demasiado confrontacional; elige tus batallas."
      ],
      "strengthsDynamics": "Se beneficia enormemente del 'Empatizador', que le ayuda a entender el impacto de sus decisiones en el equipo. Forma una alianza poderosa con el 'Cumplidor', que ejecuta sus órdenes con fiabilidad. El 'Analista' le proporciona los datos que necesita para tomar decisiones informadas y no solo instintivas.",
      "bestPartners": [
        "Empatizadores (Empathizers) (para asegurar que sus decisiones consideren el factor humano)",
        "Analistas (Analysts) (para fundamentar sus decisiones directas con datos objetivos)",
        "Cumplidores (Deliverers) (que aprecian una dirección clara y se enfocan en la ejecución)"
      ],
      "careerApplications": [
        "Dirección general y gerencia de alto nivel",
        "Liderazgo militar o en servicios de emergencia",
        "Dirección de reestructuraciones o fusiones",
        "Abogacía litigante"
      ]
    }
  },
  {
    "strength": "Self-believer",
    "nameEs": "Autoconfiante",
    "domain": "Motivating",
    "briefDefinition": "Son personas independientes y autosuficientes, que inspiran a otros con su certeza y confianza. No soportan que otros les digan qué hacer o controlen sus acciones.",
    "details": {
      "fullDefinition": "El Autoconfiante posee una fe inquebrantable en sus propias habilidades y juicio. Esta certeza interna le permite tomar riesgos, explorar caminos no convencionales y mantenerse firme bajo presión. No busca la aprobación externa, ya que su guía proviene de su propia convicción. Su independencia y seguridad en sí mismo pueden ser una fuente de inspiración para los demás.",
      "howToUseMoreEffectively": [
        "1. Lidera proyectos pioneros o innovadores donde no hay un camino claro a seguir.",
        "2. Inspira a otros a tener más confianza en sus propias capacidades, actuando como un modelo a seguir.",
        "3. Confía en tu intuición para tomar decisiones rápidas cuando no hay tiempo para un análisis exhaustivo."
      ],
      "watchOuts": [
        "• Evita parecer arrogante o desestimar las opiniones de expertos.",
        "• Aprende a aceptar feedback y a reconocer que no siempre tienes la razón.",
        "• No ignores las reglas o procesos importantes solo por tu deseo de independencia."
      ],
      "strengthsDynamics": "Se beneficia de la perspectiva del 'Analista', que puede validar o desafiar sus intuiciones con datos. Inspira al 'Ganador' a confiar en sus instintos durante la competición. Su independencia es valorada por el 'Comandante', siempre que los resultados se entreguen. El 'Coach' puede ayudarle a pulir y dirigir su talento innato.",
      "bestPartners": [
        "Analistas (Analysts) (para aportar una base objetiva a su fuerte intuición)",
        "Estrategas (Strategists) (que le proporcionan un campo de juego donde aplicar su confianza para lograr grandes metas)",
        "Coaches (Coaches) (que le ayudan a entender y maximizar su impacto en los demás)"
      ],
      "careerApplications": [
        "Emprendimiento",
        "Ventas a comisión y desarrollo de negocio",
        "Artista o atleta profesional",
        "Roles de liderazgo que requieren tomar riesgos calculados"
      ]
    }
  },
  {
    "strength": "Storyteller",
    "nameEs": "Narrador",
    "domain": "Motivating",
    "briefDefinition": "Son maestros de la comunicación. Les gusta ser anfitriones, hablar en público y ser escuchados. Utilizan las historias para conectar, inspirar e influir en los demás.",
    "details": {
      "fullDefinition": "El Narrador tiene el don de tejer palabras e ideas en relatos cautivadores. Utiliza las historias para dar vida a los datos, simplificar lo complejo y crear una conexión emocional con su audiencia. Ya sea en una conversación uno a uno o frente a un gran público, sabe cómo captar la atención, ilustrar un punto y hacer que los mensajes sean memorables e inspiradores.",
      "howToUseMoreEffectively": [
        "1. Sé el portavoz del equipo o la empresa, traduciendo la estrategia y los datos en una narrativa convincente.",
        "2. Utiliza anécdotas y metáforas para enseñar, dar feedback y celebrar los éxitos.",
        "3. Ayuda a construir la marca y la cultura de la organización a través de una comunicación efectiva."
      ],
      "watchOuts": [
        "• Asegúrate de que tus historias tengan un propósito claro y no sean solo para entretener.",
        "• Evita exagerar o adornar los hechos hasta el punto de faltar a la verdad.",
        "• Dale espacio a otros para hablar; tu don para la comunicación no debe eclipsar a los demás."
      ],
      "strengthsDynamics": "Es el vehículo perfecto para las ideas del 'Generador de Ideas' y la visión del 'Estratega', haciéndolas accesibles y emocionantes. Trabaja con el 'Creyente' para comunicar la misión y los valores de la organización. Puede dar voz al optimismo del 'Optimista', contagiando su energía a una audiencia más amplia.",
      "bestPartners": [
        "Estrategas (Strategists) (para comunicar la visión de futuro de una manera que inspire a la acción)",
        "Analistas (Analysts) (para transformar datos y hechos en una historia comprensible e impactante)",
        "Creyentes (Believers) (para articular y difundir la misión y los valores del equipo)"
      ],
      "careerApplications": [
        "Comunicación corporativa y relaciones públicas",
        "Marketing y publicidad",
        "Ventas y presentaciones a clientes",
        "Enseñanza, política y periodismo"
      ]
    }
  },
  {
    "strength": "Winner",
    "nameEs": "Ganador",
    "domain": "Motivating",
    "briefDefinition": "Su objetivo es competir con otros para ganar. En su mente, solo los perdedores creen que participar es más importante que ganar. Las competiciones se crean para seleccionar a un único ganador.",
    "details": {
      "fullDefinition": "El Ganador se nutre de la competencia y mide su éxito en comparación con los demás. No se trata de derrotar a otros por malicia, sino de un impulso intrínseco por ser el mejor. La competición saca lo mejor de ellos, agudizando su enfoque y aumentando su energía. El marcador final es lo que más le motiva, y hará lo necesario para estar en la cima.",
      "howToUseMoreEffectively": [
        "1. Busca entornos competitivos (ventas, deportes, mercados desafiantes) donde puedas prosperar.",
        "2. Transforma tareas individuales o de equipo en una competición sana para aumentar la motivación.",
        "3. Enfoca tu deseo de ganar en superar a la competencia externa, no a tus propios colegas."
      ],
      "watchOuts": [
        "• Evita crear un ambiente de trabajo tóxico por ser excesivamente competitivo internamente.",
        "• Aprende a perder con elegancia y a ver los fracasos como oportunidades de aprendizaje.",
        "• No sacrifiques la ética o la colaboración por la necesidad de ganar a toda costa."
      ],
      "strengthsDynamics": "Se motiva con los objetivos claros que le da el 'Comandante'. Su energía competitiva es un gran motor para el equipo, especialmente si se combina con el espíritu positivo del 'Optimista'. El 'Analista' puede proporcionarle las métricas que necesita para saber si está ganando o perdiendo.",
      "bestPartners": [
        "Analistas (Analysts) (que proporcionan los datos y métricas para medir el éxito)",
        "Comandantes (Commanders) (que establecen metas claras y competitivas)",
        "Autoconfiantes (Self-believers) (que comparten su impulso por destacar y ser los mejores)"
      ],
      "careerApplications": [
        "Ventas y desarrollo de negocios de alto rendimiento",
        "Deportes profesionales",
        "Carreras en el ámbito legal (litigios) o financiero (trading)",
        "Liderazgo de startups en mercados competitivos"
      ]
    }
  },
  {
    "strength": "Brainstormer",
    "nameEs": "Generador de Ideas",
    "domain": "Thinking",
    "briefDefinition": "Estas personas se emocionan cuando se les pide que presenten nuevas ideas sin límites y que conecten cosas aparentemente inconexas. Se aburren rápidamente con las prácticas estándar.",
    "details": {
      "fullDefinition": "El Generador de Ideas es una fuente inagotable de creatividad y nuevas posibilidades. Su mente está constantemente haciendo conexiones inesperadas entre conceptos dispares, lo que le permite generar una gran cantidad de ideas originales. Disfruta de la fase inicial de un proyecto, donde todo es posible y la imaginación no tiene límites. La rutina y el pensamiento convencional le asfixian.",
      "howToUseMoreEffectively": [
        "1. Lidera o participa activamente en sesiones de lluvia de ideas para resolver problemas o crear nuevos productos.",
        "2. Mantente al día de las tendencias en diferentes campos para alimentar tu capacidad de hacer conexiones.",
        "3. Colabora con personas más pragmáticas que puedan ayudarte a filtrar y desarrollar tus mejores ideas."
      ],
      "watchOuts": [
        "• Evita saltar de una idea a otra sin dar tiempo a que ninguna madure.",
        "• Aprende a evaluar tus propias ideas de forma crítica y no solo a generarlas.",
        "• No te frustres cuando las limitaciones prácticas (presupuesto, tiempo) restrinjan la creatividad."
      ],
      "strengthsDynamics": "Es el socio perfecto para el 'Experto en Enfoque', quien puede tomar la mejor de sus ideas y llevarla a la realidad. El 'Narrador' puede tomar sus conceptos abstractos y convertirlos en historias convincentes. El 'Catalizador' puede darle el impulso inicial a sus ideas más prometedoras.",
      "bestPartners": [
        "Expertos en Enfoque (Focus Experts) (para ayudar a seleccionar y ejecutar la idea más prometedora)",
        "Cumplidores (Deliverers) (que pueden transformar una idea brillante en un proyecto real y tangible)",
        "Estrategas (Strategists) (para asegurar que las ideas se alineen con los objetivos a largo plazo)"
      ],
      "careerApplications": [
        "Publicidad y creatividad",
        "Diseño de productos e innovación (I+D)",
        "Planificación estratégica y consultoría",
        "Emprendimiento y desarrollo de nuevos modelos de negocio"
      ]
    }
  },
  {
    "strength": "Philomath",
    "nameEs": "Filomato",
    "domain": "Thinking",
    "briefDefinition": "Les encanta aprender, adquirir conocimientos y buscar la verdad. Sienten una profunda curiosidad y un deseo de entender el mundo que les rodea.",
    "details": {
      "fullDefinition": "El Filomato es un eterno estudiante, impulsado por una insaciable curiosidad y un amor por el conocimiento. Disfruta el proceso de aprender por el simple placer de entender. Se siente atraído por la investigación, la lectura y la adquisición de nuevas habilidades. Para ellos, el estancamiento intelectual es el mayor de los aburrimientos; necesitan estar constantemente alimentando su mente.",
      "howToUseMoreEffectively": [
        "1. Asume roles que requieran investigación, aprendizaje continuo y especialización.",
        "2. Conviértete en el experto residente del equipo en un tema específico y comparte tu conocimiento.",
        "3. Ayuda a tu organización a mantenerse actualizada sobre nuevas tecnologías, metodologías o tendencias del mercado."
      ],
      "watchOuts": [
        "• Evita quedarte atrapado en la fase de aprendizaje sin pasar nunca a la aplicación práctica.",
        "• No abrumes a los demás con información o detalles irrelevantes.",
        "• Acepta que no siempre es posible saberlo todo antes de tomar una decisión."
      ],
      "strengthsDynamics": "Proporciona al 'Analista' los conocimientos profundos y el contexto que necesita para interpretar los datos. Ayuda al 'Estratega' a entender el panorama completo antes de trazar un plan. Trabaja bien con el 'Coach', ya que ambos valoran el desarrollo, uno el propio y otro el de los demás.",
      "bestPartners": [
        "Narradores (Storytellers) (que pueden ayudarle a comunicar su conocimiento de forma efectiva)",
        "Cumplidores (Deliverers) (que le ayudan a aplicar su conocimiento en proyectos concretos)",
        "Catalizadores (Catalysts) (que le impulsan a poner en práctica lo que ha aprendido)"
      ],
      "careerApplications": [
        "Investigación académica o científica",
        "Desarrollo de software y arquitectura de sistemas",
        "Consultoría especializada",
        "Periodismo de investigación o documental"
      ]
    }
  },
  {
    "strength": "Strategist",
    "nameEs": "Estratega",
    "domain": "Thinking",
    "briefDefinition": "Son capaces de ver el panorama general y de identificar patrones donde otros ven complejidad. Disfrutan creando planes y estrategias para navegar hacia un futuro deseado.",
    "details": {
      "fullDefinition": "El Estratega tiene la habilidad única de elevarse por encima del caos del día a día para ver el futuro. Identifica patrones, conexiones y posibles caminos hacia adelante. No se queda atascado en el presente, sino que constantemente se pregunta '¿Qué pasaría si...?' para diseñar planes y alternativas que permitan al equipo navegar con éxito hacia un objetivo a largo plazo. Piensa en el juego completo, no solo en el siguiente movimiento.",
      "howToUseMoreEffectively": [
        "1. Ayuda a tu equipo u organización a definir una visión clara y un plan de acción para el futuro.",
        "2. Ante un problema, tómate un tiempo para ver más allá de la solución inmediata y anticipar futuras consecuencias.",
        "3. Simplifica la complejidad para los demás, mostrando el camino a seguir de manera clara y convincente."
      ],
      "watchOuts": [
        "• Evita que tus planes sean tan abstractos o a largo plazo que el equipo no sepa cómo empezar.",
        "• No ignores los detalles importantes de la ejecución; una gran estrategia sin ejecución es inútil.",
        "• Sé flexible y adapta tu estrategia cuando las circunstancias cambien."
      ],
      "strengthsDynamics": "Forma una dupla invencible con el 'Cumpledor', donde el Estratega define el 'qué' y el 'porqué', y el Cumplidor se encarga del 'cómo'. El 'Analista' le proporciona los datos para refinar y validar sus estrategias. El 'Narrador' es su mejor aliado para comunicar la visión estratégica e inspirar al equipo.",
      "bestPartners": [
        "Cumplidores (Deliverers) (que ejecutan el plan estratégico con precisión y fiabilidad)",
        "Analistas (Analysts) (que proporcionan los datos para construir y validar la estrategia)",
        "Narradores (Storytellers) (que comunican la visión estratégica de una manera inspiradora)"
      ],
      "careerApplications": [
        "Liderazgo ejecutivo y dirección de empresas",
        "Planificación urbana o militar",
        "Consultoría de gestión",
        "Dirección de campañas políticas o de marketing a gran escala"
      ]
    }
  },
  {
    "strength": "Thinker",
    "nameEs": "Pensador",
    "domain": "Thinking",
    "briefDefinition": "Su objetivo es pensar. Disfrutan de la actividad mental y de las conversaciones significativas. Prefieren estirar sus 'músculos cerebrales' a través del pensamiento profundo.",
    "details": {
      "fullDefinition": "El Pensador encuentra energía y satisfacción en la introspección y el análisis profundo. Disfruta de la soledad para reflexionar, meditar sobre una idea y llegar a sus propias conclusiones. No se conforma con respuestas superficiales y valora las conversaciones que exploran conceptos complejos y significativos. Su mundo interior es rico y su mayor placer es ejercitar su mente.",
      "howToUseMoreEffectively": [
        "1. Bloquea tiempo en tu agenda para pensar sin interrupciones; es tu forma de trabajar mejor.",
        "2. Sé la voz reflexiva del equipo, ofreciendo perspectivas profundas que otros pueden haber pasado por alto.",
        "3. Escribe tus reflexiones para clarificar tus ideas y compartirlas de manera estructurada con los demás."
      ],
      "watchOuts": [
        "• Evita quedarte aislado o parecer distante; comparte tus pensamientos con el equipo.",
        "• No caigas en la inacción por pensar demasiado; a veces es necesario actuar y reflexionar después.",
        "• Ten paciencia con las personas que son más orientadas a la acción y menos a la reflexión."
      ],
      "strengthsDynamics": "Se complementa con el 'Catalizador', que le empuja a convertir sus pensamientos en acción. Sus reflexiones profundas pueden ser una fuente invaluable de ideas para el 'Generador de Ideas'. El 'Narrador' puede ayudarle a articular y comunicar sus complejas reflexiones de una manera que otros puedan entender.",
      "bestPartners": [
        "Catalizadores (Catalysts) (que le ayudan a pasar del pensamiento a la acción)",
        "Narradores (Storytellers) (que pueden comunicar sus ideas profundas de manera efectiva)",
        "Empatizadores (Empathizers) (con quienes puede mantener conversaciones profundas y significativas)"
      ],
      "careerApplications": [
        "Filosofía, escritura y academia",
        "Planificación estratégica y roles de 'think tank'",
        "Psicoterapia y consejería",
        "Diseño de algoritmos y arquitectura de software"
      ]
    }
  },
  {
    "strength": "Peace Keeper",
    "nameEs": "Pacificador",
    "domain": "Thinking",
    "briefDefinition": "Buscan la armonía y la resolución pacífica de conflictos. Se esfuerzan por encontrar un terreno común y unir a las personas, creando un ambiente de colaboración y entendimiento.",
    "details": {
      "fullDefinition": "El Pacificador es un diplomático natural que busca incansablemente el consenso y la armonía. Tiene una aversión instintiva al conflicto y una habilidad especial para encontrar puntos en común entre posturas opuestas. Su objetivo es reducir la fricción, fomentar la colaboración y asegurarse de que todas las voces sean escuchadas. Actúa como un puente entre personas e ideas.",
      "howToUseMoreEffectively": [
        "1. Actúa como mediador en disputas de equipo, ayudando a las partes a encontrar una solución mutuamente aceptable.",
        "2. Fomenta un ambiente de trabajo inclusivo donde todos se sientan cómodos para expresar sus opiniones.",
        "3. Ayuda a construir consensos en torno a decisiones importantes, asegurando el compromiso del equipo."
      ],
      "watchOuts": [
        "• Evita eludir los conflictos necesarios; a veces la confrontación es esencial para avanzar.",
        "• No sacrifiques la mejor decisión por la decisión que contenta a todos.",
        "• Cuidado con que tu búsqueda de armonía sea percibida como una falta de convicción propia."
      ],
      "strengthsDynamics": "Equilibra la naturaleza directa del 'Comandante', asegurando que la asertividad no destruya la moral del equipo. Trabaja bien con el 'Empatizador' para entender las raíces emocionales del conflicto. Aporta una necesidad de consenso a la visión del 'Estratega', asegurando que el equipo esté unido detrás del plan.",
      "bestPartners": [
        "Comandantes (Commanders) (para suavizar su estilo directo y fomentar la colaboración)",
        "Empatizadores (Empathizers) (con quienes comparte el objetivo de un ambiente emocionalmente sano)",
        "Ganadores (Winners) (para recordarles que la colaboración interna es clave para ganar externamente)"
      ],
      "careerApplications": [
        "Mediación y arbitraje",
        "Recursos Humanos y relaciones laborales",
        "Diplomacia y relaciones internacionales",
        "Liderazgo de equipos colaborativos y gestión de alianzas"
      ]
    }
  }
]