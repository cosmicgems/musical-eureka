
export interface User {
        about: string;
        confirmed_account: boolean;
        createdAt: Date;
        email: string;
        first_name: string;
        last_name: string;
        password: string;
        photo: string;
        role: number;
        updatedAt: Date;
        username: string;
        verification_token: string;
        verification_token_expiration: string;
        _id: string;
        
}

export interface Session {
    data:{
        user: User
    },
    status: string;

}
