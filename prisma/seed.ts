import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { StrengthProfile, strengthsData } from '../mocks/stregths-data';
import domainsData from '../mocks/domains-data';


const prisma = new PrismaClient()

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

  // Crear dominios usando los datos enriquecidos (sin strengthsInDomain)
  console.log('📁 Creando dominios...')
  const createdDomains = await Promise.all(
    domainsData.map(async (domain) => {
      return await prisma.domain.create({
        data: {
          name: domain.name,
          nameEs: domain.nameEs,
          description: domain.description,
          metaphor: domain.metaphor,
          keyQuestion: domain.keyQuestion,
          summary: domain.summary,
          contributionToTeam: domain.contributionToTeam,
          potentialPitfall: domain.potentialPitfall,
        }
      })
    })
  )
  console.log(`✅ Creados ${createdDomains.length} dominios enriquecidos`)

  // Crear fortalezas usando strengthsData del mock
  console.log('💪 Creando fortalezas...')
  const createdStrengths = await Promise.all(
    strengthsData.map(async (strength: StrengthProfile) => {
      const domain = createdDomains.find(d => d.name === strength.domain)
      if (!domain) {
        throw new Error(`Domain ${strength.domain} not found`)
      }
      // Mapear campos del mock al modelo de Prisma
      return await prisma.strength.create({
        data: {
          name: strength.strength,
          nameEs: strength.nameEs,
          description: strength.briefDefinition,
          domainId: domain.id,
          briefDefinition: strength.briefDefinition,
          fullDefinition: strength.details.fullDefinition,
          howToUseMoreEffectively: strength.details.howToUseMoreEffectively?.join('\n'),
          watchOuts: strength.details.watchOuts?.join('\n'),
          strengthsDynamics: strength.details.strengthsDynamics,
          bestPartners: strength.details.bestPartners ?? [],
          careerApplications: strength.details.careerApplications ?? [],
        }
      })
    })
  )
  console.log(`✅ Creadas ${createdStrengths.length} fortalezas con perfiles enriquecidos`)

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
