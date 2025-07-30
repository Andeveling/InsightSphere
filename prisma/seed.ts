import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Datos oficiales HIGH5 con clasificación correcta
const domainsData = [
  {
    name: "Doing",
    description: "Este dominio agrupa las fortalezas relacionadas con la acción, la ejecución y la forma en que las personas hacen las cosas y logran que se realicen."
  },
  {
    name: "Feeling",
    description: "Este dominio se centra en las fortalezas interpersonales, la conciencia emocional y la forma en que las personas se conectan y relacionan con los demás."
  },
  {
    name: "Motivating",
    description: "Este dominio incluye las fortalezas que ayudan a las personas a inspirar y persuadir a otros, a tomar la iniciativa y a impulsar a los equipos hacia adelante."
  },
  {
    name: "Thinking",
    description: "Este dominio abarca las fortalezas relacionadas con la cognición, la creatividad, la resolución de problemas y la forma en que las personas procesan la información."
  }
]

// Clasificación correcta oficial HIGH5 - 20 fortalezas, 4 dominios
const strengthsData = [
  // DOING DOMAIN (5 fortalezas)
  { name: "Deliverer", nameEs: "Cumplidor", domain: "Doing", description: "Cumplen con sus compromisos y disfrutan viendo cómo esto genera más confianza y respeto entre los demás. Se sienten fatal si las promesas se rompen, tanto al recibirlas como al darlas." },
  { name: "Focus Expert", nameEs: "Experto en Enfoque", domain: "Doing", description: "Las personas con esta fortaleza son expertas en establecer y mantener la concentración en una dirección u objetivo específico, evitando distracciones para lograr resultados." },
  { name: "Problem Solver", nameEs: "Solucionador de Problemas", domain: "Doing", description: "Les encanta encontrar errores, descubrir fallas, diagnosticar problemas y encontrar soluciones. Les resulta difícil barrer los problemas debajo de la alfombra y seguir adelante ignorando los problemas sin resolver." },
  { name: "Time Keeper", nameEs: "Guardián del Tiempo", domain: "Doing", description: "Son eficientes y puntuales, y se aseguran de que las cosas se hagan a tiempo. Valoran la puntualidad y la gestión eficaz del tiempo para cumplir con los plazos y los objetivos." },
  { name: "Analyst", nameEs: "Analista", domain: "Doing", description: "Las personas con esta fortaleza se sienten energizadas al buscar la simplicidad y la claridad a través de una gran cantidad de datos. Se frustran cuando se les pide que sigan su corazón en lugar de la lógica y los hechos probados." },

  // FEELING DOMAIN (5 fortalezas)
  { name: "Believer", nameEs: "Creyente", domain: "Feeling", description: "Las acciones de estas personas están impulsadas por valores fundamentales y superiores que no pueden comprometerse a expensas del éxito. Se sienten agotados si sus creencias y valores son cuestionados o no están alineados con lo que tienen que hacer." },
  { name: "Chameleon", nameEs: "Camaleón", domain: "Feeling", description: "Obtienen entusiasmo de los entornos en constante cambio, las sorpresas, los desvíos inesperados y el trabajo 'sobre la marcha'. La previsibilidad y la rutina les aburren hasta las lágrimas." },
  { name: "Coach", nameEs: "Entrenador", domain: "Feeling", description: "Disfrutan descubriendo el potencial de otras personas y apoyando su crecimiento personal. Les resulta difícil aceptar que este potencial se desperdicie." },
  { name: "Empathizer", nameEs: "Empatizador", domain: "Feeling", description: "Son excelentes para darse cuenta de cómo se sienten los demás y utilizar esta comprensión para hacer algo bueno. Se frustran cuando se les pide que ignoren los sentimientos y las emociones y que sigan una lógica estricta." },
  { name: "Optimist", nameEs: "Optimista", domain: "Feeling", description: "Su misión es aportar un espíritu positivo. Creen que el vaso está medio lleno en lugar de medio vacío. Siempre encuentran la manera de hacer las cosas más emocionantes, ya sea un proyecto de trabajo o una situación cotidiana." },

  // MOTIVATING DOMAIN (5 fortalezas)
  { name: "Catalyst", nameEs: "Catalizador", domain: "Motivating", description: "Disfrutan de poner las cosas en marcha y de crear un impulso en un entorno estancado. No soportan esperar y perder el tiempo cuando podrían estar haciendo que las cosas despeguen." },
  { name: "Commander", nameEs: "Comandante", domain: "Motivating", description: "Les encanta estar a cargo, hablar y que se les pida una opinión directa. No evitan los conflictos y no pueden entender la mentalidad de 'andarse con rodeos'." },
  { name: "Self-believer", nameEs: "Autoconfiante", domain: "Motivating", description: "Son personas independientes y autosuficientes, que inspiran a otros con su certeza y confianza. No soportan que otros les digan qué hacer o controlen sus acciones." },
  { name: "Storyteller", nameEs: "Narrador", domain: "Motivating", description: "Son maestros de la comunicación. Les gusta ser anfitriones, hablar en público y ser escuchados. Utilizan las historias para conectar, inspirar e influir en los demás." },
  { name: "Winner", nameEs: "Ganador", domain: "Motivating", description: "Su objetivo es competir con otros para ganar. En su mente, solo los perdedores creen que participar es más importante que ganar. Las competiciones se crean para seleccionar a un único ganador porque, al final, los resultados son una comparación medida con los demás." },

  // THINKING DOMAIN (5 fortalezas)
  { name: "Brainstormer", nameEs: "Generador de Ideas", domain: "Thinking", description: "Estas personas se emocionan cuando se les pide que presenten nuevas ideas sin límites y que conecten cosas aparentemente inconexas. Se aburren rápidamente con las prácticas estándar o las personas de mente cerrada." },
  { name: "Philomath", nameEs: "Filomato", domain: "Thinking", description: "Les encanta aprender, adquirir conocimientos y buscar la verdad. Sienten una profunda curiosidad y un deseo de entender el mundo que les rodea." },
  { name: "Strategist", nameEs: "Estratega", domain: "Thinking", description: "Son capaces de ver el panorama general y de identificar patrones donde otros ven complejidad. Disfrutan creando planes y estrategias para navegar hacia un futuro deseado." },
  { name: "Thinker", nameEs: "Pensador", domain: "Thinking", description: "Su objetivo es pensar. A algunos les emociona ejercitar sus bíceps y tríceps, pero ellos prefieren estirar sus 'músculos cerebrales' a través del pensamiento profundo. Disfrutan de la actividad mental y de las conversaciones significativas." },
  { name: "Peace Keeper", nameEs: "Pacificador", domain: "Thinking", description: "Buscan la armonía y la resolución pacífica de conflictos. Se esfuerzan por encontrar un terreno común y unir a las personas, creando un ambiente de colaboración y entendimiento." }
]

