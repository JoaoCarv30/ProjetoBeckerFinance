import { createContext, useState, useEffect, ReactNode } from "react";




interface FetchApiProviderProps {
    children: ReactNode;
    };

interface FetchApiContextProps {
    date: ReactNode;
    id : number;
    type : number;
    description : string;
    value : number;
    created_at : string;
}

interface FetchApiContextType {
    data: FetchApiContextProps[];
}


export const FetchApiContext = createContext({} as FetchApiContextType);


 function FetchApiProvider({ children }: FetchApiProviderProps) {

    const [data, setData] = useState<FetchApiContextProps[]>([]);

    useEffect(() => {
        fetch("http://localhost:5051/modeltransaction")
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [data]);



  return (
    <FetchApiContext.Provider value={{data}}>
      {children}
    </FetchApiContext.Provider>
  );
}

export default FetchApiProvider;