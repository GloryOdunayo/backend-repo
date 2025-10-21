import fs from 'node:fs';
import colors from 'colors';
import Role from '../../models/Role.model';

const roles: Array<any> = JSON.parse(
    fs.readFileSync(`${__dirname.split('config')[0]}_data/roles.json`, 'utf-8')
)

const seedRoles = async () => {
    const count = await Role.countDocuments();

    if(count <= 0){
        let saved: number = 0;

        for (let i = 0; i < roles.length; i++) {
            await Role.create(roles[i]);

            saved +1;
            
        }

        if( saved > 0){
            console.log(colors.green.inverse('Role seeded successfully'))
        }
    }
}

export default seedRoles;