// Datos de equipos de ejemplo
const teamsData = [
  {
    name: "Team Alpha",
    description: "Equipo de desarrollo frontend enfocado en experiencia de usuario"
  },
  {
    name: "Team Beta",
    description: "Equipo de desarrollo backend especializado en APIs y microservicios"
  },
  {
    name: "Team Gamma",
    description: "Equipo de diseño y experiencia de usuario"
  },
  // --- Equipo Nojau ---
  {
    name: "nojau",
    description: "Startup Colombiana dedicada a la mensajeria masiva en whatsapp, shoppings cart para rotaciones y procesos de onboardings efectivos mediante entrenamientos y capsulas de conocimiento"
  }
]

// Usuarios de ejemplo con contraseñas hasheadas
const usersData = [
  {
    name: "Ana García",
    email: "ana.garcia@insightsphere.com",
    password: "password123", // Se hasheará
    age: 28,
    career: "Frontend Developer",
    hobbies: "Fotografía, senderismo, lectura",
    description: "Me encanta crear interfaces intuitivas y siempre busco la perfección en los detalles. Trabajo mejor cuando tengo metas claras y puedo enfocarme sin distracciones.",
    teamIndex: 0
  },
  {
    name: "Carlos Mendoza",
    email: "carlos.mendoza@insightsphere.com",
    password: "password123",
    age: 32,
    career: "Backend Developer",
    hobbies: "Videojuegos, programación, ciclismo",
    description: "Disfruto resolviendo problemas complejos y optimizando sistemas. Me motiva encontrar soluciones elegantes a desafíos técnicos difíciles.",
    teamIndex: 1
  },
  {
    name: "María López",
    email: "maria.lopez@insightsphere.com", 
    password: "password123",
    age: 26,
    career: "UX Designer",
    hobbies: "Arte, yoga, viajes",
    description: "Mi pasión es entender las necesidades de los usuarios y crear experiencias que realmente los conecten con el producto. Creo en el poder del diseño centrado en el usuario.",
    teamIndex: 2
  },
  {
    name: "Diego Herrera",
    email: "diego.herrera@insightsphere.com",
    password: "password123", 
    age: 35,
    career: "Tech Lead",
    hobbies: "Lectura técnica, ajedrez, correr",
    description: "Me gusta liderar equipos hacia objetivos ambiciosos. Creo en la importancia de la comunicación clara y en tomar decisiones basadas en datos.",
    teamIndex: 1
  },
  {
    name: "Sofia Ruiz",
    email: "sofia.ruiz@insightsphere.com",
    password: "password123",
    age: 29,
    career: "Product Manager",
    hobbies: "Podcasts, cocina, networking",
    description: "Disfruto conectando las necesidades del negocio con las capacidades técnicas. Me energiza trabajar con diferentes equipos para crear productos exitosos.",
    teamIndex: 0
  },
  {
    name: "Andrés Martínez",
    email: "andres.martinez@insightsphere.com",
    password: "password123",
    age: 31,
    career: "DevOps Engineer", 
    hobbies: "Automatización, música, fútbol",
    description: "Me apasiona optimizar procesos y crear sistemas confiables. Siempre busco maneras de automatizar tareas repetitivas y mejorar la eficiencia del equipo.",
    teamIndex: 1
  },
  // --- Usuarios equipo nojau ---
  {
    name: "Dani Ramirez",
    email: "dani@nojau.co",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Edwar Sanz",
    email: "edwarsanz.nojau@gmail.com",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Jorge LEÓN",
    email: "jorge@nojau.co",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Lore RIASCOS",
    email: "lore@nojau.co",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Pao BLANDÓN",
    email: "pao@nojau.co",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Vale RAMÍREZ",
    email: "vale@nojau.co",
    password: "password123",
    teamIndex: 3
  },
  {
    name: "Andres Parra",
    email: "andres@nojau.co",
    password: "password123",
    teamIndex: 3
  }
]

