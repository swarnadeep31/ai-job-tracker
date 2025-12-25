export  function getBaseUrl() {
    if(process.env.NEXTAUTH_URL){
        return `https://${process.env.NEXTAUTH_URL}`
    }

    return ""
}