import fs from 'node:fs';
import User from '../../models/User.model';
import colors from 'colors';

const users: Array<any> = JSON.parse(
    fs.readFileSync(`${__dirname.split('config')[0]}_data/users.json`, 'utf-8')
)

const seedUsers = async () => {
    const count = await User.countDocuments();

    if(count <= 0){
        let saved: number = 0;

        for (let i = 0; i < users.length; i++) {
            await User.create(users[i]);

            saved +1;
            
        }

        if( saved > 0){
            console.log(colors.green.inverse('User seeded successfully'))
        }
    }
}

export default seedUsers;