async function main() {
  console.log('🚀 Iniciando seeding de la base de datos...')

  // Limpiar datos existentes
  console.log('🧹 Limpiando datos existentes...')
  await prisma.userStrength.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.strength.deleteMany({})
  await prisma.domain.deleteMany({})
  await prisma.team.deleteMany({})
  await prisma.gameSession.deleteMany({})

  // Crear dominios
  console.log('📁 Creando dominios...')
  const createdDomains = await Promise.all(
    domainsData.map(async (domain) => {
      return await prisma.domain.create({
        data: domain
      })
    })
  )
  console.log(`✅ Creados ${createdDomains.length} dominios`)

  // Crear fortalezas
  console.log('💪 Creando fortalezas...')
  const createdStrengths = await Promise.all(
    strengthsData.map(async (strength) => {
      const domain = createdDomains.find(d => d.name === strength.domain)
      if (!domain) {
        throw new Error(`Domain ${strength.domain} not found`)
      }
      return await prisma.strength.create({
        data: {
          name: strength.name,
          nameEs: strength.nameEs,
          description: strength.description,
          domainId: domain.id
        }
      })
    })
  )
  console.log(`✅ Creadas ${createdStrengths.length} fortalezas`)

  // Crear equipos  
  console.log('👥 Creando equipos...')
  const createdTeams = await Promise.all(
    teamsData.map(async (team) => {
      return await prisma.team.create({
        data: team
      })
    })
  )
  console.log(`✅ Creados ${createdTeams.length} equipos`)

  // Crear usuarios
  console.log('👤 Creando usuarios...')
  const createdUsers = await Promise.all(
    usersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const team = createdTeams[user.teamIndex]
      
      return await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          hashedPassword,
          age: user.age,
          career: user.career,
          hobbies: user.hobbies,
          description: user.description,
          teamId: team.id,
          profileComplete: false // Los usuarios deberán completar sus fortalezas
        }
      })
    })
  )
  console.log(`✅ Creados ${createdUsers.length} usuarios`)

  // Mostrar resumen
  console.log('\n📊 Resumen del seeding:')
  console.log(`• ${createdDomains.length} dominios creados`)
  console.log(`• ${createdStrengths.length} fortalezas creadas (5 por dominio)`)
  console.log(`• ${createdTeams.length} equipos creados`)
  console.log(`• ${createdUsers.length} usuarios creados`)
  console.log('\n🎯 Clasificación de fortalezas:')
  
  for (const domain of createdDomains) {
    const strengthsInDomain = createdStrengths.filter(s => s.domainId === domain.id)
    console.log(`• ${domain.name}: ${strengthsInDomain.map(s => s.name).join(', ')}`)
  }

  console.log('\n👥 Equipos y usuarios:')
  for (const team of createdTeams) {
    const usersInTeam = createdUsers.filter(u => u.teamId === team.id)
    console.log(`• ${team.name}: ${usersInTeam.map(u => u.name).join(', ')}`)
  }

  console.log('\n🔑 Credenciales de acceso:')
  console.log('Todos los usuarios tienen la contraseña: password123')
  createdUsers.forEach(user => {
    console.log(`• ${user.email}`)
  })

  console.log('\n✨ Seeding completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
