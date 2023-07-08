
import connectDB from "../lib/connectDB";
import User from "../lib/models/user";

export async function loginUser(login, password) {
    try{
        console.log("Connecting to database...")
        connectDB();
        console.log("Connection to the database initiated.", login);

        const existingUser = await User.findOne({$or: [{'email': login}, {'username': login}]});
        console.log(existingUser);
         if(!existingUser) {
            throw new Error("It seems that no user with that username or email exist. Mmmmmh, maybe you can make an account?")
         }

         console.log(existingUser);
         const user = existingUser;
         return user;


    } catch(error){
        console.log(error);
    }
};

export async function updateAccount(user){
    console.log(user);
    try{
        console.log("Connecting to database...")
        await connectDB();
        console.log("Connection to the database initiated.", "1231434242252542");
        const filter = {email: user.email};
        const update = {
            username: user.username,
            creationDate: new Date(),
            updatedAt: new Date(1),
            photo: {data: user.photo?.data, contentType: user.photo?.contentType},
            profile : `${process.env.CLIENT_URL}/profile/${user.username}`,
            confirmed_account: true,
        }

        let userToUpdate = await  User.findOneAndUpdate(filter, update);
        userToUpdate = await User.findOne(filter);
        console.log(userToUpdate);
        return userToUpdate
    } catch(e){
        console.log(e);
    }
}