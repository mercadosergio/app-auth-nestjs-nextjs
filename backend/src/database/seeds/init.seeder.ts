import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
    userFactory,
} from '../factories';
import UserSeeder from './user.seeder';
import RoleSeeder from './role.seeder';

export default class InitSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        await runSeeders(dataSource, {
            seeds: [
                RoleSeeder,
                UserSeeder,
            ],
            factories: [
                userFactory,
            ],
        });
    }
}