import bcrypt from 'bcryptjs';

import User from '../../src/models/user/user.model';

async function UserSeeder(): Promise<void> {
  try {
    const password = await bcrypt.hash("12250200", 10);

    // Verificar se o usuário já existe e criar se não existir
    const [user, created] = await User.findOrCreate({
      where: { email: "ti@77seg.io" },
      defaults: {
        email: "ti@77seg.io",
        password: password,
        level: 0,
        cpf: "47545279840",
        name: "TI 77SEG",
        birth_date: new Date("1999-05-20"),
        gender: "M",
        phone: "11951523724",
        zip_code: "02033000",
        address: "Av. General Ataliba Leonel",
        number: "93",
        district: "Santana",
        city: "São Paulo",
        state: "SP"
      }
    });

    if (created) {
      console.log("Usuário padrão criado com sucesso:");
    } else {
      console.log("Usuário padrão já existe:");
    }

    console.log(`ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
  } catch (error) {
    // Erro ao criar ou alterar a tabela User
    console.error("Erro ao criar usuário padrão: ", error);
  }
}

export default UserSeeder;
