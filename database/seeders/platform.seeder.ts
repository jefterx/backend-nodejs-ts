import Platform from '../../src/models/platform/platform.model';

async function PlatformSeeder(): Promise<void> {
  try {
    const platforms = [
      {
        name: "77SEG",
        hostname: "localhost",
        default: true,
      }
    ];

    for (const platformData of platforms) {
      const [platform, created] = await Platform.findOrCreate({
        where: { hostname: platformData.hostname },
        defaults: platformData,
      });

      if (created) {
        console.log(`Plataforma ${platform.name} criada com sucesso:`);
      } else {
        console.log(`Plataforma ${platform.name} já existe:`);
      }

      console.log(`ID: ${platform.id}, Nome: ${platform.name}, HostName: ${platform.hostname}`);
    }
  } catch (error) {
    // Erro ao criar ou alterar a tabela Platform
    console.error("Erro ao criar plataformas padrão: ", error);
  }
}

export default PlatformSeeder;
