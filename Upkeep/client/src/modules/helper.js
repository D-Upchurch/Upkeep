export const dateFixer = (property) => {
    const date = new Date(property.lastService);
    let cutDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    return cutDate
};