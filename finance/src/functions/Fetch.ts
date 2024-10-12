



export const Fetcher = async () => {
    try {
        const response = await fetch("http://localhost:5051/modeltransaction", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch data");
        }
    } catch (error: any) {
        throw new Error("Error occurred: " + error.message);
    }
    };