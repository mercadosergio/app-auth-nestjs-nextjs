import { hash } from 'bcryptjs';
import { User } from 'src/modules/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

function gender() {
    const genders = ["M", "F"];

    const gender = genders[Math.floor(Math.random() * 2)];
    return gender;
}

export default setSeederFactory(User, async (faker) => {
    const user = new User();

    user.username = faker.internet
        .userName()
        .toLowerCase();
    user.email = faker.internet
        .email()
        .toLowerCase();
    user.password = await hash(faker.internet.password(), 10);
    user.phoneNumber = faker.phone.number('501-###-###');
    user.name = faker.person.firstName();
    user.biography = faker.person.bio();
    user.gender = gender();
    // user.role = 

    return user;
});