import { hash } from 'bcryptjs';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {

        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);

        const userAdmin = {
            name: "Sergio",
            email: "sergio@mail.com",
            username: "sergio1",
            password: await hash('1234567890', 10),
            biography: "This is my biography",
            phoneNumber: "320000000",
            gender: "M",
        };


        const isExists = await userRepository.findOneBy({ email: userAdmin.email });

        if (!isExists) {
            const roleAdmin = await roleRepository.findOneBy({ id: 1 });

            const newUser = new User();
            newUser.username = userAdmin.username;
            newUser.email = userAdmin.email;
            newUser.password = userAdmin.password;
            newUser.name = userAdmin.name;
            newUser.phoneNumber = userAdmin.phoneNumber;
            newUser.biography = userAdmin.biography;
            newUser.gender = userAdmin.gender;
            newUser.role = roleAdmin;
            await userRepository.save(newUser);
        }

        const roleUser = await roleRepository.findOneBy({ id: 2 });

        for (let i = 0; i < 10; i++) {
            const userFactory = await factoryManager.get(User);
            const user = await userFactory.make();
            user.role = roleUser;

            await userRepository.save(user);
        }

    }
}