import React,{useContext,createContext,useState,useEffect} from "react";

interface User{
    id:number;
    name:string;
    email:string;
    password?:string;
    role:'admin'|'employee';
}

interface AuthContextType{
    user:User|null;
    login:(email:string,password:string)=>Promise<boolean>;
    logout:()=>void;
    isAuthenticated:boolean;
    isLoading:boolean;
}

const mockUsers=[
    {
        id:1,
        name:'Sarah Johnson',
        email:"admin@gmail.com",
        password:'Sarah@123',
        role:'admin'
    },
    {
        id:2,
        name:"Sam Porter",
        email:"sam@employee.com",
        password:"Sam@123",
        role:'employee'
    }
];

const AuthContext=createContext<AuthContextType|undefined>(undefined);

export const AuthProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [user,setUser]=useState<User|null>(null);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        const checkAuthStatus=()=>{
            try{
                const savedUser=sessionStorage.getItem('user');
                if(savedUser){
                    setUser(JSON.parse(savedUser));
                }
            }catch(err:any){
                console.error('Error checkning auth',err);
            }finally{
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    },[]);

    const login=async(email:string,password:string):Promise<boolean>=>{
        try{
            setIsLoading(true);

            await new Promise(resolve=> setTimeout(resolve,500));

            const foundUser=mockUsers.find(user =>user.email===email && user.password===password);

            if(foundUser){
                const{password:_,...userWithoutPassword}=foundUser;
                setUser(userWithoutPassword as User);
                sessionStorage.setItem("user",JSON.stringify(userWithoutPassword));
                return true;
            }
            return false;
        }catch(err:any){
            console.error("Login error:",err);
            return false;
        }finally{
            setIsLoading(false);
        }
    };

    const logout=()=>{
        setUser(null);
        sessionStorage.removeItem('user');
    };

    const value={
        user,
        login,
        logout,
        isAuthenticated:!!user,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(context===undefined){
        throw new Error("useAuth must be user within an AuthProvider");
    }
    return context;
};