

export function getBaseUrl() {
    if(process.env.NEXTAUTH_URL){

        return process.env.NEXTAUTH_URL!
    }
    return "https://localhost:3000"
}
