import { Role } from 'src/modules/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class RoleSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const roleRepository = dataSource.getRepository(Role);

        const rolesData = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'Viewer' }
        ];

        for (const data of rolesData) {
            const isExists = await roleRepository.findOneBy({ name: data.name });

            if (!isExists) {
                await roleRepository.insert(data);
            }
        }
    }
}