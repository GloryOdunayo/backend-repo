import Role from "../../models/Role.model"
import User from "../../models/User.model"
import { UserTypeEnum } from "../../utils/enums.util"
import colors from 'colors'
import seedUsers from "./user.seed"
import seedRoles from "./role.seed"

const attachSuperRole = async () => {
    const superadmin = await User.findOne({email: process.env.SUPERADMIN_EMAIL})
    const role = await Role.findOne({name: UserTypeEnum.SUPER})

    if( superadmin && role) {
        const hasRole = await superadmin.hasRole(UserTypeEnum.SUPER, superadmin.roles)
        
        if(!hasRole){
            superadmin.roles.push(role.id);
            await superadmin.save();

            role.users.push(superadmin._id);
            await role.save();

            console.log(colors.magenta.inverse('Super admin role attached successfully'))
        }
    }
}

const checkPassword = async () =>{
    const superadmin = await User.findOne({email: process.env.SUPERADMIN_EMAIL}).select('+password')

    if(superadmin){
        const checked = await superadmin.matchPassword('1234@Abc')
        const checked2 = await superadmin.matchPassword('ABc@1234')

        console.log(checked, 'checked false');
        console.log(checked2, 'checked true');
    }
}

const seedData = async () => {
    await seedRoles();
    await seedUsers();

    await attachSuperRole();

    await checkPassword();
}

export default seedData;